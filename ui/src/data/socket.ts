import * as io from 'socket.io-client';
import { SocketEvent } from '../game-logic/game';

const socket = io({
  path: '/api',
  enablesXDR: true,
});

socket.on(SocketEvent.Connect, () => {
  console.debug('Socket.io connected:  ' + socket.id);
});
socket.on(SocketEvent.ConnectError, (e: Error) => console.warn('connect_error', e.message));
socket.on(SocketEvent.Error, (e: Error) => console.warn('error', e.message));
socket.on(SocketEvent.ConnectTimeout, (timeout: any) => console.warn('connect_timeout', timeout));
socket.on(SocketEvent.Disconnect, (timeout: any) => console.warn('disconnect', timeout));

export { socket };
