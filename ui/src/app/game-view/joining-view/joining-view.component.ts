import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameConfig, Player, PublicGame } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';
import { defaultConfig, minDeck, minNumPlayers } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-joining-view',
  templateUrl: './joining-view.component.html',
  styleUrls: ['./joining-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoiningViewComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;
  config: GameConfig = defaultConfig;

  get isHost(): boolean {
    return this.game.hostId === this.currentPlayer?.id;
  }

  get startDisabled(): boolean {
    return this.game.players.length < minNumPlayers || this.config.calculatedCount < minDeck;
  }

  joinGame(player: Player) {
    apiFunctions.addPlayer(this.game.id, { ...player, pictures: [] });
  }

  removePlayer(player: Player | null = this.currentPlayer) {
    if (player) {
      apiFunctions.removePlayerFromGame(this.game.id, player?.id);
    }
  }

  startGame() {
    apiFunctions.startGame(this.game.id, this.config);
  }
}
