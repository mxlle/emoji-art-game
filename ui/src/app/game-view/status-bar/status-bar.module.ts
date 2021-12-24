import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from './status-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [StatusBarComponent],
  exports: [StatusBarComponent],
  imports: [CommonModule, MatToolbarModule],
})
export class StatusBarModule {}
