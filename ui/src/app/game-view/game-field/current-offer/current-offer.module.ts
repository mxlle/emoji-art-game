import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer.component';
import { PictureModule } from '../../../shared/picture/picture.module';
import { OfferPreviewModule } from '../offer-preview/offer-preview.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CurrentOfferComponent],
  exports: [CurrentOfferComponent],
  imports: [CommonModule, PictureModule, OfferPreviewModule, MatButtonModule],
})
export class CurrentOfferModule {}
