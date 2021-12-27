import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { buyer, getPhaseEmojis, painter, pointsEmoji } from '../../../../game-logic/gameConsts';
import { GamePhase, Player, PublicGame, Role } from '../../../../game-logic/game';
import { getCurrentUserId } from '../../../../data/functions';

@Component({
  selector: 'app-phase-info',
  templateUrl: './phase-info.component.html',
  styleUrls: ['./phase-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhaseInfoComponent {
  @Input() game!: PublicGame;

  readonly painter = painter;
  readonly buyer = buyer;
  readonly pointsEmoji = pointsEmoji;
  readonly currentPlayerId = getCurrentUserId();

  get painters(): Player[] {
    return this.game.players.filter((player) => Role.PAINTER === player.role);
  }

  get buyers(): Player[] {
    return this.game.players.filter((player) => Role.BUYER === player.role);
  }

  @HostBinding('class.evaluation-phase') get isEvaluation(): boolean {
    return GamePhase.Evaluate === this.game.phase;
  }

  get paintersActive(): boolean {
    return [GamePhase.Init, GamePhase.Offer, GamePhase.Evaluate, GamePhase.End].includes(this.game.phase);
  }

  get buyersActive(): boolean {
    return [GamePhase.Init, GamePhase.Demand, GamePhase.Choose, GamePhase.Evaluate, GamePhase.End].includes(this.game.phase);
  }

  get phaseEmojis(): string {
    return getPhaseEmojis(this.game.phase);
  }

  get phaseInfoText(): string {
    switch (this.game.phase) {
      case GamePhase.Init:
        return `Teammates joining`;
      case GamePhase.Demand:
        return `Buyers set demand`;
      case GamePhase.Offer:
        return `Painters provide pictures`;
      case GamePhase.Choose:
        return `Buyers select pictures`;
      case GamePhase.Evaluate:
        return `Review (all)`;
      case GamePhase.End:
        return `Game over`;
      default:
        return '?';
    }
  }
}
