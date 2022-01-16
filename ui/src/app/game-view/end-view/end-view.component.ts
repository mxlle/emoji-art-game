import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { masterFaker, Player, pointsEmoji, PublicGame } from '../../../game-logic';

@Component({
  selector: 'app-end-view',
  templateUrl: './end-view.component.html',
  styleUrls: ['./end-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndViewComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;

  animatedPoints: number = 0;

  get animatedFakePoints(): number {
    return this.animatedPoints !== this.game.teamPoints.length
      ? Math.min(this.game.fakePoints.length, this.animatedPoints)
      : this.game.fakePoints.length;
  }

  readonly pointsEmoji = pointsEmoji;
  readonly masterFaker = masterFaker;
}
