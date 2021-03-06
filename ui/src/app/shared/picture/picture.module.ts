import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from '../../ui-components/card/card.module';
import { BuyerSelectionMarkerModule } from '../buyer-selection-marker/buyer-selection-marker.module';
import { ColorDotModule } from '../color-dot/color-dot.module';
import { HelpersModule } from '../helpers/helpers.module';
import { ZoomViewModule } from '../../ui-components/zoom-view/zoom-view.module';

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule, MatCardModule, CardModule, BuyerSelectionMarkerModule, ColorDotModule, HelpersModule, ZoomViewModule],
  exports: [PictureComponent],
})
export class PictureModule {}
