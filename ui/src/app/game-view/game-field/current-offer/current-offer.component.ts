import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BuyerSelection, GamePhase, Picture, Player, PublicGame, Role } from '../../../../game-logic/game';
import { getPictureCssClass, trackByPictureCard } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';
import { getCurrentUserId } from '../../../../data/functions';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent {
  @Input() game!: PublicGame;
  @Input() pictures: Picture[] = [];
  @Input() currentTheme!: string;
  @Input() currentPlayer?: Player;

  readonly currentPlayerId = getCurrentUserId();

  readonly trackByPictureCard = trackByPictureCard;

  get active(): boolean {
    return (GamePhase.Choose === this.game.phase && this.currentPlayer?.role === Role.BUYER) || GamePhase.Evaluate === this.game.phase;
  }

  getPictureIsSelected(picture: Picture): boolean {
    return (
      !!picture.buyerTheme ||
      (!!picture.buyerSelection &&
        picture.buyerSelection.findIndex((s: BuyerSelection) => !!this.currentPlayerId && s.playerIds.includes(this.currentPlayerId)) > -1)
    );
  }

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }

  toggleBuyerSelection(picture: Picture) {
    if (this.currentTheme) {
      apiFunctions.toggleBuyerPreSelections(this.game.id, picture.card, this.currentTheme);
    }
  }
}
