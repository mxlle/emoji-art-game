import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer.component';
import { PictureModule } from '../../../shared/picture/picture.module';
import { OfferPreviewModule } from './offer-preview/offer-preview.module';
import { MatButtonModule } from '@angular/material/button';
import { CounterModule } from '../counter/counter.module';
import { FlipCardModule } from '../../../shared/flip-card/flip-card.module';
import { CardModule } from '../../../ui-components/card/card.module';

@NgModule({
  declarations: [CurrentOfferComponent],
  exports: [CurrentOfferComponent],
  imports: [CommonModule, PictureModule, OfferPreviewModule, MatButtonModule, CounterModule, FlipCardModule, CardModule],
})
export class CurrentOfferModule {}
