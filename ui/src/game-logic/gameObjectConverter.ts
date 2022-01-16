import { Game, GameInfo, GamePhase, Player, PublicGame, Role } from './game';
import { masterFaker, unknownCardEmoji } from './gameConsts';
import { getBuyerSelection, getOfferedPictures } from './calculatedGameValues';

export function toPublicGame(game: Game): PublicGame {
  const { id, name, hostId, players, jokers, phase, currentRound, rounds, teamPoints, fakePoints, creationTime, startTime, endTime } = game;
  const round = rounds[currentRound];

  return {
    id,
    name,
    hostId,
    players: players.map(mapToPublicPlayer),
    jokers,
    currentOffer:
      round?.pictures.map(({ card, isFake, buyerTheme, painterTheme, buyerSelection, fakeStatusKnown, painterId }) => {
        if (GamePhase.Evaluate === phase) {
          return { card, isFake, buyerTheme, painterTheme, painterId };
        } else {
          let painterTheme = fakeStatusKnown ? (isFake ? masterFaker : Role.PAINTER) : undefined;
          return { card, buyerSelection, painterTheme };
        }
      }) ?? [],
    currentThemes: round?.themes ?? [],
    currentDemand: round?.demand ?? 0,
    currentDemandSuggestions: round?.demandSuggestions ?? [],
    offerPreview: getOfferedPictures(game).map(({ painterId }) => ({ card: unknownCardEmoji, painterId })),
    selectionCount: getBuyerSelection(game).length,
    correctCount: round?.pictures.filter((pic) => game.teamPoints.findIndex((p) => pic.card === p.card) > -1).length,
    phase,
    teamPoints,
    fakePoints,
    creationTime,
    startTime,
    endTime,
  };
}

export function toGameInfo(game: Game): GameInfo {
  const { id, name, hostId, players, phase, creationTime, startTime, endTime, teamPoints } = game;
  let endResult = undefined;
  if (GamePhase.End === phase) {
    endResult = teamPoints.length;
  }

  return {
    id,
    name,
    hostId,
    players: players.map(mapToPublicPlayer),
    phase,
    creationTime,
    startTime,
    endTime,
    endResult,
  };
}

function mapToPublicPlayer({ id, name, color, role }: Player): Player {
  return { id, name, color, role };
}
