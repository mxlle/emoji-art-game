import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GamePhase, Player, PublicGame, Role } from '../../../../game-logic';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-quick-access-bar',
  templateUrl: './quick-access-bar.component.html',
  styleUrls: ['./quick-access-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickAccessBarComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;

  @Input() currentTheme?: string;
  @Output() currentThemeChange: EventEmitter<string> = new EventEmitter<string>();

  get showOfferConfirm(): boolean {
    return GamePhase.Offer === this.game.phase && this.currentPlayer?.role === Role.PAINTER;
  }

  get showSelectionConfirm(): boolean {
    return GamePhase.Choose === this.game.phase && this.currentPlayer?.role === Role.BUYER;
  }

  confirmOffer() {
    apiFunctions.offerPictures(this.game.id);
  }

  confirmSelection() {
    apiFunctions.choosePictures(this.game.id);
  }
}
