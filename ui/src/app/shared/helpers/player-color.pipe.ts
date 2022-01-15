import { Pipe, PipeTransform } from '@angular/core';
import { GameService, PlayerMapping } from '../../game.service';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'playerColor',
})
export class PlayerColorPipe implements PipeTransform {
  constructor(private _gameService: GameService) {}

  transform(playerId?: string): Observable<string | null> {
    return this._gameService.playerMapping$.pipe(
      map((mapping: PlayerMapping) => {
        return (playerId && mapping[playerId]?.color) ?? null;
      })
    );
  }
}
