import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndViewComponent } from './end-view.component';
import { PictureModule } from '../../shared/picture/picture.module';

@NgModule({
  declarations: [EndViewComponent],
  imports: [CommonModule, PictureModule],
  exports: [EndViewComponent],
})
export class EndViewModule {}
