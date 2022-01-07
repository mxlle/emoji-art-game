import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './ng-let.directive';
import { ScaleDirective } from './scale.directive';
import { TranslateToCenterDirective } from './translateToCenter.directive';

@NgModule({
  declarations: [NgLetDirective, ScaleDirective, TranslateToCenterDirective],
  exports: [NgLetDirective, ScaleDirective, TranslateToCenterDirective],
  imports: [CommonModule],
})
export class HelpersModule {}
