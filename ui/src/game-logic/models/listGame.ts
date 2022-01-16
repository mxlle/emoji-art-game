import { mapToPublicPlayer, Player } from './player';
import { GamePhase } from './gamePhase';
import { Game } from './game';

const DELETE_CLEARANCE_TIME: number = 7 * 24 * 60 * 60 * 1000; // 1 week

export interface ListGame {
  id: string;
  name: string;
  players: Player[];
  hostId: string;
  phase: GamePhase;
  creationTime?: Date;
  startTime?: Date;
  endTime?: Date;
  endResult?: number;
}

export function toListGame(game: Game): ListGame {
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
export function getClearedForDeletion(game: Game | ListGame, nowTime: number = new Date().getTime()): boolean {
  if (game?.creationTime) {
    const diff = nowTime - new Date(game.creationTime).getTime();
    return diff > DELETE_CLEARANCE_TIME;
  } else {
    return [GamePhase.Init, GamePhase.End].includes(game.phase);
  }
}
