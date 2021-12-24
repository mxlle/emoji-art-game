import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../game-logic/game';
import { masterFaker } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-end-view',
  templateUrl: './end-view.component.html',
  styleUrls: ['./end-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndViewComponent implements OnInit {
  @Input() game!: Game;

  readonly trophy = '🏆';

  constructor() {}

  ngOnInit(): void {}

  get masterFaker(): typeof masterFaker {
    return masterFaker;
  }
}
