import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBottomLeftDirective, CardComponent, CardTopRightDirective } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ZoomViewModule } from '../zoom-view/zoom-view.module';

@NgModule({
  declarations: [CardComponent, CardTopRightDirective, CardBottomLeftDirective],
  imports: [CommonModule, MatCardModule, MatIconModule, ZoomViewModule],
  exports: [CardComponent, CardTopRightDirective, CardBottomLeftDirective],
})
export class CardModule {}
