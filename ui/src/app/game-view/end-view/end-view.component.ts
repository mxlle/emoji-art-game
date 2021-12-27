import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerGame } from '../../../game-logic/game';
import { masterFaker, pointsEmoji } from '../../../game-logic/gameConsts';
import { trackByPictureCard } from '../../ui-helpers';

@Component({
  selector: 'app-end-view',
  templateUrl: './end-view.component.html',
  styleUrls: ['./end-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndViewComponent {
  @Input() game!: PlayerGame;

  readonly pointsEmoji = pointsEmoji;
  readonly masterFaker = masterFaker;

  readonly trackByPictureCard = trackByPictureCard;
}
