import { minDemand } from '../gameConsts';

export interface DemandSuggestion {
  // playerIds per demand
  demand: number;
  playerIds: string[];
}

export function getDemandFromSuggestions(suggestions: DemandSuggestion[] = []): number {
  const bestSelection = suggestions.reduce((currentSuggestion: DemandSuggestion | undefined, suggestion: DemandSuggestion) => {
    if (!currentSuggestion || suggestion.playerIds?.length > currentSuggestion.playerIds?.length) {
      return suggestion;
    }
    return currentSuggestion;
  }, undefined);
  return bestSelection?.demand ?? minDemand;
}
