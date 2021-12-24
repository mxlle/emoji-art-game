import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Game, Picture } from '../../../../game-logic/game';
import { getPictureCssClass } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent implements OnInit {
  @Input() game!: Game;
  @Input() pictures: Picture[] = [];
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
    if (this.currentTheme) {
      apiFunctions.toggleBuyerPreSelections(this.game.id, picture.card, this.currentTheme);
    }
  }
}
