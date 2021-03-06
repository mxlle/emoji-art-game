import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessBarComponent } from './quick-access-bar.component';
import { CardModule } from '../../../ui-components/card/card.module';
import { CounterModule } from '../../../shared/counter/counter.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [QuickAccessBarComponent],
  imports: [CommonModule, CardModule, CounterModule, MatButtonModule, MatIconModule],
  exports: [QuickAccessBarComponent],
})
export class QuickAccessBarModule {}
