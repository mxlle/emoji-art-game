import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardBackDirective, FlipCardComponent, FlipCardFrontDirective } from './flip-card.component';

@NgModule({
  declarations: [FlipCardComponent, FlipCardFrontDirective, FlipCardBackDirective],
  exports: [FlipCardComponent, FlipCardFrontDirective, FlipCardBackDirective],
  imports: [CommonModule],
})
export class FlipCardModule {}
