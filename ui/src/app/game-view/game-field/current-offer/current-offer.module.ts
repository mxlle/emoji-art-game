import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer.component';
import { PictureModule } from '../../../shared/picture/picture.module';
import { OfferPreviewModule } from './offer-preview/offer-preview.module';
import { MatButtonModule } from '@angular/material/button';
import { CounterModule } from '../../../shared/counter/counter.module';
import { FlipCardModule } from '../../../ui-components/flip-card/flip-card.module';
import { CardModule } from '../../../ui-components/card/card.module';
import { HelpersModule } from '../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [CurrentOfferComponent],
  exports: [CurrentOfferComponent],
  imports: [CommonModule, PictureModule, OfferPreviewModule, MatButtonModule, CounterModule, FlipCardModule, CardModule, HelpersModule],
})
export class CurrentOfferModule {}
