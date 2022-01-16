import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationInfoComponent } from './duration-info.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DurationInfoComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DurationInfoComponent],
})
export class DurationInfoModule {}
