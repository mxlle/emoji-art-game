import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GamePhase, Picture, PlayerGame, Role } from '../../../../game-logic/game';
import { getPictureCssClass } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent implements OnInit {
  @Input() game!: PlayerGame;
  @Input() pictures: Picture[] = [];
  @Input() currentTheme!: string;

  get count(): number {
    return GamePhase.Offer == this.game?.phase ? this.game.offerCount : this.game.selectionCount;
  }

  get demand(): number {
    return this.game.currentDemand ?? 0;
  }

  get showOfferConfirm(): boolean {
    return GamePhase.Offer === this.game.phase && this.game.currentPlayer?.role === Role.PAINTER;
  }

  get showSelectionConfirm(): boolean {
    return GamePhase.Choose === this.game.phase && this.game.currentPlayer?.role === Role.BUYER;
  }

  constructor() {}

  ngOnInit(): void {}

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }

  confirmOffer() {
    apiFunctions.offerPictures(this.game.id);
  }

  confirmSelection() {
    apiFunctions.choosePictures(this.game.id);
  }

  toggleBuyerSelection(picture: Picture) {
    if (this.currentTheme) {
      apiFunctions.toggleBuyerPreSelections(this.game.id, picture.card, this.currentTheme);
    }
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
