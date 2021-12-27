import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { PublicGame } from '../../../game-logic/game';
import { discardedEmoji, getPhaseEmojis, masterFaker, pointsEmoji } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent implements OnInit {
  @Input() game!: PublicGame;

  @HostBinding('class.toolbar') readonly toolbar = true;

  readonly pointsEmoji = pointsEmoji;
  readonly discardedEmoji = discardedEmoji;
  readonly masterFaker = masterFaker;

  get currentPhase(): string {
    return getPhaseEmojis(this.game.phase);
  }

  constructor() {}

  ngOnInit(): void {}
}
