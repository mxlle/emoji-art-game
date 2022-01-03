import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandComponent } from './demand.component';
import { DemandPickerModule } from './demand-picker/demand-picker.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DemandComponent],
  exports: [DemandComponent],
  imports: [CommonModule, DemandPickerModule, MatButtonModule],
})
export class DemandModule {}
