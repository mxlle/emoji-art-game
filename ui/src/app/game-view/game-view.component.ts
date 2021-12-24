import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { socket } from '../../data/socket';
import { Game, GameEvent, GamePhase, Player, ROOM_GAME, SocketEvent } from '../../game-logic/game';
import apiFunctions from '../../data/apiFunctions';
import { getCurrentUserInGame } from '../../data/functions';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnInit, OnDestroy {
  game: Game | null = null;
  currentPlayer: Player | undefined;
  readonly _gameId: string;

  constructor(private _activatedRoute: ActivatedRoute, private _cdr: ChangeDetectorRef, private _ngZone: NgZone) {
    this._gameId = this._activatedRoute.snapshot.paramMap.get('gameId') ?? '';
  }

  ngOnInit(): void {
    this._setupConnection();
    socket.on(SocketEvent.Reconnect, () => this._ngZone.run(() => this._setupConnection()));
  }

  ngOnDestroy() {
    this._unsubscribeFromGame();
    socket.off(SocketEvent.Reconnect);
  }

  private async _setupConnection() {
    this._unsubscribeFromGame();
    socket.emit(GameEvent.Subscribe, ROOM_GAME(this._gameId), (error: any) => {
      if (error !== null) {
        setTimeout(() => this._ngZone.run(() => this._setupConnection()), 1000);
      }
    });
    socket.on(GameEvent.Update, (game: Game) => this._ngZone.run(() => this.setGameAfterUpdate(game)));
    this.game = await apiFunctions.loadGame(this._gameId);
    if (this.game) {
      this.currentPlayer = getCurrentUserInGame(this.game);
      this._cdr.markForCheck();
    }
  }

  private _unsubscribeFromGame() {
    socket.emit(GameEvent.Unsubscribe, ROOM_GAME(this._gameId));
    socket.off(GameEvent.Update);
  }

  setGameAfterUpdate(game: Game) {
    if (this._gameId !== game.id) return;
    this.game = game;
    this.currentPlayer = getCurrentUserInGame(game);
    this._cdr.markForCheck();
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
