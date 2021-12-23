import { Role } from '../assets/gameConsts';

export interface Game {
  id: string;
  name: string;
  players: Player[];
  hostId: string;

  deck: string[];

  currentRound: number;
  phase: GamePhase;

  rounds: GameRound[];

  teamPoints: Picture[];
  fakePoints: Picture[];
  neutralCards: Picture[];
}

export enum GamePhase {
  Init,
  Demand,
  Offer,
  Choose,
  Evaluate,
  End,
}

export interface GameRound {
  themes: string[];
  demand?: number;
  pictures: Picture[];
}

export interface Picture {
  card: string;
  painterTheme?: string;
  buyerTheme?: string;
  isFake?: boolean;
}

export interface Player {
  id: string;
  name: string;
  color?: string;
  role?: Role;
  pictures: Picture[];
}
