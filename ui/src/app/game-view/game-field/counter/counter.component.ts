import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GamePhase, PublicGame } from '../../../../game-logic/game';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  @Input() game!: PublicGame;

  get count(): number {
    return GamePhase.Offer == this.game?.phase
      ? this.game.offerPreview.length
      : GamePhase.Choose == this.game?.phase
      ? this.game.selectionCount
      : this.game.correctCount;
  }
}
