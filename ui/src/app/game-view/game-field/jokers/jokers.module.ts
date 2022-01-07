import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokersComponent } from './jokers.component';
import { JokerConfirmDialogModule } from './joker-confirm-dialog/joker-confirm-dialog.module';
import { JokerCardModule } from './joker-card/joker-card.module';

@NgModule({
  declarations: [JokersComponent],
  exports: [JokersComponent],
  imports: [CommonModule, JokerConfirmDialogModule, JokerCardModule],
})
export class JokersModule {}
