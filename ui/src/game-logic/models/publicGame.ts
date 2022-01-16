import { mapToPublicPlayer, Player } from './player';
import { Joker } from './joker';
import { getBuyerSelection, getOfferedPictures, Picture } from './picture';
import { GamePhase } from './gamePhase';
import { Game } from './game';
import { masterFaker, unknownCardEmoji } from '../gameConsts';
import { Role } from './role';
import { DemandSuggestion } from './demand';

export interface PublicGame {
  id: string;
  name: string;
  players: Player[];
  hostId: string;

  jokers: Joker[];

  currentOffer: Picture[];
  currentThemes: string[];

  currentDemand: number;
  currentDemandSuggestions: DemandSuggestion[];
  offerPreview: Picture[];
  selectionCount: number;
  correctCount: number;

  phase: GamePhase;

  teamPoints: Picture[];
  fakePoints: Picture[];

  creationTime?: Date;
  startTime?: Date;
  endTime?: Date;
}

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
          return { card, isFake, buyerTheme, buyerSelection, painterTheme, painterId };
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
