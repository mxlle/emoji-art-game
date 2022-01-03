import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndViewComponent } from './end-view.component';
import { PictureModule } from '../../shared/picture/picture.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@NgModule({
  declarations: [EndViewComponent],
  imports: [CommonModule, PictureModule, EvaluationModule],
  exports: [EndViewComponent],
})
export class EndViewModule {}
