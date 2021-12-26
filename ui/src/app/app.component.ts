import { ChangeDetectionStrategy, Component } from '@angular/core';
import { buyer, masterFaker, painter } from '../game-logic/gameConsts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = `Emoji Art Game`;
  titleEmojis = `${masterFaker}${painter}${buyer}`;
}
