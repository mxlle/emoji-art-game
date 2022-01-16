import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomViewComponent } from './zoom-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ZoomButtonDirective } from './zoom-button.directive';

@NgModule({
  declarations: [ZoomViewComponent, ZoomButtonDirective],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ZoomButtonDirective],
})
export class ZoomViewModule {}
