import http from 'http';
import SocketIO from 'socket.io';
import GameApiImpl from './routes/Games';
import { GameApi, GameEvent, ROOM_GAME, ROOM_GAME_LIST, ROOM_GAME_PLAYER } from '@gameTypes';

export const httpServer = http.createServer();
const io = SocketIO(httpServer, {
  path: '/api',
  serveClient: false,
});

interface GamesApiCall {
  action: keyof GameApi;
  auth: string;
  params: any[];
}
type ErrorFirstCallback = (error?: any, data?: any) => void;

io.on('connection', (socket) => {
  // GameController
  socket.on(GameEvent.ApiCall, ({ action, auth, params }: GamesApiCall, ack: ErrorFirstCallback) => {
    const gameApi = new GameApiImpl(io.sockets, auth);

    if (!gameApi[action]) {
      ack('Invalid action');
    }

    (<any>gameApi[action])(...params)
      .then((responseData: any) => ack(null, responseData))
      .catch((error: any) => ack(error));
  });

  socket.on(GameEvent.ListSubscribe, (ack: ErrorFirstCallback) => {
    socket.join(ROOM_GAME_LIST, ack);
  });
  socket.on(GameEvent.ListUnsubscribe, (ack: ErrorFirstCallback) => {
    socket.leave(ROOM_GAME_LIST, ack);
  });

  socket.on(GameEvent.GameSubscribe, (gameId: string, playerId: string, ack: ErrorFirstCallback) => {
    socket.join(ROOM_GAME(gameId), () => {
      socket.join(ROOM_GAME_PLAYER(gameId, playerId), ack);
    });
  });
  socket.on(GameEvent.GameUnsubscribe, (gameId: string, playerId: string, ack: ErrorFirstCallback) => {
    socket.leave(ROOM_GAME(gameId), () => {
      socket.leave(ROOM_GAME_PLAYER(gameId, playerId), ack);
    });
  });
  socket.on(GameEvent.Confetti, (gameId: string, colors: string[]) => {
    socket.in(ROOM_GAME(gameId)).emit(GameEvent.Confetti, colors);
  });
});

export default io;
