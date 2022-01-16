import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SocketEvent } from '../game-logic';
import { socket } from '../data/socket';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  get reconnect$(): Observable<void> {
    return this._reconnect$.asObservable();
  }

  private _reconnect$: Subject<void> = new Subject<void>();

  constructor(private _ngZone: NgZone) {
    socket.on(SocketEvent.Reconnect, () => this._ngZone.run(() => this._reconnect$.next()));
  }
}
