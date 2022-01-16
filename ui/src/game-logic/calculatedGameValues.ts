import { DELETE_CLEARANCE_TIME, DemandSuggestion, Game, GameInfo, GamePhase, GameRound, Picture, Player } from './game';
import { minDemand } from './gameConsts';

export function getCurrentRound(game: Game): GameRound {
  return game.rounds[game.currentRound];
}

export function isPictureSelectedFromPainter(pic: Picture): boolean {
  return !!pic.painterTheme;
}

export function isPictureSelectedFromBuyer(pic: Picture): boolean {
  return !!pic.buyerTheme;
}

export function getOfferedPictures(game: Game): Picture[] {
  return game.players.reduce(
    (currentArr: Picture[], player: Player) =>
      currentArr.concat(
        (player.pictures ?? []).filter(isPictureSelectedFromPainter).map((pic) => {
          pic.painterId = player.id;
          return pic;
        })
      ),
    []
  );
}

export function getBuyerSelection(game: Game): Picture[] {
  return game && GamePhase.Choose === game.phase
    ? game.rounds[game.currentRound].pictures.filter(
        (pic) => !!pic.buyerTheme || (pic.buyerSelection && !!Object.keys(pic.buyerSelection).length)
      )
    : [];
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

export function getPlayersWithRequiredAction(_game: Game): Player[] {
  return []; // todo
}

export function getClearedForDeletion(game: Game | GameInfo, nowTime: number = new Date().getTime()): boolean {
  if (game?.creationTime) {
    const diff = nowTime - new Date(game.creationTime).getTime();
    return diff > DELETE_CLEARANCE_TIME;
  } else {
    return [GamePhase.Init, GamePhase.End].includes(game.phase);
  }
}

export function getPlayerInGame(game: { players: Player[] }, playerId?: string): Player | undefined {
  return game.players.find((player: Player) => player.id === playerId);
}
