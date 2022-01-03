import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appScale]',
})
export class ScaleDirective {
  @Input('appScale') value: number = 1;
  @HostBinding('style.transform') get scaleTransformValue(): string {
    return `scale(${this.value})`;
  }
}
