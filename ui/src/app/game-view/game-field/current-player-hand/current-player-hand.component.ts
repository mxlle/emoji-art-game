import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Game, Picture, Player } from '../../../../game-logic/game';
import { getPictureCssClass } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-current-player-hand',
  templateUrl: './current-player-hand.component.html',
  styleUrls: ['./current-player-hand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPlayerHandComponent implements OnInit {
  @Input() game!: Game;
  @Input() player!: Player;
  @Input() currentTheme!: string;

  get themes(): string[] {
    return this.game.rounds[this.game.currentRound].themes;
  }

  constructor() {}

  ngOnInit(): void {}

  togglePainterSelection(picture: Picture) {
    apiFunctions.togglePainterSelections(this.game.id, picture.card, this.currentTheme);
  }

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }
}
