import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GameInfo } from '../../game-logic/game';
import apiFunctions from '../../data/apiFunctions';
import { GameService } from '../game.service';
import { ConnectionService } from '../connection.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  newGames$: Observable<GameInfo[] | null> = this._gameService.newGames$;
  ongoingGames$: Observable<GameInfo[] | null> = this._gameService.ongoingGames$;
  finishedGames$: Observable<GameInfo[] | null> = this._gameService.finishedGames$;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(private _gameService: GameService, private _connectionService: ConnectionService) {}

  ngOnInit(): void {
    this._gameService.subscribeToGameList();
    this._connectionService.reconnect$.pipe(takeUntil(this._destroy$)).subscribe(() => this._gameService.subscribeToGameList());
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._gameService.unsubscribeFromGameList();
  }

  deleteGame(gameId: string) {
    apiFunctions.deleteGame(gameId);
  }
}
