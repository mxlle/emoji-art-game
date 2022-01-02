import {
  activityAndSport,
  activityPersons,
  additionalSmileys,
  animalFaces,
  animals,
  bodyParts,
  clothingAndAccessories,
  foodAndDrink,
  jobs,
  nature,
  objects1,
  objects2,
  objects3,
  objects4,
  phantasy,
  splitEmojis,
  travelAndPlaces,
  weatherAndEarth,
} from '../game-tools/emoji-util';
import { GamePhase, Joker, JokerType, Role } from './game';

export const emojis: string[] = splitEmojis(
  bodyParts +
    additionalSmileys +
    jobs +
    phantasy +
    clothingAndAccessories +
    animalFaces +
    animals +
    nature +
    weatherAndEarth +
    foodAndDrink +
    activityAndSport +
    activityPersons +
    travelAndPlaces +
    objects1 +
    objects2 +
    objects3 +
    objects4
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

export const bestPoints = 30;

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

export function getJokerLabel(joker: Joker): string {
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
      return `📊`;
    case GamePhase.End:
      return `${pointsEmoji}⌛`;
    default:
      return '?';
  }
};
