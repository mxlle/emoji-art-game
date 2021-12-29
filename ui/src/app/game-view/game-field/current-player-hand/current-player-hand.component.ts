import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { GamePhase, Picture, Player, PublicGame, Role } from '../../../../game-logic/game';
import { getPictureCssClass, trackByPictureCard } from '../../../ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-current-player-hand',
  templateUrl: './current-player-hand.component.html',
  styleUrls: ['./current-player-hand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPlayerHandComponent {
  @Input() game!: PublicGame;
  @Input() player!: Player;
  @Input() currentTheme!: string;

  readonly trackByPictureCard = trackByPictureCard;

  @HostBinding('class.active') get active(): boolean {
    return GamePhase.Offer === this.game.phase && this.player.role === Role.PAINTER;
  }

  togglePainterSelection(picture: Picture) {
    apiFunctions.togglePainterSelections(this.game.id, picture.card, this.currentTheme);
  }

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }
}
