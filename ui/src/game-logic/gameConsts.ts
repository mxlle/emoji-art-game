import {
  accessories,
  activity,
  activityPersons,
  animals,
  bodyParts,
  clothing,
  foodAndDrink,
  jobs,
  music,
  nature,
  objects1,
  objects2,
  objects3,
  objects4,
  phantasy,
  smileysForGame,
  splitEmojis,
  sport,
  travelAndPlaces,
  vehicles,
  weatherAndEarth,
} from '../game-tools/emoji-util';
import { GameConfig, GamePhase, Joker, JokerType, Player, Role } from './game';
import { emojiCategories } from './deck';

export const emojis: string[] = splitEmojis(
  bodyParts +
    jobs +
    phantasy +
    clothing +
    accessories +
    animals +
    nature +
    weatherAndEarth +
    foodAndDrink +
    sport +
    activity +
    music +
    activityPersons +
    vehicles +
    travelAndPlaces +
    objects1 +
    objects2 +
    objects3 +
    objects4 +
    smileysForGame
);

export const masterFaker = '🥸';
export const painter = Role.PAINTER;
export const buyer = Role.BUYER;

export const gameEmojis = masterFaker + painter + buyer;

export const pointsEmoji = '🏆';
export const discardedEmoji = '🗑️';
export const unknownCardEmoji = '❔';

export const minNumPlayers = 2;
export const themesPerRound = 2;
export const minDemand = 2;
export const maxDemand = 7;
export const fakesPerRound = 4;
export const gameEndCondition = 6;

export const minDeck = 140;

export const bestPoints = 30;

const deckCategories = emojiCategories.map((cat) => cat.id);
export const minPerCategory = Math.ceil(minDeck / deckCategories.length);
export const maxPerCategory = Math.max(...emojiCategories.map((cat) => cat.emojis.length));

export const getDefaultConfig = (): GameConfig => {
  return {
    deckCategories,
    deckLimitPerCategory: 7,
    calculatedCount: deckCategories.length * 7,
  };
};

export const roleOrder: Role[] = [Role.PAINTER, Role.BUYER, Role.BUYER, Role.PAINTER, Role.BUYER];

export const getRoleOrder = (numOfPlayer: number): Role[] => {
  const order = [];
  while (order.length < numOfPlayer) {
    order.push(...roleOrder);
  }
  return order.slice(0, numOfPlayer);
};

export const getNumOfCardsPerPlayer = (numOfPlayers: number): number => {
  if (numOfPlayers <= 3) {
    return 18;
  } else if (numOfPlayers <= 5) {
    return 9;
  } else {
    return 6;
  }
};

export const getInitialJokers = (): Joker[] => {
  return [
    { type: 3, phase: GamePhase.Demand, role: Role.BUYER, used: false },
    { type: 4, phase: GamePhase.Offer, role: Role.PAINTER, used: false },
    { type: 5, phase: GamePhase.Offer, role: Role.PAINTER, used: false },
    { type: 6, phase: GamePhase.Choose, role: Role.BUYER, used: false },
  ];
};

export function getJokerLabel(joker: { type: JokerType }): string {
  switch (joker.type) {
    case JokerType.EXCHANGE_THEMES:
      return `2️⃣🔄`;
    case JokerType.SWAP_HAND:
      return `✋🔄`;
    case JokerType.CHANGE_DEMAND:
      return `➕➖`;
    case JokerType.QUESTION_PICTURE:
      return `🖼️❓`;
    default:
      return '';
  }
}

export const getPhaseEmojis = (phase: GamePhase) => {
  switch (phase) {
    case GamePhase.Init:
      return `👥`;
    case GamePhase.Demand:
      return `${Role.BUYER}🔢`;
    case GamePhase.Offer:
      return `${Role.PAINTER}🖼️`;
    case GamePhase.Choose:
      return `${Role.BUYER}💰`;
    case GamePhase.Evaluate:
      return `📊${pointsEmoji}`;
    case GamePhase.End:
      return `${pointsEmoji}⌛`;
    default:
      return '?';
  }
};

export const isRoleActive = (game: { phase: GamePhase; hostId: string }, currentPlayer?: Player): boolean => {
  switch (game.phase) {
    case GamePhase.Init:
      return !currentPlayer || currentPlayer?.id === game.hostId;
    case GamePhase.Demand:
      return Role.BUYER == currentPlayer?.role;
    case GamePhase.Offer:
      return Role.PAINTER == currentPlayer?.role;
    case GamePhase.Choose:
      return Role.BUYER == currentPlayer?.role;
    case GamePhase.Evaluate:
      return !!currentPlayer;
    case GamePhase.End:
      return !!currentPlayer;
    default:
      return false;
  }
};
