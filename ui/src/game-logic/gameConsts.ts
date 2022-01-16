import { Role } from './models';
import { emojiCategories } from './deck';

export const masterFaker = '🥸';
export const painter = Role.PAINTER;
export const buyer = Role.BUYER;

export const gameEmojis = masterFaker + painter + buyer;

export const pointsEmoji = '🏆';
export const unknownCardEmoji = '❔';

export const minNumPlayers = 2;
export const themesPerRound = 2;
export const minDemand = 2;
export const maxDemand = 7;
export const fakesPerRound = 4;
export const gameEndCondition = 6;

export const minDeck = 140;

export const bestPoints = 30;

export const deckCategories = emojiCategories.map((cat) => cat.id);
export const minPerCategory = Math.ceil(minDeck / deckCategories.length);
export const maxPerCategory = Math.max(...emojiCategories.map((cat) => cat.emojis.length));
