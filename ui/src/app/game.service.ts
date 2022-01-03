import { Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { GameEvent, GameInfo, GamePhase, Player, PublicGame } from '../game-logic/game';
import { socket } from '../data/socket';
import { getCurrentUserId, getCurrentUserInGame } from '../data/functions';
import apiFunctions from '../data/apiFunctions';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  get currentGame$(): Observable<PublicGame> {
    return this._currentGame$.asObservable();
  }

  get currentPlayer$(): Observable<Player> {
    return this._currentPlayer$.asObservable();
  }

  get newGames$(): Observable<GameInfo[]> {
    return this._newGames$.asObservable();
  }

  get ongoingGames$(): Observable<GameInfo[]> {
    return this._ongoingGames$.asObservable();
  }

  get finishedGames$(): Observable<GameInfo[]> {
    return this._finishedGames$.asObservable();
  }

  private _currentGame$: ReplaySubject<PublicGame> = new ReplaySubject<PublicGame>(1);
  private _currentPlayer$: ReplaySubject<Player> = new ReplaySubject<Player>(1);
  private _newGames$: ReplaySubject<GameInfo[]> = new ReplaySubject<GameInfo[]>(1);
  private _ongoingGames$: ReplaySubject<GameInfo[]> = new ReplaySubject<GameInfo[]>(1);
  private _finishedGames$: ReplaySubject<GameInfo[]> = new ReplaySubject<GameInfo[]>(1);

  constructor(private _ngZone: NgZone) {}

  subscribeToGame(gameId: string) {
    this.unsubscribeFromGame(gameId); // remove existing connection
    socket.emit(GameEvent.GameSubscribe, gameId, getCurrentUserId(), (error: any) => {
      if (error !== null) {
        setTimeout(() => this._ngZone.run(() => this.subscribeToGame(gameId)), 1000);
      }
    });
    socket.on(GameEvent.Update, (game: PublicGame) => this._ngZone.run(() => this._currentGame$.next(game)));
    socket.on(GameEvent.UpdatePlayerData, (player: Player) => this._ngZone.run(() => this._currentPlayer$.next(player)));
    apiFunctions.loadGame(gameId).then((game) => game && this._currentGame$.next(game));
  }

  unsubscribeFromGame(gameId: string) {
    socket.emit(GameEvent.GameUnsubscribe, gameId, getCurrentUserId());
    socket.off(GameEvent.Update);
    socket.off(GameEvent.UpdatePlayerData);
  }

  subscribeToGameList() {
    this.unsubscribeFromGameList();
    socket.emit(GameEvent.ListSubscribe);
    socket.on(GameEvent.UpdateList, () => this._ngZone.run(() => this._loadGames()));
    this._loadGames();
  }

  unsubscribeFromGameList() {
    socket.emit(GameEvent.ListUnsubscribe);
    socket.off(GameEvent.UpdateList);
  }

  private _loadGames() {
    apiFunctions.loadGames().then((allGames: GameInfo[]) => {
      const newGames = allGames.filter((game) => game.phase === GamePhase.Init && !getCurrentUserInGame(game));
      const ongoingGames = allGames.filter(
        (game) => ![GamePhase.Init, GamePhase.End].includes(game.phase) || (game.phase === GamePhase.Init && !!getCurrentUserInGame(game))
      );
      const finishedGames = allGames.filter((game) => game.phase === GamePhase.End);

      this._newGames$.next(newGames);
      this._ongoingGames$.next(ongoingGames);
      this._finishedGames$.next(finishedGames);
    });
  }
}
