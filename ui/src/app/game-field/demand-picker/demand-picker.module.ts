import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandPickerComponent } from './demand-picker.component';
import { CardModule } from '../../card/card.module';

@NgModule({
  declarations: [DemandPickerComponent],
  exports: [DemandPickerComponent],
  imports: [CommonModule, CardModule],
})
export class DemandPickerModule {}
