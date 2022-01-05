import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Picture, PublicGame } from '../../../../../game-logic/game';
import { trackByPictureCard } from '../../../../util/ui-helpers';
import { fakesPerRound, masterFaker } from '../../../../../game-logic/gameConsts';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPreviewComponent {
  @Input() game!: PublicGame;
  @HostBinding('class.prepare-end-animation') @Input() prepareEndAnimation: boolean = false;
  @HostBinding('class.show-end-animation') @Input() showEndAnimation: boolean = false;

  readonly fakerArray: string[] = new Array(fakesPerRound).fill(masterFaker);

  readonly trackByPictureCard = trackByPictureCard;

  get offerPreview(): Picture[] {
    const remainingDemand = this.game.currentDemand - this.game.offerPreview.length;

    const demandArray = remainingDemand > 0 ? new Array(remainingDemand).fill('').map((card) => ({ card })) : [];

    return [...this.game.offerPreview, ...demandArray];
  }
}
