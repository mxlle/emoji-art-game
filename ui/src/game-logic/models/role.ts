import { Player } from './player';
import { GamePhase } from './gamePhase';

export enum Role {
  BUYER = '🔍',
  PAINTER = '🎨',
}

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
