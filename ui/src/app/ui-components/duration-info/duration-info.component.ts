import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getGameDuration } from '../../../data/functions';

@Component({
  selector: 'app-duration-info[start][end]',
  templateUrl: './duration-info.component.html',
  styleUrls: ['./duration-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInfoComponent {
  @Input() start!: Date;
  @Input() end!: Date;

  get gameDuration(): string {
    const { days, hours, minutes, seconds } = getGameDuration(new Date(this.end).getTime() - new Date(this.start).getTime());
    const timeStrings: string[] = [];
    if (days > 0) timeStrings.push(`${days} day` + (days > 1 ? 's' : ''));
    if (hours > 0) timeStrings.push(`${hours} hour` + (hours > 1 ? 's' : ''));
    if (minutes > 0) timeStrings.push(`${minutes} minute` + (minutes > 1 ? 's' : ''));
    if (seconds > 0) timeStrings.push(`${seconds} second` + (seconds > 1 ? 's' : ''));
    return timeStrings.join(', ');
  }
}
