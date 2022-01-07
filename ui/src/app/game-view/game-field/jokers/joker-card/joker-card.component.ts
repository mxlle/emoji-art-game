import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Joker } from '../../../../../game-logic/game';
import { getJokerLabel } from '../../../../../game-logic/gameConsts';
import { getDiffToCenter } from '../../../../util/ui-helpers';

@Component({
  selector: 'app-joker-card',
  templateUrl: './joker-card.component.html',
  styleUrls: ['./joker-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokerCardComponent {
  @Input() joker!: Joker;

  @Input() set used(newUsedValue: boolean) {
    if (this._used && !newUsedValue) {
      this._showWinBackAnimation();
    }
    this._used = newUsedValue;
  }
  private _used: boolean = false;

  @Input() disabled: boolean = false;
  @Input() clickable: boolean = false;

  @Output() useJoker: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.highlighted') highlighted: boolean = false;

  readonly getJokerLabel = getJokerLabel;

  private readonly _animationMillis = 1500;

  constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef) {}

  private _showWinBackAnimation() {
    const { x, y } = getDiffToCenter(this._elementRef.nativeElement);
    this._elementRef.nativeElement.style.setProperty('--translate-to-center', `translate(${x}px, ${y}px)`);
    this.highlighted = true;
    setTimeout(() => {
      this.highlighted = false;
      this._elementRef.nativeElement.style.removeProperty('--translate-to-center');
      this._cdr.markForCheck();
    }, this._animationMillis);
  }
}
