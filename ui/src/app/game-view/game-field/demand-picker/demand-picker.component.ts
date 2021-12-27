import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { maxDemand, minDemand } from '../../../../game-logic/gameConsts';
import { DemandSuggestion, Player, PlayerGame } from '../../../../game-logic/game';
import apiFunctions from '../../../../data/apiFunctions';
import { getPlayerInGame } from '../../../../game-logic/gameLogic';

@Component({
  selector: 'app-demand-picker',
  templateUrl: './demand-picker.component.html',
  styleUrls: ['./demand-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandPickerComponent {
  @Input() game!: PlayerGame;

  demandOptions: number[] = [...Array(maxDemand - minDemand + 1).keys()].map((val) => val + minDemand);

  getDemandIsSelected(demand: number): boolean {
    const suggestion = this.getSuggestionForDemand(demand);
    const playerId = this.game.currentPlayer?.id;
    return !!suggestion && !!playerId && suggestion.playerIds.includes(playerId);
  }

  getSuggestionForDemand(demand: number): DemandSuggestion | undefined {
    return this.game.currentDemandSuggestions?.find((s: DemandSuggestion) => s.demand === demand);
  }

  getPlayer(playerId: string): Player | undefined {
    return getPlayerInGame(this.game, playerId);
  }
  suggestDemand(demand: number) {
    apiFunctions.suggestDemand(this.game.id, demand);
  }
}
