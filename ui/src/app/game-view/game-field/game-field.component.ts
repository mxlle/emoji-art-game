import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { GamePhase, Player, PublicGame, Role } from '../../../game-logic/game';
import apiFunctions from '../../../data/apiFunctions';
import { scrollTop } from '../../util/scroll-into-view';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;
  @ViewChild('scrollContainer') container?: ElementRef<HTMLElement>;

  currentTheme: string = '';

  get themesActive(): boolean {
    return (
      (GamePhase.Offer === this.game.phase && Role.PAINTER === this.currentPlayer?.role) ||
      (GamePhase.Choose === this.game.phase && Role.BUYER === this.currentPlayer?.role)
    );
  }

  get showQuickAccess(): boolean {
    return this.themesActive;
  }

  get showDemandPicker(): boolean {
    return GamePhase.Demand === this.game.phase && Role.BUYER === this.currentPlayer?.role;
  }

  get showEndRoundConfirm(): boolean {
    return GamePhase.Evaluate === this.game.phase && !!this.currentPlayer;
  }

  onThemesChange() {
    scrollTop(this.container?.nativeElement);
  }

  endRound() {
    apiFunctions.endOfRound(this.game.id).catch((error) => console.error(error));
  }

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
