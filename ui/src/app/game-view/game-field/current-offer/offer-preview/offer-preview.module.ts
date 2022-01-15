import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPreviewComponent } from './offer-preview.component';
import { CardModule } from '../../../../ui-components/card/card.module';
import { ColorDotModule } from '../../../../shared/color-dot/color-dot.module';
import { HelpersModule } from '../../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [CommonModule, CardModule, ColorDotModule, HelpersModule],
  exports: [OfferPreviewComponent],
})
export class OfferPreviewModule {}
