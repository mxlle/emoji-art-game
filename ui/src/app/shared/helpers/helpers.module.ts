import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './ng-let.directive';
import { ScaleDirective } from './scale.directive';

@NgModule({
  declarations: [NgLetDirective, ScaleDirective],
  exports: [NgLetDirective, ScaleDirective],
  imports: [CommonModule],
})
export class HelpersModule {}
