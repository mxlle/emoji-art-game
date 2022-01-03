import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationComponent } from './evaluation.component';
import { ProgressBarModule } from '../../../ui-components/progress-bar/progress-bar.module';
import { CardModule } from '../../../ui-components/card/card.module';
import { HelpersModule } from '../../../shared/helpers/helpers.module';

@NgModule({
  declarations: [EvaluationComponent],
  imports: [CommonModule, ProgressBarModule, CardModule, HelpersModule],
  exports: [EvaluationComponent],
})
export class EvaluationModule {}
