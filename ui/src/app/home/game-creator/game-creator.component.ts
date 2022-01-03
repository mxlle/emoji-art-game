import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SETTING_NAME } from '../../../data/constants';
import { randomArrayValue } from '../../../game-tools/random-util';
import { positiveSmileys, splitEmojis } from '../../../game-tools/emoji-util';
import { Game } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';
import { createGame } from '../../../game-logic/gameLogic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-creator',
  templateUrl: './game-creator.component.html',
  styleUrls: ['./game-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCreatorComponent {
  gameName: string = this._getDefaultGameNameForPlayer();
  defaultGameName: string = this._getDefaultGameName();

  constructor(private _router: Router) {}

  createGame() {
    const game: Game = createGame(this.gameName || this.defaultGameName);
    apiFunctions.addGame(game).then((gameId: string) => this._router.navigate(['/' + gameId]));
  }

  private _getDefaultGameNameForPlayer() {
    const playerName = localStorage.getItem(SETTING_NAME);
    return playerName ? `${playerName}'s game` : '';
  }

  private _getDefaultGameName(): string {
    return `New game ${randomArrayValue(splitEmojis(positiveSmileys))}`;
  }
}
