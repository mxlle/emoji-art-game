import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandPickerComponent } from './demand-picker.component';
import { CardModule } from '../../../../ui-components/card/card.module';
import { ColorDotModule } from '../../../../shared/color-dot/color-dot.module';
import { HelpersModule } from '../../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [DemandPickerComponent],
  exports: [DemandPickerComponent],
  imports: [CommonModule, CardModule, ColorDotModule, HelpersModule],
})
export class DemandPickerModule {}
