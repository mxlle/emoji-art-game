import { SETTING_ID } from './constants';
import { generateEmojiId } from '../game-tools/emoji-util';
import { getPlayerInGame } from '../game-logic/gameLogic';
import { Game, Player } from '../game-logic/game';

export function getCurrentUserId() {
  let userId = localStorage.getItem(SETTING_ID) || '';
  if (!userId) {
    userId = generateEmojiId();
    localStorage.setItem(SETTING_ID, userId);
  }
  return userId;
}

export function getCurrentUserInGame(game: Game): Player | undefined {
  return getPlayerInGame(game, getCurrentUserId());
}

export function getNameListString(names: string[]) {
  let nameListString = names.join(', ');
  const n = nameListString.lastIndexOf(',');
  if (n >= 0) {
    nameListString = nameListString.substring(0, n) + ' &' + nameListString.substring(n + 1, nameListString.length);
  }
  return nameListString;
}

export function getGameDuration(durationInMillis: number) {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;

  let remainingMillis = durationInMillis;
  const days = Math.floor(remainingMillis / ONE_DAY);
  remainingMillis -= days * ONE_DAY;
  const hours = Math.floor(remainingMillis / ONE_HOUR);
  remainingMillis -= hours * ONE_HOUR;
  const minutes = Math.floor(remainingMillis / ONE_MINUTE);
  remainingMillis -= minutes * ONE_MINUTE;
  const seconds = Math.floor(remainingMillis / ONE_SECOND);

  return { days, hours, minutes, seconds };
}

export function easeInQuad(x: number, of: number): number {
  const x1 = x / of;
  const x_quad = x1 * x1;
  return Math.ceil(x_quad * of);
}
