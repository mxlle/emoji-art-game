import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PublicGame } from '../../../../game-logic/game';
import apiFunctions from '../../../../data/apiFunctions';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandComponent {
  @Input() game!: PublicGame;

  get allowDemandConfirm(): boolean {
    return this.game.currentDemandSuggestions.length === 1;
  }

  setDemand() {
    apiFunctions.setDemand(this.game.id);
  }
}
