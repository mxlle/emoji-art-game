import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBottomLeftDirective, CardComponent, CardTopRightDirective } from './card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CardComponent, CardTopRightDirective, CardBottomLeftDirective],
  imports: [CommonModule, MatCardModule],
  exports: [CardComponent, CardTopRightDirective, CardBottomLeftDirective],
})
export class CardModule {}
