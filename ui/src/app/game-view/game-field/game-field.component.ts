import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { GamePhase, Player, PublicGame, Role } from '../../../game-logic/game';
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
  @Input() game!: PublicGame;
  @Input() currentPlayer?: Player;

  currentTheme: string = '';

  get showQuickAccess(): boolean {
    return (
      (GamePhase.Offer === this.game.phase && Role.PAINTER === this.currentPlayer?.role) ||
      (GamePhase.Choose === this.game.phase && Role.BUYER === this.currentPlayer?.role)
    );
  }

  get showDemandPicker(): boolean {
    return GamePhase.Demand === this.game.phase && Role.BUYER === this.currentPlayer?.role;
  }

  get allowDemandConfirm(): boolean {
    return this.showDemandPicker && this.game.currentDemandSuggestions.length === 1;
  }

  get showEndRoundConfirm(): boolean {
    return GamePhase.Evaluate === this.game.phase;
  }

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  setDemand() {
    apiFunctions.setDemand(this.game.id);
  }

  endRound() {
    apiFunctions.endOfRound(this.game.id).catch((error) => console.error(error));
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
