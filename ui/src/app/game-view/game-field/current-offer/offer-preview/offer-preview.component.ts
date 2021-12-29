import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Picture } from '../../../../../game-logic/game';
import { trackByPictureCard } from '../../../../ui-helpers';
import { fakesPerRound, masterFaker, unknownCardEmoji } from '../../../../../game-logic/gameConsts';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPreviewComponent {
  @Input() demand: number = 0;
  @Input() offerCount: number = 0;
  @HostBinding('class.show-end-animation') @Input() showEndAnimation: boolean = false;

  readonly fakerArray: string[] = new Array(fakesPerRound).fill(masterFaker);

  readonly trackByPictureCard = trackByPictureCard;

  get offerPreview(): Picture[] {
    const remainingDemand = this.demand - this.offerCount;
    const offer = new Array(this.offerCount).fill(unknownCardEmoji);
    const demandArray = remainingDemand > 0 ? new Array(remainingDemand).fill('') : [];

    return [...offer, ...demandArray].map((card) => ({ card }));
  }

  constructor() {}
}
