import { Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { GameEvent, Player, PublicGame } from '../game-logic/game';
import { socket } from '../data/socket';
import { getCurrentUserId } from '../data/functions';
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

  private _currentGame$: ReplaySubject<PublicGame> = new ReplaySubject<PublicGame>(1);
  private _currentPlayer$: ReplaySubject<Player> = new ReplaySubject<Player>(1);

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
}
