import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { bestPoints, Player } from '../../../../game-logic';
import { map, Observable, of, tap } from 'rxjs';
import { animateNumber, AnimationType } from '../../../util/animation-util';
import { percentage } from '../../../util/util';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluationComponent {
  @Input() set points(points: number) {
    this.resultPercentage = percentage(points, bestPoints);

    this.animatedPercentage$ = animateNumber(points, this._resultAnimationMillis, AnimationType.EaseIn).pipe(
      tap((animatedPoints: number) => this.animatedPointsChange.emit(Math.ceil(animatedPoints))),
      map((animatedPoints: number) => percentage(animatedPoints, bestPoints))
    );
  }
  @Input() players: Player[] = [];

  @Output() animatedPointsChange: EventEmitter<number> = new EventEmitter<number>();

  animatedPercentage$: Observable<number> = of(0);
  resultPercentage: number = 0;

  get scaleResultPercentage() {
    return Math.min(this.resultPercentage, 100); // end scale bigger if above 100%
  }

  private readonly _resultAnimationMillis = 1500;

  get colors(): string[] {
    return this.players.map((player: Player) => player.color);
  }

  getResultEmoji(percentage: number): string {
    if (percentage < 20) {
      return '😵';
    } else if (percentage < 50) {
      return '🥴';
    } else if (percentage < 75) {
      return '🙂';
    } else if (percentage < 100) {
      return '😎';
    } else if (percentage >= 100) {
      return '🤩';
    } else {
      return '🤔';
    }
  }
}
