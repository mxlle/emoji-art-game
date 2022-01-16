import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { getPhaseEmojis, masterFaker, pointsEmoji, PublicGame } from '../../../game-logic';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  @Input() game!: PublicGame;

  @HostBinding('class.toolbar') readonly toolbar = true;

  readonly pointsEmoji = pointsEmoji;
  readonly masterFaker = masterFaker;

  get currentPhase(): string {
    return getPhaseEmojis(this.game.phase);
  }
}
