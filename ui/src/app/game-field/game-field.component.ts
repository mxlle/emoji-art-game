import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {Game, GamePhase, GameRound, Player} from '../../game-logic/game';
import {createGame, game$, getBuyerSelection, getOfferedPictures} from '../../game-logic/gameLogic';
import {getInitialPlayers} from '../mock-mode/mock-mode.component';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent implements OnInit, OnDestroy {
  game: Game;
  currentPlayer?: Player;

  currentTheme: string = '';

  demand: number | undefined;

  get currentBuyerSelection() {
    return getBuyerSelection(this.game).length;
  }

  get currentOffer() {
    return getOfferedPictures(this.game).length;
  }

  get currentRound(): GameRound | undefined {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _cdr: ChangeDetectorRef) {
    const savedGame = localStorage.getItem('game');
    this.game = savedGame ? JSON.parse(savedGame) : createGame(getInitialPlayers());

    // subscribe to game
    game$.pipe(takeUntil(this._destroy$)).subscribe((game) => {
      this.game = game;
      this.currentPlayer = game.players.find((player) => player.id === this.currentPlayer?.id);
      this._cdr.markForCheck();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
