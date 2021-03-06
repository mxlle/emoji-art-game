import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokerCardComponent } from './joker-card.component';
import { FlipCardModule } from '../../../../ui-components/flip-card/flip-card.module';
import { CardModule } from '../../../../ui-components/card/card.module';
import { HelpersModule } from '../../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [JokerCardComponent],
  exports: [JokerCardComponent],
  imports: [CommonModule, FlipCardModule, CardModule, HelpersModule],
})
export class JokerCardModule {}
