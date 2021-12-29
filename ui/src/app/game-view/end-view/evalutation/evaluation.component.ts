import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../../game-logic/game';
import { randomArrayValue } from '../../../../game-tools/random-util';
import { allColors } from '../../../../game-tools/color-util';
import { animationFrameScheduler, interval, map, Observable, of, takeUntil, tap, timer } from 'rxjs';
import { easeInQuad } from '../../../../data/functions';
import { bestPoints } from '../../../../game-logic/gameConsts';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluationComponent implements OnInit {
  @Input() points: number = 0;
  @Input() players: Player[] = [];

  @Output() animatedPointsChange: EventEmitter<number> = new EventEmitter<number>();

  animatedPoints$: Observable<number> = of(0);
  animatedPercentage$: Observable<number> = of(0);
  animatedEmoji$: Observable<string> = of('🤔');

  private _resultPercentage: number = 0;
  private readonly _resultAnimationMillis = 1000;

  get colors(): string[] {
    return this.players.map((player) => player.color ?? randomArrayValue(allColors));
  }

  getTransform(percentage: number): string {
    return `scale(${Math.min(1, percentage / this._resultPercentage)})`;
  }

  ngOnInit(): void {
    this._resultPercentage = (this.points / bestPoints) * 100;

    // animated points and progress bar
    const start = animationFrameScheduler.now();
    this.animatedPoints$ = interval(0, animationFrameScheduler).pipe(
      map(() => {
        const now = animationFrameScheduler.now();
        const linearPoints = ((now - start) / this._resultAnimationMillis) * this.points;
        return easeInQuad(linearPoints, this.points);
      }),
      tap((points) => this.animatedPointsChange.emit(Math.min(this.points, Math.ceil(points)))),
      takeUntil(timer(this._resultAnimationMillis))
    );
    this.animatedPercentage$ = this.animatedPoints$.pipe(map((points) => (points / bestPoints) * 100));
    this.animatedEmoji$ = this.animatedPercentage$.pipe(map(this._getResultEmoji));
  }

  private _getResultEmoji(percentage: number): string {
    if (percentage < 20) {
      return '😵';
    } else if (percentage < 50) {
      return '🥴';
    } else if (percentage < 75) {
      return '🙂';
    } else if (percentage < 100) {
      return '😎';
    } else if (percentage === 100) {
      return '🤩';
    } else {
      return '🤔';
    }
  }
}
