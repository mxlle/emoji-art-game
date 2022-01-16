import { Injectable, NgZone } from '@angular/core';
import { distinctUntilChanged, filter, map, Observable, ReplaySubject, take, withLatestFrom } from 'rxjs';
import { bestPoints, GameEvent, GameInfo, GamePhase, Player, playersToString, PublicGame, Role } from '../game-logic';
import { socket } from '../data/socket';
import { getCurrentUserId, getCurrentUserInGame } from '../data/functions';
import apiFunctions from '../data/apiFunctions';
import { allColors } from '../game-tools/color-util';

export interface ConfettiEvent {
  colors?: string[];
  amount?: number;
}

export interface PlayerMapping {
  [key: string]: Player;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  get currentGame$(): Observable<PublicGame | null> {
    return this._currentGame$.asObservable();
  }

  get currentPlayers$(): Observable<Player[]> {
    return this.currentGame$.pipe(
      filter(Boolean),
      distinctUntilChanged(
        (prev: PublicGame, curr: PublicGame) =>
          prev.players.length === curr.players.length && playersToString(prev.players) === playersToString(curr.players)
      ),
      map((game: PublicGame) => game.players)
    );
  }

  get currentPainters$(): Observable<Player[]> {
    return this.currentPlayers$.pipe(map((players: Player[]) => players.filter((player: Player) => Role.PAINTER === player.role)));
  }

  get currentBuyers$(): Observable<Player[]> {
    return this.currentPlayers$.pipe(map((players: Player[]) => players.filter((player: Player) => Role.BUYER === player.role)));
  }

  get playerMapping$(): Observable<PlayerMapping> {
    return this.currentPlayers$.pipe(
      map((players: Player[]) =>
        players.reduce((playerMapping: PlayerMapping, player: Player) => {
          playerMapping[player.id] = player;

          return playerMapping;
        }, {})
      )
    );
  }

  get currentPlayer$(): Observable<Player | null> {
    return this._currentPlayer$.asObservable();
  }

  get confetti$(): Observable<ConfettiEvent> {
    return this._confetti$.asObservable().pipe(
      withLatestFrom(this.currentGame$),
      map(([colors, game]: [string[], PublicGame | null]) => {
        let amount = 1;
        if (game && game.phase === GamePhase.End) {
          amount = game.teamPoints.length / bestPoints;
        }
        return { colors, amount };
      })
    );
  }

  get newGames$(): Observable<GameInfo[] | null> {
    return this._newGames$.asObservable();
  }

  get ongoingGames$(): Observable<GameInfo[] | null> {
    return this._ongoingGames$.asObservable();
  }

  get finishedGames$(): Observable<GameInfo[] | null> {
    return this._finishedGames$.asObservable();
  }

  private _currentGame$: ReplaySubject<PublicGame | null> = new ReplaySubject<PublicGame | null>(1);
  private _currentPlayer$: ReplaySubject<Player | null> = new ReplaySubject<Player | null>(1);
  private _confetti$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  private _newGames$: ReplaySubject<GameInfo[] | null> = new ReplaySubject<GameInfo[] | null>(1);
  private _ongoingGames$: ReplaySubject<GameInfo[] | null> = new ReplaySubject<GameInfo[] | null>(1);
  private _finishedGames$: ReplaySubject<GameInfo[] | null> = new ReplaySubject<GameInfo[] | null>(1);

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
    socket.on(GameEvent.Confetti, (colors: string[]) => this._ngZone.run(() => this._confetti$.next(colors)));
    return apiFunctions.loadGame(gameId).then((game) => game && this._currentGame$.next(game));
  }

  unsubscribeFromGame(gameId: string) {
    socket.emit(GameEvent.GameUnsubscribe, gameId, getCurrentUserId());
    socket.off(GameEvent.Update);
    socket.off(GameEvent.UpdatePlayerData);
    socket.off(GameEvent.Confetti);
    this._currentGame$.next(null);
    this._currentPlayer$.next(null);
  }

  subscribeToGameList() {
    this.unsubscribeFromGameList();
    socket.emit(GameEvent.ListSubscribe, getCurrentUserId());
    socket.on(GameEvent.UpdateList, () => this._ngZone.run(() => this._loadGames()));
    return this._loadGames();
  }

  unsubscribeFromGameList() {
    socket.emit(GameEvent.ListUnsubscribe, getCurrentUserId());
    socket.off(GameEvent.UpdateList);
    this._newGames$.next(null);
    this._ongoingGames$.next(null);
    this._finishedGames$.next(null);
  }

  sendConfetti(colors: string[] = allColors) {
    this._confetti$.next(colors);
    this.currentGame$.pipe(take(1)).subscribe((game: PublicGame | null) => {
      if (game) socket.emit(GameEvent.Confetti, game.id, colors);
    });
  }

  private _loadGames() {
    return apiFunctions.loadGames().then((allGames: GameInfo[]) => {
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
