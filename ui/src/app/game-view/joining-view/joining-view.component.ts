import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player, PublicGame } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';
import { minNumPlayers } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-joining-view',
  templateUrl: './joining-view.component.html',
  styleUrls: ['./joining-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoiningViewComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer?: Player;

  get allowDelete(): boolean {
    return this.game.hostId === this.currentPlayer?.id;
  }

  constructor() {}

  joinGame(player: Player) {
    apiFunctions.addPlayer(this.game.id, { ...player, pictures: [] });
  }

  removePlayer(player: Player | undefined = this.currentPlayer) {
    if (player) {
      apiFunctions.removePlayerFromGame(this.game.id, player?.id);
    }
  }

  startGame() {
    apiFunctions.startGame(this.game.id);
  }

  get minNumPlayers(): typeof minNumPlayers {
    return minNumPlayers;
  }
}
