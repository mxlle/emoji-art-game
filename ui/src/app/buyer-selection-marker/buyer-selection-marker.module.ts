import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerSelectionMarkerComponent } from './buyer-selection-marker.component';

@NgModule({
  declarations: [BuyerSelectionMarkerComponent],
  exports: [BuyerSelectionMarkerComponent],
  imports: [CommonModule],
})
export class BuyerSelectionMarkerModule {}
