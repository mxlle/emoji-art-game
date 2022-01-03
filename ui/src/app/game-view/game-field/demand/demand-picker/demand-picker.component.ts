import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { maxDemand, minDemand } from '../../../../../game-logic/gameConsts';
import { DemandSuggestion, PublicGame } from '../../../../../game-logic/game';
import apiFunctions from '../../../../../data/apiFunctions';
import { getCurrentUserId } from '../../../../../data/functions';

@Component({
  selector: 'app-demand-picker',
  templateUrl: './demand-picker.component.html',
  styleUrls: ['./demand-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandPickerComponent {
  @Input() game!: PublicGame;

  readonly currentPlayerId = getCurrentUserId();

  readonly demandOptions: number[] = [...Array(maxDemand - minDemand + 1).keys()].map((val) => val + minDemand);

  getDemandIsSelected(demand: number): boolean {
    const suggestion = this.getSuggestionForDemand(demand);
    return !!suggestion && suggestion.playerIds.includes(this.currentPlayerId);
  }

  getSuggestionForDemand(demand: number): DemandSuggestion | undefined {
    return this.game.currentDemandSuggestions?.find((s: DemandSuggestion) => s.demand === demand);
  }

  suggestDemand(demand: number) {
    apiFunctions.suggestDemand(this.game.id, demand);
  }
}
