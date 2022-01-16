import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { randomArrayValue } from '../../../../game-tools/random-util';
import { allColors } from '../../../../game-tools/color-util';
import { GameService } from '../../../game.service';
import { Player } from '../../../../game-logic';

@Component({
  selector: 'app-confetti-button',
  templateUrl: './confetti-button.component.html',
  styleUrls: ['./confetti-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfettiButtonComponent {
  @Input() currentPlayer!: Player;

  private readonly _defaultAmmo = 5;
  private readonly _ammoTimeout = 3000;

  ammo: number = this._defaultAmmo;

  private get _color(): string {
    return this.currentPlayer.color ?? randomArrayValue(allColors);
  }

  constructor(private _gameService: GameService, private _cdr: ChangeDetectorRef) {}

  sendConfetti() {
    if (this.ammo) {
      this._gameService.sendConfetti([this._color]);
      this.ammo--;
      if (this.ammo <= 0) {
        setTimeout(() => {
          this.ammo = this._defaultAmmo;
          this._cdr.markForCheck();
        }, this._ammoTimeout);
      }
    }
  }
}
