import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokersComponent } from './jokers.component';
import { CardModule } from '../../../ui-components/card/card.module';
import { JokerConfirmDialogModule } from './joker-confirm-dialog/joker-confirm-dialog.module';

@NgModule({
  declarations: [JokersComponent],
  exports: [JokersComponent],
  imports: [CommonModule, CardModule, JokerConfirmDialogModule],
})
export class JokersModule {}
