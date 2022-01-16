import { EmojiCategoryId } from '../deck';
import { Role } from './role';
import { deckCategories } from '../gameConsts';

export interface GameConfig {
  deckCategories: EmojiCategoryId[];
  deckLimitPerCategory: number;
  calculatedCount: number;
}

export const getDefaultConfig = (): GameConfig => {
  return {
    deckCategories,
    deckLimitPerCategory: 7,
    calculatedCount: deckCategories.length * 7,
  };
};

// ROLE ORDER
export const roleOrder: Role[] = [Role.PAINTER, Role.BUYER, Role.BUYER, Role.PAINTER, Role.BUYER];
export const getRoleOrder = (numOfPlayer: number): Role[] => {
  const order = [];
  while (order.length < numOfPlayer) {
    order.push(...roleOrder);
  }
  return order.slice(0, numOfPlayer);
};

// PLAYER CARD AMOUNT
export const getNumOfCardsPerPlayer = (numOfPlayers: number): number => {
  if (numOfPlayers <= 3) {
    return 18;
  } else if (numOfPlayers <= 5) {
    return 9;
  } else {
    return 6;
  }
};
