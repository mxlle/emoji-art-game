import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GamePhase, Player, PublicGame, Role } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;

  currentTheme: string = '';

  get themesActive(): boolean {
    return (
      (GamePhase.Offer === this.game.phase && Role.PAINTER === this.currentPlayer?.role) ||
      (GamePhase.Choose === this.game.phase && Role.BUYER === this.currentPlayer?.role)
    );
  }

  get showQuickAccess(): boolean {
    return this.themesActive;
  }

  get showDemandPicker(): boolean {
    return GamePhase.Demand === this.game.phase;
  }

  get canSetDemand(): boolean {
    return Role.BUYER === this.currentPlayer?.role;
  }

  get showEndRoundConfirm(): boolean {
    return GamePhase.Evaluate === this.game.phase && !!this.currentPlayer;
  }

  endRound() {
    apiFunctions.endOfRound(this.game.id).catch((error) => console.error(error));
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
