import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandComponent } from './demand.component';
import { DemandPickerModule } from './demand-picker/demand-picker.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DemandComponent],
  exports: [DemandComponent],
  imports: [CommonModule, DemandPickerModule, MatButtonModule, MatIconModule],
})
export class DemandModule {}
