import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { BuyerSelection, GamePhase, Picture, Player, PublicGame, Role } from '../../../../game-logic/game';
import { getPictureCssClass, trackByPictureCard } from '../../../util/ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';
import { getCurrentUserId } from '../../../../data/functions';
import { unknownCardEmoji } from '../../../../game-logic/gameConsts';
import { scrollIntoViewIfPossible } from '../../../util/scroll-into-view';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent {
  @Input() set game(game: PublicGame | undefined) {
    if (
      this._game &&
      GamePhase.Offer === this._game?.phase &&
      GamePhase.Choose === game?.phase &&
      this._animationTimeoutRef === undefined
    ) {
      this._triggerSwitchToMarketAnimation();
    } else {
      this.showPreview = game?.currentOffer.length === 0;
    }
    this._game = game;
  }
  get game(): PublicGame | undefined {
    return this._game;
  }
  private _game?: PublicGame;

  @Input() pictures: Picture[] = [];
  @Input() currentTheme!: string;
  @Input() currentPlayer: Player | null = null;
  @Input() scrollContainer?: HTMLElement;

  showPreview: boolean = true;
  preparePreviewEndAnimation: boolean = false;
  showPreviewEndAnimation: boolean = false;
  showMarketStartAnimation: boolean = false;

  readonly currentPlayerId = getCurrentUserId();
  readonly unknownCardEmoji = unknownCardEmoji;

  readonly trackByPictureCard = trackByPictureCard;

  private readonly _animationMillis = 3000;
  private readonly _bottomScrollBuffer = 100; // a bit more than the quick access bar
  private _animationTimeoutRef?: number;

  get active(): boolean {
    return (GamePhase.Choose === this._game?.phase && this.currentPlayer?.role === Role.BUYER) || GamePhase.Evaluate === this._game?.phase;
  }

  constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef) {}

  getPictureIsSelected(picture: Picture): boolean {
    return (
      !!picture.buyerTheme ||
      (!!picture.buyerSelection &&
        picture.buyerSelection.findIndex((s: BuyerSelection) => !!this.currentPlayerId && s.playerIds.includes(this.currentPlayerId)) > -1)
    );
  }

  getPictureCssClass(picture: Picture): string {
    return this._game ? getPictureCssClass(this._game, picture) : '';
  }

  toggleBuyerSelection(picture: Picture) {
    if (this._game && this.currentTheme) {
      apiFunctions.toggleBuyerPreSelections(this._game.id, picture.card, this.currentTheme);
    }
  }

  private _triggerSwitchToMarketAnimation() {
    this.showPreview = true;
    this.preparePreviewEndAnimation = true;
    requestAnimationFrame(() => {
      scrollIntoViewIfPossible(this._elementRef.nativeElement, this.scrollContainer, 0, this._bottomScrollBuffer).then(() => {
        if (!this._animationTimeoutRef) {
          this.showPreviewEndAnimation = true;
          this._cdr.markForCheck();

          this._animationTimeoutRef = setTimeout(() => {
            this.preparePreviewEndAnimation = false;
            this.showPreviewEndAnimation = false;
            this.showMarketStartAnimation = true;
            this.showPreview = false;
            this._cdr.markForCheck();

            this._animationTimeoutRef = setTimeout(() => {
              this.showMarketStartAnimation = false;
              this._animationTimeoutRef = undefined;
              this._cdr.markForCheck();
            }, this._animationMillis / 2);
          }, this._animationMillis / 2);
        }
      });
    });
  }
}
