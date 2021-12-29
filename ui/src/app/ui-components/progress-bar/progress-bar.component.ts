import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { allColors } from '../../../game-tools/color-util';

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
    const sortedColors = allColors.filter((c) => this.colors.includes(c));
    return `linear-gradient(to right, ${sortedColors.join(',')})`;
  }
}
