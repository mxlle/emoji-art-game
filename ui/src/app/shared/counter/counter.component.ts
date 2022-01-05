import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GamePhase, PublicGame } from '../../../game-logic/game';
import { buyer, painter, pointsEmoji } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  @Input() game!: PublicGame;
  @Input() includeEmoji: boolean = false;

  get count(): number {
    return GamePhase.Offer == this.game?.phase
      ? this.game.offerPreview.length
      : GamePhase.Choose == this.game?.phase
      ? this.game.selectionCount
      : this.game.correctCount;
  }

  get emoji(): string {
    return GamePhase.Offer == this.game?.phase ? painter : GamePhase.Choose == this.game?.phase ? buyer : pointsEmoji;
  }
}
