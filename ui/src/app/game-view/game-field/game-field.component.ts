import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { GamePhase, GameRound, PlayerGame, Role } from '../../../game-logic/game';
import { getBuyerSelection, getOfferedPictures } from '../../../game-logic/gameLogic';
// @ts-ignore todo
import { Subject } from 'rxjs';
import apiFunctions from '../../../data/apiFunctions';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent implements OnInit, OnDestroy {
  @Input() game!: PlayerGame;

  currentTheme: string = '';

  demand: number | undefined;

  get showDemandPicker(): boolean {
    return GamePhase.Demand === this.game.phase && this.game.currentPlayer?.role === Role.BUYER;
  }

  get showOfferConfirm(): boolean {
    return GamePhase.Offer === this.game.phase && this.game.currentPlayer?.role === Role.PAINTER;
  }

  get showSelectionConfirm(): boolean {
    return GamePhase.Choose === this.game.phase && this.game.currentPlayer?.role === Role.BUYER;
  }

  get showEndRoundConfirm(): boolean {
    return GamePhase.Evaluate === this.game.phase;
  }

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

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  setDemand() {
    if (this.demand) {
      apiFunctions.setDemand(this.game.id, this.demand).then(() => {
        delete this.demand;
        this._cdr.markForCheck();
      });
    }
  }

  confirmOffer() {
    apiFunctions.offerPictures(this.game.id);
  }

  confirmSelection() {
    apiFunctions.choosePictures(this.game.id);
  }

  endRound() {
    apiFunctions.endOfRound(this.game.id).catch((error) => console.error(error));
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
