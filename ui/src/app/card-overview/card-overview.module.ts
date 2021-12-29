import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardOverviewComponent } from './card-overview.component';
import { CardModule } from '../ui-components/card/card.module';

@NgModule({
  declarations: [CardOverviewComponent],
  imports: [CommonModule, CardModule],
})
export class CardOverviewModule {}
