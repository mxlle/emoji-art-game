import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseInfoComponent } from './phase-info.component';
import { CounterModule } from '../counter/counter.module';

@NgModule({
  declarations: [PhaseInfoComponent],
  exports: [PhaseInfoComponent],
  imports: [CommonModule, CounterModule],
})
export class PhaseInfoModule {}
