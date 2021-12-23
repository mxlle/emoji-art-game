import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { mockGameId } from '../mock-mode/mock-service';
import { socket } from '../../data/socket';
import { Game, GameEvent, ROOM_GAME_LIST, SocketEvent } from '../../game-logic/game';
import apiFunctions from '../../data/apiFunctions';
import { createGame } from '../../game-logic/gameLogic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly testGameUrl = `/${mockGameId}`;

  allGames: Game[] = [];
  loading: boolean = false;

  constructor(private _cdr: ChangeDetectorRef, private _ngZone: NgZone, private _router: Router) {}

  ngOnInit(): void {
    this._setupConnection();
    socket.on(GameEvent.UpdateList, () => this._ngZone.run(() => this.loadGames()));
    socket.on(SocketEvent.Reconnect, () => this._ngZone.run(() => this._setupConnection()));
  }

  ngOnDestroy() {
    socket.emit(GameEvent.Unsubscribe, ROOM_GAME_LIST);
    socket.off(GameEvent.UpdateList);
    socket.off(SocketEvent.Reconnect);
  }

  loadGames() {
    this.loading = true;
    this._cdr.markForCheck();
    apiFunctions.loadGames().then((games: Game[]) => {
      this.allGames = games;
      this.loading = false;
      this._cdr.markForCheck();
    });
  }

  createGame() {
    const game: Game = createGame();
    apiFunctions.addGame(game).then((gameId: string) => this._router.navigate(['/' + gameId]));
  }

  deleteGame(gameId: string) {
    apiFunctions.deleteGame(gameId);
  }

  private _setupConnection() {
    socket.emit(GameEvent.Subscribe, ROOM_GAME_LIST);
    this.loadGames();
  }
}
