import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamePhase, Player, PublicGame } from '../../game-logic';
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
  game$: Observable<PublicGame | null> = this._gameService.currentGame$;
  currentPlayer$: Observable<Player | null> = this._gameService.currentPlayer$;

  @HostBinding('style.--primary-color') primaryColor?: string;

  loading: boolean = true;

  private readonly _gameId: string;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(
    _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _gameService: GameService,
    private _connectionService: ConnectionService
  ) {
    this._gameId = _activatedRoute.snapshot.paramMap.get('gameId') ?? '';
  }

  ngOnInit(): void {
    this._subscribeToGame();
    this._connectionService.reconnect$.pipe(takeUntil(this._destroy$)).subscribe(() => this._subscribeToGame());
    this.currentPlayer$.pipe(takeUntil(this._destroy$)).subscribe((player: Player | null) => {
      this.primaryColor = player?.color;
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._gameService.unsubscribeFromGame(this._gameId);
  }

  private _subscribeToGame() {
    this.loading = true;
    this._cdr.markForCheck();

    this._gameService.subscribeToGame(this._gameId).then(() => {
      this.loading = false;
      this._cdr.markForCheck();
    });
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
