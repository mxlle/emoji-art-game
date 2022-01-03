import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandPickerComponent } from './demand-picker.component';
import { CardModule } from '../../../../ui-components/card/card.module';
import { PlayerMarkerModule } from '../../../../shared/player-marker/player-marker.module';

@NgModule({
  declarations: [DemandPickerComponent],
  exports: [DemandPickerComponent],
  imports: [CommonModule, CardModule, PlayerMarkerModule],
})
export class DemandPickerModule {}
