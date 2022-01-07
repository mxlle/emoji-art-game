import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { getDiffToCenter } from '../../util/ui-helpers';
import { randomInt } from '../../../game-tools/random-util';

@Directive({
  selector: '[appTranslateToCenter]',
})
export class TranslateToCenterDirective implements OnChanges {
  @Input('appTranslateToCenter') active: boolean = false;
  @Input() container?: HTMLElement;
  @Input() shift: number = 0;

  x?: number;
  y?: number;

  @HostBinding('style.--translate-to-center') get translateValue(): string | undefined {
    if (this.x !== undefined && this.y !== undefined) {
      let x = this.x;
      let y = this.y;
      if (this.shift) {
        x += randomInt(this.shift, -this.shift);
        y += randomInt(this.shift, -this.shift);
      }
      return `translate(${x}px, ${y}px)`;
    } else {
      return undefined;
    }
  }

  constructor(private _elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] || changes['container']) {
      if (this.active) {
        const { x, y } = getDiffToCenter(this._elementRef.nativeElement, this.container);
        this.x = x;
        this.y = y;
      } else {
        this.x = undefined;
        this.y = undefined;
      }
    }
  }
}
