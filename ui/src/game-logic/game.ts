export const DELETE_CLEARANCE_TIME: number = 7 * 24 * 60 * 60 * 1000; // 1 week

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

  creationTime?: Date;
  startTime?: Date;
  endTime?: Date;
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
  buyerSelection?: BuyerSelection[];
  isFake?: boolean;
}

export enum Role {
  BUYER = '🔍',
  PAINTER = '🎨',
}

export interface Player {
  id: string;
  name: string;
  color?: string;
  role?: Role;
  pictures: Picture[];
}

export interface BuyerSelection {
  // playerIds per theme
  theme: string;
  playerIds: string[];
}

// API related interfaces

export interface GameApi {
  loadGames: () => Promise<Game[]>;
  loadGame: (gameId: string) => Promise<Game | null>;
  addGame: (game: Game) => Promise<string>;
  addPlayer: (gameId: string, player: Player) => Promise<boolean>;
  updatePlayer: (gameId: string, player: Player) => Promise<boolean>;
  removePlayerFromGame: (gameId: string, playerId: string) => Promise<boolean>;
  startGame: (gameId: string) => Promise<boolean>;
  setDemand: (gameId: string, demand: number) => Promise<boolean>;
  togglePainterSelections: (gameId: string, card: string, theme: string) => Promise<boolean>;
  offerPictures: (gameId: string) => Promise<boolean>;
  toggleBuyerPreSelections: (gameId: string, card: string, theme: string) => Promise<boolean>;
  choosePictures: (gameId: string) => Promise<boolean>;
  endOfRound: (gameId: string) => Promise<boolean>;
  deleteGame: (gameId: string) => Promise<boolean>;
}

export interface NotificationEventOptions {
  transKey: string;
  audience?: string[];
  tOptions?: any;
  variant?: 'success' | 'info' | 'warning' | 'error';
}

export enum GameEvent {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
  UpdateList = 'updateGameList',
  Update = 'updateGame',
  ApiCall = 'apiCall.games',
  Notification = 'notification',
  Confetti = 'confetti',
}

// Event values from socket-io
export enum SocketEvent {
  Connect = 'connect',
  ConnectError = 'connect_error',
  ConnectTimeout = 'connect_timeout',
  Connecting = 'connecting',
  Disconnect = 'disconnect',
  Error = 'error',
  Reconnect = 'reconnect',
  ReconnectAttempt = 'reconnect_attempt',
  ReconnectFailed = 'reconnect_failed',
  ReconnectError = 'reconnect_error',
  Reconnecting = 'reconnecting',
  Ping = 'ping',
  Pong = 'pong',
}

export const ROOM_GAME_LIST = 'gameList';
export const ROOM_GAME = (id: string) => `game.${id}`;
