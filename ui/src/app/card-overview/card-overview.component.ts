import { ChangeDetectionStrategy, Component } from '@angular/core';
import { emojis, gameEmojis } from '../../game-logic/gameConsts';
import { splitEmojis } from '../../game-tools/emoji-util';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOverviewComponent {
  cards = emojis;
  readonly gameEmojis = splitEmojis(gameEmojis);
}
