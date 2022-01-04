import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfettiButtonComponent } from './confetti-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ConfettiButtonComponent],
  exports: [ConfettiButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class ConfettiButtonModule {}
