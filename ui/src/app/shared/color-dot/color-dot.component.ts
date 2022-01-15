import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-color-dot',
  template: '<ng-content></ng-content>',
  styleUrls: ['./color-dot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorDotComponent {
  @Input() color: string | null = null;
  @HostBinding('style.--color') get actualColor(): string {
    return !this.color ? 'var(--card-background-selected)' : this.color;
  }
}
