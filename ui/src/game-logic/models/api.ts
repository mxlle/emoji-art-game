import { Game } from './game';
import { Player } from './player';
import { ListGame } from './listGame';
import { PublicGame } from './publicGame';
import { GameConfig } from './gameConfig';

export interface GameApi {
  loadGames: () => Promise<ListGame[]>;
  loadGame: (gameId: string) => Promise<PublicGame | null>;
  addGame: (game: Game) => Promise<string>;
  addPlayer: (gameId: string, player: Player) => Promise<boolean>;
  updatePlayer: (gameId: string, player: Player) => Promise<boolean>;
  removePlayerFromGame: (gameId: string, playerId: string) => Promise<boolean>;
  startGame: (gameId: string, config: GameConfig) => Promise<boolean>;
  useExchangeThemesJoker: (gameId: string) => Promise<boolean>;
  suggestDemand: (gameId: string, demand: number) => Promise<boolean>;
  setDemand: (gameId: string) => Promise<boolean>;
  useSwapHandJoker: (gameId: string) => Promise<boolean>;
  useChangeDemandJoker: (gameId: string, newDemand: number) => Promise<boolean>;
  togglePainterSelections: (gameId: string, card: string, theme: string) => Promise<boolean>;
  offerPictures: (gameId: string) => Promise<boolean>;
  useQuestionPictureJoker: (gameId: string, card: string) => Promise<boolean>;
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
  GameSubscribe = 'subscribe',
  GameUnsubscribe = 'unsubscribe',
  ListSubscribe = 'list_subscribe',
  ListUnsubscribe = 'list_unsubscribe',
  UpdateList = 'updateGameList',
  Update = 'updateGame',
  UpdatePlayerData = 'updateGamePlayer',
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
export const ROOM_PLAYER_GAME_LIST = (playerId: string) => `gameList.${playerId}`;
export const ROOM_GAME = (id: string) => `game.${id}`;
export const ROOM_GAME_PLAYER = (id: string, playerId: string) => `game.${id}.${playerId}`;
