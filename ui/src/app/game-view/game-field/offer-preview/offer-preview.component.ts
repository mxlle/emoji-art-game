import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Picture } from '../../../../game-logic/game';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPreviewComponent {
  @Input() demand: number = 0;
  @Input() offerCount: number = 0;

  get offerPreview(): Picture[] {
    const remainingDemand = this.demand - this.offerCount;
    const offer = new Array(this.offerCount).fill('?');
    const demandArray = remainingDemand > 0 ? new Array(remainingDemand).fill('') : [];

    return [...offer, ...demandArray].map((card) => ({ card }));
  }

  constructor() {}
}
