import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultPicturesComponent } from './result-pictures.component';
import { PictureModule } from '../../../shared/picture/picture.module';

@NgModule({
  declarations: [ResultPicturesComponent],
  exports: [ResultPicturesComponent],
  imports: [CommonModule, PictureModule],
})
export class ResultPicturesModule {}
