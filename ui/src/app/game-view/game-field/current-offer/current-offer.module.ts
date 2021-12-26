import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer.component';
import { PictureModule } from '../../../shared/picture/picture.module';
import { OfferPreviewModule } from '../offer-preview/offer-preview.module';
import { MatButtonModule } from '@angular/material/button';
import { CounterModule } from '../counter/counter.module';

@NgModule({
  declarations: [CurrentOfferComponent],
  exports: [CurrentOfferComponent],
  imports: [CommonModule, PictureModule, OfferPreviewModule, MatButtonModule, CounterModule],
})
export class CurrentOfferModule {}
