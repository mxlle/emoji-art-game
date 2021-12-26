import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPreviewComponent } from './offer-preview.component';
import { PictureModule } from '../../../shared/picture/picture.module';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [CommonModule, PictureModule],
  exports: [OfferPreviewComponent],
})
export class OfferPreviewModule {}
