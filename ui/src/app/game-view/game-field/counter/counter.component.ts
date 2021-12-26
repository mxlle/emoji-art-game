import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GamePhase, PlayerGame } from '../../../../game-logic/game';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  @Input() game!: PlayerGame;

  get count(): number {
    return GamePhase.Offer == this.game?.phase
      ? this.game.offerCount
      : GamePhase.Choose == this.game?.phase
      ? this.game.selectionCount
      : this.game.correctCount;
  }

  get demand(): number {
    return this.game.currentDemand ?? 0;
  }
}
