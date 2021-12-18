export interface Game {
  id: string;
  name: string;
  players: Player[];
  hostId: string;

  deck: string[];

  currentRound: number;
  phase: GamePhase;

  rounds: GameRound[];

  chosenFakes: string[];
  chosenOriginals: string[];
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
  originals: string[];
  offeredPictures: string[];
  chosenPictures: string[];
}

export interface Player {
  id: string;
  name: string;
  color?: string;
  pictures: string[];
  selectedPictures: string[];
}
