import {
  activityAndSport,
  animalFaces,
  animals,
  bodyParts,
  clothingAndAccessories,
  foodAndDrink,
  nature,
  objects1,
  objects2,
  objects3,
  objects4,
  splitEmojis,
  travelAndPlaces,
  weatherAndEarth,
} from '../game-tools/emoji-util';
import { Role } from './game';

export const emojis: string[] = splitEmojis(
  bodyParts +
    clothingAndAccessories +
    animalFaces +
    animals +
    nature +
    weatherAndEarth +
    foodAndDrink +
    activityAndSport +
    travelAndPlaces +
    objects1 +
    objects2 +
    objects3 +
    objects4
);

export const masterFaker = '🥸';
export const painter = Role.PAINTER;
export const buyer = Role.BUYER;

export const minNumPlayers = 2;
export const themesPerRound = 2;
export const minDemand = 2;
export const maxDemand = 7;
export const fakesPerRound = 4;
export const gameEndCondition = 6;

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
