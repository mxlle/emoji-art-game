import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Game, Picture, Player } from '../../game';
import { getPictureCssClass } from '../../ui-helpers';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent implements OnInit {
  @Input() game!: Game;
  @Input() pictures: Picture[] = [];
  @Input() currentPlayer?: Player;
  @Input() currentTheme!: string;

  get themes(): string[] {
    return this.game.rounds[this.game.currentRound].themes;
  }

  constructor() {}

  ngOnInit(): void {}

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }

  toggleBuyerSelection(picture: Picture) {
    if (this.currentPlayer && this.currentTheme) {
      if (!picture.buyerSelection) {
        picture.buyerSelection = {};
      }
      const selectionForTheme = picture.buyerSelection[this.currentTheme];
      const playerId = this.currentPlayer.id;
      if (!selectionForTheme) {
        picture.buyerSelection[this.currentTheme] = [playerId];
      } else {
        if (selectionForTheme.includes(playerId)) {
          picture.buyerSelection[this.currentTheme] = selectionForTheme.filter((id) => id !== playerId);
        } else {
          picture.buyerSelection[this.currentTheme] = [...picture.buyerSelection[this.currentTheme], playerId];
        }
      }
      picture.buyerSelection = { ...picture.buyerSelection }; // to trigger change detection
    }
  }
}
