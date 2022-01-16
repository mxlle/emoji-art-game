import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameInfo } from '../../game-logic';
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

  loading: boolean = true;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(private _gameService: GameService, private _connectionService: ConnectionService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeToGameList();
    this._connectionService.reconnect$.pipe(takeUntil(this._destroy$)).subscribe(() => this.subscribeToGameList());
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._gameService.unsubscribeFromGameList();
  }

  subscribeToGameList() {
    this.loading = true;
    this._cdr.markForCheck();

    this._gameService.subscribeToGameList().then(() => {
      this.loading = false;
      this._cdr.markForCheck();
    });
  }

  deleteGame(gameId: string) {
    apiFunctions.deleteGame(gameId);
  }
}
