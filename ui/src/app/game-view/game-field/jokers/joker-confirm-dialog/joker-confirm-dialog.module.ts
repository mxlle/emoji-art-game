import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokerConfirmDialogComponent } from './joker-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from '../../../../ui-components/card/card.module';
import { PictureModule } from '../../../../shared/picture/picture.module';

@NgModule({
  declarations: [JokerConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, CardModule, PictureModule],
})
export class JokerConfirmDialogModule {}
