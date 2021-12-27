import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { socket } from '../../data/socket';
import { Game, GameEvent, GameInfo, GamePhase, SocketEvent } from '../../game-logic/game';
import apiFunctions from '../../data/apiFunctions';
import { createGame } from '../../game-logic/gameLogic';
import { Router } from '@angular/router';
import { getCurrentUserInGame } from '../../data/functions';
import { SETTING_NAME } from '../../data/constants';
import { randomArrayValue } from '../../game-tools/random-util';
import { positiveSmileys, splitEmojis } from '../../game-tools/emoji-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  newGames: GameInfo[] = [];
  ongoingGames: GameInfo[] = [];
  doneGames: GameInfo[] = [];
  loading: boolean = false;
  gameName: string = this._getDefaultGameNameForPlayer();
  defaultGameName: string = this._getDefaultGameName();

  constructor(private _cdr: ChangeDetectorRef, private _ngZone: NgZone, private _router: Router) {}

  ngOnInit(): void {
    this._setupConnection();
    socket.on(GameEvent.UpdateList, () => this._ngZone.run(() => this.loadGames()));
    socket.on(SocketEvent.Reconnect, () => this._ngZone.run(() => this._setupConnection()));
  }

  ngOnDestroy() {
    socket.emit(GameEvent.ListUnsubscribe);
    socket.off(GameEvent.UpdateList);
    socket.off(SocketEvent.Reconnect);
  }

  loadGames() {
    this.loading = true;
    this._cdr.markForCheck();
    apiFunctions.loadGames().then((allGames: GameInfo[]) => {
      this.newGames = allGames.filter((game) => game.phase === GamePhase.Init && !getCurrentUserInGame(game));
      this.ongoingGames = allGames.filter(
        (game) => ![GamePhase.Init, GamePhase.End].includes(game.phase) || (game.phase === GamePhase.Init && !!getCurrentUserInGame(game))
      );
      this.doneGames = allGames.filter((game) => game.phase === GamePhase.End);
      this.loading = false;
      this._cdr.markForCheck();
    });
  }

  createGame() {
    const game: Game = createGame(this.gameName || this.defaultGameName);
    apiFunctions.addGame(game).then((gameId: string) => this._router.navigate(['/' + gameId]));
  }

  deleteGame(gameId: string) {
    apiFunctions.deleteGame(gameId);
  }

  private _setupConnection() {
    socket.emit(GameEvent.ListSubscribe);
    this.loadGames();
  }

  private _getDefaultGameNameForPlayer() {
    const playerName = localStorage.getItem(SETTING_NAME);
    return playerName ? `${playerName}'s game` : '';
  }

  private _getDefaultGameName(): string {
    return `New game ${randomArrayValue(splitEmojis(positiveSmileys))}`;
  }
}
