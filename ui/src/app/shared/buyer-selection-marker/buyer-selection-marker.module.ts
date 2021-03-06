import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerSelectionMarkerComponent } from './buyer-selection-marker.component';
import { ColorDotModule } from '../color-dot/color-dot.module';
import { HelpersModule } from '../helpers/helpers.module';
import { ZoomViewModule } from '../../ui-components/zoom-view/zoom-view.module';

@NgModule({
  declarations: [BuyerSelectionMarkerComponent],
  exports: [BuyerSelectionMarkerComponent],
  imports: [CommonModule, ColorDotModule, HelpersModule, ZoomViewModule],
})
export class BuyerSelectionMarkerModule {}
