import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPreviewComponent } from './offer-preview.component';
import { CardModule } from '../../../../ui-components/card/card.module';
import { PlayerMarkerModule } from '../../../../shared/player-marker/player-marker.module';
import { HelpersModule } from '../../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [CommonModule, CardModule, PlayerMarkerModule, HelpersModule],
  exports: [OfferPreviewComponent],
})
export class OfferPreviewModule {}
