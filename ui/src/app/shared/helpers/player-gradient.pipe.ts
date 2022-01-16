import { Pipe, PipeTransform } from '@angular/core';
import { getPlayerColors, Role } from '../../../game-logic';
import { getColorGradient } from '../../../game-tools/color-util';
import { map, Observable } from 'rxjs';
import { GameService } from '../../game.service';

@Pipe({
  name: 'playerGradient',
})
export class PlayerGradientPipe implements PipeTransform {
  constructor(private _gameService: GameService) {}

  transform(role: Role | 'all'): Observable<string | null> {
    switch (role) {
      case Role.PAINTER:
        return this._gameService.currentPainters$.pipe(map(getPlayerColors), map(getColorGradient));
      case Role.BUYER:
        return this._gameService.currentBuyers$.pipe(map(getPlayerColors), map(getColorGradient));
      case 'all':
      default:
        return this._gameService.currentPlayers$.pipe(map(getPlayerColors), map(getColorGradient));
    }
  }
}
