import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndViewComponent } from './end-view.component';
import { PictureModule } from '../../shared/picture/picture.module';
import { EvalutationModule } from './evalutation/evalutation.module';

@NgModule({
  declarations: [EndViewComponent],
  imports: [CommonModule, PictureModule, EvalutationModule],
  exports: [EndViewComponent],
})
export class EndViewModule {}
