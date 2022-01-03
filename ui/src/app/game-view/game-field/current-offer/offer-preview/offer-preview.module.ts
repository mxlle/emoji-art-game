import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPreviewComponent } from './offer-preview.component';
import { CardModule } from '../../../../ui-components/card/card.module';
import { PlayerMarkerModule } from '../../../../shared/player-marker/player-marker.module';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [CommonModule, CardModule, PlayerMarkerModule],
  exports: [OfferPreviewComponent],
})
export class OfferPreviewModule {}
