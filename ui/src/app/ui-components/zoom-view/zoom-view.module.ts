import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomViewComponent } from './zoom-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ZoomViewComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class ZoomViewModule {}
