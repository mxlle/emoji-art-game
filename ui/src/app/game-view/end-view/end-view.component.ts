import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PublicGame } from '../../../game-logic/game';
import { masterFaker, pointsEmoji } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-end-view',
  templateUrl: './end-view.component.html',
  styleUrls: ['./end-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndViewComponent {
  @Input() game!: PublicGame;

  animatedPoints: number = 0;

  get animatedFakePoints(): number {
    return this.animatedPoints !== this.game.teamPoints.length
      ? Math.min(this.game.fakePoints.length, this.animatedPoints)
      : this.game.fakePoints.length;
  }

  readonly pointsEmoji = pointsEmoji;
  readonly masterFaker = masterFaker;
}
