import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';
import { ZoomViewService } from '../zoom-view/zoom-view.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() @HostBinding('class.clickable') clickable?: boolean;
  @Input() @HostBinding('class.disabled') disabled?: boolean;
  @Input() @HostBinding('class.selected') selected?: boolean;
  @Input() zoomEmoji?: string;

  get showZoomButton(): boolean {
    return !!this.zoomEmoji;
  }

  constructor(private _zoomViewService: ZoomViewService) {}

  openZoomView(event: MouseEvent) {
    if (this.zoomEmoji) {
      event.stopPropagation();
      this._zoomViewService.open(this.zoomEmoji);
    }
  }
}

@Directive({
  selector: '[appCardTopRight]',
})
export class CardTopRightDirective {}

@Directive({
  selector: '[appCardBottomLeft]',
})
export class CardBottomLeftDirective {}
