import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { ZoomViewService } from './zoom-view.service';

@Directive({
  selector: '[appZoomButton]',
})
export class ZoomButtonDirective {
  @Input('appZoomButton') emoji?: string;
  @HostBinding('style.pointer-events') pointerEvents: string = 'all';

  constructor(private _zoomViewService: ZoomViewService) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.emoji) {
      event.stopPropagation();
      this._zoomViewService.open(this.emoji);
    }
  }
}
