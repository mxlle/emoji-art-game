import { ChangeDetectionStrategy, Component } from '@angular/core';
import { emojis } from '../../game-logic/gameConsts';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOverviewComponent {
  cards = emojis;
}
