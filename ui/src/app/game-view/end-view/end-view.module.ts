import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndViewComponent } from './end-view.component';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ResultPicturesModule } from './result-pictures/result-pictures.module';
import { ConfettiButtonModule } from './confetti-button/confetti-button.module';

@NgModule({
  declarations: [EndViewComponent],
  imports: [CommonModule, EvaluationModule, ResultPicturesModule, ConfettiButtonModule],
  exports: [EndViewComponent],
})
export class EndViewModule {}
