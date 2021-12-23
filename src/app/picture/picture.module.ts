import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from '../card/card.module';

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule, MatCardModule, CardModule],
  exports: [PictureComponent],
})
export class PictureModule {}
