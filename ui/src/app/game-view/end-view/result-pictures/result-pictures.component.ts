import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trackByPictureCard } from '../../../util/ui-helpers';
import { Picture } from '../../../../game-logic/game';

@Component({
  selector: 'app-result-pictures',
  templateUrl: './result-pictures.component.html',
  styleUrls: ['./result-pictures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultPicturesComponent {
  @Input() pictures: Picture[] = [];
  @Input() points: number = 0;
  @Input() label: string = '';

  readonly trackByPictureCard = trackByPictureCard;
}
