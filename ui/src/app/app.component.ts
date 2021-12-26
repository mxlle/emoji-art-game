import { ChangeDetectionStrategy, Component } from '@angular/core';
import { gameEmojis } from '../game-logic/gameConsts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = `Emoji Art Game`;
  readonly titleEmojis = gameEmojis;
}
