import {
  activityAndSport,
  animals,
  bodyParts,
  clothingAndAccessories,
  foodAndDrink,
  nature,
  splitEmojis,
  travelAndPlaces,
  weatherAndEarth,
} from "game-tools-js";

export const emojis: string[] = splitEmojis(
  bodyParts +
    clothingAndAccessories +
    animals +
    nature +
    weatherAndEarth +
    foodAndDrink +
    activityAndSport +
    travelAndPlaces
);

export const minDemand = 2;
export const maxDemand = 7;
export const fakesPerRound = 4;
export const gameEndCondition = 6;

export const getNumOfCardsPerPlayer = (numOfPlayers: number): number => {
  if (numOfPlayers <= 3) {
    return 18;
  } else if (numOfPlayers <= 5) {
    return 9;
  } else {
    return 6;
  }
};
