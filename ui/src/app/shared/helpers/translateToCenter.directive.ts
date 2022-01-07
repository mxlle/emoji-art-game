import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { getDiffToCenter } from '../../util/ui-helpers';

@Directive({
  selector: '[appTranslateToCenter]',
})
export class TranslateToCenterDirective {
  @Input('appTranslateToCenter') active: boolean = false;
  @Input() container?: HTMLElement;

  @HostBinding('style.--translate-to-center') get scaleTransformValue(): string | undefined {
    if (this.active) {
      const { x, y } = getDiffToCenter(this._elementRef.nativeElement, this.container);
      return `translate(${x}px, ${y}px)`;
    } else {
      return undefined;
    }
  }

  constructor(private _elementRef: ElementRef) {}
}
