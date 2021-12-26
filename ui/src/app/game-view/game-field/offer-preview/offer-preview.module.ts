import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPreviewComponent } from './offer-preview.component';
import { CardModule } from '../../../shared/card/card.module';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [CommonModule, CardModule],
  exports: [OfferPreviewComponent],
})
export class OfferPreviewModule {}
