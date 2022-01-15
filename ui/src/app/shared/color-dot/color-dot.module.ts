import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDotComponent } from './color-dot.component';

@NgModule({
  declarations: [ColorDotComponent],
  exports: [ColorDotComponent],
  imports: [CommonModule],
})
export class ColorDotModule {}
