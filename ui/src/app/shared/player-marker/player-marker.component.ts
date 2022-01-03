import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Player } from '../../../game-logic/game';
import { getPlayerInGame } from '../../../game-logic/gameLogic';

@Component({
  selector: 'app-player-marker',
  template: '',
  styleUrls: ['./player-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerMarkerComponent {
  @Input() players: Player[] = [];
  @Input() playerId: string = '';

  @HostBinding('style.--color') get playerColor(): string | undefined {
    return getPlayerInGame({ players: this.players }, this.playerId)?.color;
  }
}
