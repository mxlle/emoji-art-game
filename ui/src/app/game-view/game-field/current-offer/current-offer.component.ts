import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { BuyerSelection, GamePhase, Picture, Player, PublicGame, Role } from '../../../../game-logic/game';
import { trackByPictureCard } from '../../../util/ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';
import { getCurrentUserId } from '../../../../data/functions';
import { unknownCardEmoji } from '../../../../game-logic/gameConsts';
import { scrollIntoViewIfPossible } from '../../../util/scroll-into-view';
import { finalize, interval, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent implements OnDestroy {
  @Input() set game(game: PublicGame | undefined) {
    if (this._game && GamePhase.Offer === this._game?.phase && GamePhase.Choose === game?.phase) {
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
  prepareAnimation: boolean = false;
  showShuffleAnimation: boolean = false;
  showShift = false;

  readonly shuffleShift: number = 80;

  readonly currentPlayerId = getCurrentUserId();
  readonly unknownCardEmoji = unknownCardEmoji;

  readonly trackByPictureCard = trackByPictureCard;

  private readonly _animationMillis = 1750;
  private readonly _bottomScrollBuffer = 100; // a bit more than the quick access bar

  private _destroy$: Subject<void> = new Subject<void>();

  get active(): boolean {
    return GamePhase.Choose === this._game?.phase && this.currentPlayer?.role === Role.BUYER;
  }

  constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef) {}

  ngOnDestroy() {
    this._destroy$.next();
  }

  getPictureIsSelected(picture: Picture): boolean {
    return (
      !!picture.buyerTheme ||
      (!!picture.buyerSelection &&
        picture.buyerSelection.findIndex((s: BuyerSelection) => !!this.currentPlayerId && s.playerIds.includes(this.currentPlayerId)) > -1)
    );
  }

  getPictureCssClass(picture: Picture): string {
    if (GamePhase.Evaluate === this._game?.phase) {
      if (picture.buyerTheme && picture.buyerTheme === picture.painterTheme && !picture.isFake) {
        return 'correct';
      } else if (picture.buyerTheme !== picture.painterTheme && !picture.isFake) {
        return 'neutral';
      } else if (picture.buyerTheme !== picture.painterTheme && picture.isFake) {
        return 'fake';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  toggleBuyerSelection(picture: Picture) {
    if (this._game && this.currentTheme) {
      apiFunctions.toggleBuyerPreSelections(this._game.id, picture.card, this.currentTheme);
    }
  }

  _triggerSwitchToMarketAnimation() {
    this.showPreview = true;
    this.prepareAnimation = true;

    requestAnimationFrame(() => {
      scrollIntoViewIfPossible(this._elementRef.nativeElement, this.scrollContainer, 0, this._bottomScrollBuffer).then(() => {
        this.showShuffleAnimation = true;
        this._cdr.markForCheck();

        setTimeout(() => {
          this.prepareAnimation = false;
          this.showPreview = false;
          this._cdr.markForCheck();

          interval(200)
            .pipe(
              tap(() => {
                this.showShift = !this.showShift;
                this._cdr.markForCheck();
              }),
              take(7),
              takeUntil(this._destroy$),
              finalize(() => {
                this.showShuffleAnimation = false;
                this.showShift = false;
                this._cdr.markForCheck();
              })
            )
            .subscribe();
        }, this._animationMillis);
      });
    });
  }
}
