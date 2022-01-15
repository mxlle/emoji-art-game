import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getColorGradient } from '../../../game-tools/color-util';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() colors: string[] = [];

  get background(): string {
    return getColorGradient(this.colors);
  }
}
