import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { create, CreateTypes } from 'canvas-confetti';
import { allColors } from '../../../game-tools/color-util';
import { ConfettiEvent, GameService } from '../../game.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-confetti',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./confetti.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfettiComponent implements OnDestroy {
  @ViewChild('canvas') set canvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this._confettiCannon = create(canvasRef.nativeElement, { resize: true });
  }

  private _confettiCannon?: CreateTypes;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _gameService: GameService) {
    this._gameService.confetti$.pipe(takeUntil(this._destroy$)).subscribe((event: ConfettiEvent) => {
      this._triggerConfetti(event.colors, event.amount);
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  private _triggerConfetti(colors: string[] = allColors, amount: number = 1) {
    if (this._confettiCannon) {
      let particleCount = Math.floor(amount * 60) + 10; // 70 when 100%
      const CONFETTI_BASE_OPTIONS = {
        colors: colors,
        startVelocity: 70,
        particleCount,
        spread: 60,
      };
      this._confettiCannon({
        ...CONFETTI_BASE_OPTIONS,
        angle: 125,
        origin: { x: 1, y: 1 },
      });
      this._confettiCannon({
        ...CONFETTI_BASE_OPTIONS,
        angle: 55,
        origin: { x: 0, y: 1 },
      });
    }
  }
}
