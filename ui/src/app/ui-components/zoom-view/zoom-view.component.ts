import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-view',
  templateUrl: './zoom-view.component.html',
  styleUrls: ['./zoom-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomViewComponent {
  readonly maxFontSize: number = 235;
  @HostBinding('style.--font-size.px') fontSize: number = this.maxFontSize;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { emoji: string }) {}
}
