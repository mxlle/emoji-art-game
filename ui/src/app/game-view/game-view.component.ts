import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamePhase, Player, PublicGame } from '../../game-logic/game';
import { GameService } from '../game.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnInit, OnDestroy {
  game$: Observable<PublicGame> = this._gameService.currentGame$;
  currentPlayer$: Observable<Player> = this._gameService.currentPlayer$;

  readonly _gameId: string;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(_activatedRoute: ActivatedRoute, private _gameService: GameService, private _connectionService: ConnectionService) {
    this._gameId = _activatedRoute.snapshot.paramMap.get('gameId') ?? '';
  }

  ngOnInit(): void {
    this._gameService.subscribeToGame(this._gameId);
    this._connectionService.reconnect$.pipe(takeUntil(this._destroy$)).subscribe(() => this._gameService.subscribeToGame(this._gameId));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._gameService.unsubscribeFromGame(this._gameId);
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
