import { getCurrentUserId } from './functions';
import { GameApi, GameEvent } from '../game-logic';
import { socket } from './socket';

const Api: GameApi = new Proxy({} as GameApi, {
  get: (that, action) =>
    function (...params: any[]) {
      return new Promise((resolve, reject) => {
        socket.emit(
          GameEvent.ApiCall,
          {
            action,
            auth: getCurrentUserId(),
            params,
          },
          (error: any, data: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });
    },
});

export default Api;
