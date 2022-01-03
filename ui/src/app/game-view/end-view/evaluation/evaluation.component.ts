import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../../game-logic/game';
import { randomArrayValue } from '../../../../game-tools/random-util';
import { allColors } from '../../../../game-tools/color-util';
import { map, Observable, of, tap } from 'rxjs';
import { bestPoints } from '../../../../game-logic/gameConsts';
import { animateNumber } from '../../../animation-util';
import { percentage } from '../../../util';

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

  animatedPercentage$: Observable<number> = of(0);
  resultPercentage: number = 0;

  private readonly _resultAnimationMillis = 1500;

  get colors(): string[] {
    return this.players.map((player: Player) => player.color ?? randomArrayValue(allColors));
  }

  ngOnInit(): void {
    this.resultPercentage = percentage(this.points, bestPoints);

    this.animatedPercentage$ = animateNumber(this.points, this._resultAnimationMillis).pipe(
      tap((points: number) => this.animatedPointsChange.emit(Math.ceil(points))),
      map((points: number) => percentage(points, bestPoints))
    );
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
