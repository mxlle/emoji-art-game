import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseInfoComponent } from './phase-info.component';

@NgModule({
  declarations: [PhaseInfoComponent],
  exports: [PhaseInfoComponent],
  imports: [CommonModule],
})
export class PhaseInfoModule {}
