import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from './status-bar.component';

@NgModule({
  declarations: [StatusBarComponent],
  exports: [StatusBarComponent],
  imports: [CommonModule],
})
export class StatusBarModule {}
