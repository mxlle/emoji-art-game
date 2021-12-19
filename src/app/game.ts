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
  painterIds: string[];
  buyerIds: string[];
  themes: string[];
  demand?: number;
  pictures: Picture[];
}

export interface Picture {
  card: string;
  painterTheme?: number;
  buyerTheme?: number;
  isFake?: boolean;
}

export interface Player {
  id: string;
  name: string;
  color?: string;
  pictures: Picture[];
}
