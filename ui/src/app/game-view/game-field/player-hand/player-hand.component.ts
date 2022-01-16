import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { GamePhase, Picture, Player, PublicGame, Role } from '../../../../game-logic';
import { trackByPictureCard } from '../../../util/ui-helpers';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerHandComponent {
  @Input() game!: PublicGame;
  @Input() player!: Player;
  @Input() currentTheme!: string;

  readonly trackByPictureCard = trackByPictureCard;

  @HostBinding('class.active') get active(): boolean {
    return GamePhase.Offer === this.game.phase && this.player.role === Role.PAINTER;
  }

  @HostBinding('style.--player-color') get playerColor(): string {
    return this.player.color;
  }

  togglePainterSelection(picture: Picture) {
    apiFunctions.togglePainterSelections(this.game.id, picture.card, this.currentTheme);
  }
}
