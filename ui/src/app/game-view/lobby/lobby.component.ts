import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerGame } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';
import { getCurrentUserId } from '../../../data/functions';
import { randomArrayValue } from '../../../game-tools/random-util';
import { allColors } from '../../../game-tools/color-util';
import { SETTING_COLOR, SETTING_NAME } from '../../../data/constants';
import { minNumPlayers } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent implements OnInit {
  @Input() game!: PlayerGame;

  name: string = window.localStorage.getItem(SETTING_NAME) ?? '';
  color: string = window.localStorage.getItem(SETTING_COLOR) ?? randomArrayValue(allColors);

  constructor() {}

  ngOnInit(): void {}

  joinGame() {
    window.localStorage.setItem(SETTING_NAME, this.name);
    window.localStorage.setItem(SETTING_COLOR, this.color);
    apiFunctions.addPlayer(this.game.id, { id: getCurrentUserId(), name: this.name, color: this.color, pictures: [] });
  }

  startGame() {
    apiFunctions.startGame(this.game.id);
  }

  get minNumPlayers(): typeof minNumPlayers {
    return minNumPlayers;
  }
}
