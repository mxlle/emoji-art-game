import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Game, GamePhase, Role } from '../../../game-logic/game';
import { masterFaker } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent implements OnInit {
  @Input() game!: Game;

  readonly trophy = '🏆';
  readonly bin = '🗑️';

  get currentPhase(): string {
    switch (this.game.phase) {
      case GamePhase.Init:
        return `👥`;
      case GamePhase.Demand:
        return `${Role.BUYER} 🔢`;
      case GamePhase.Offer:
        return `${Role.PAINTER} 🖼️`;
      case GamePhase.Choose:
        return `${Role.BUYER} 💰`;
      case GamePhase.Evaluate:
        return `${Role.BUYER}${Role.PAINTER} ${this.trophy}${masterFaker}`;
      case GamePhase.End:
        return `${Role.BUYER}${Role.PAINTER} ${this.trophy}${masterFaker}`;
      default:
        return '?';
    }
  }

  constructor() {}

  ngOnInit(): void {}

  get masterFaker(): typeof masterFaker {
    return masterFaker;
  }
}
