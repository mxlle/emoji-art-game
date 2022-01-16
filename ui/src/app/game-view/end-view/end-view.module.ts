import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndViewComponent } from './end-view.component';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ResultPicturesModule } from './result-pictures/result-pictures.module';
import { ConfettiButtonModule } from './confetti-button/confetti-button.module';
import { DurationInfoModule } from '../../ui-components/duration-info/duration-info.module';

@NgModule({
  declarations: [EndViewComponent],
  imports: [CommonModule, EvaluationModule, ResultPicturesModule, ConfettiButtonModule, DurationInfoModule],
  exports: [EndViewComponent],
})
export class EndViewModule {}
