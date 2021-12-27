import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Picture, Player, PlayerGame } from '../../../../game-logic/game';
import { getPictureCssClass, trackByPictureCard } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-current-player-hand',
  templateUrl: './current-player-hand.component.html',
  styleUrls: ['./current-player-hand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPlayerHandComponent {
  @Input() game!: PlayerGame;
  @Input() player!: Player;
  @Input() currentTheme!: string;

  readonly trackByPictureCard = trackByPictureCard;

  togglePainterSelection(picture: Picture) {
    apiFunctions.togglePainterSelections(this.game.id, picture.card, this.currentTheme);
  }

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }
}
