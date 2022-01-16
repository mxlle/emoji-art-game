import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleNotifierComponent } from './role-notifier.component';

@NgModule({
  declarations: [RoleNotifierComponent],
  exports: [RoleNotifierComponent],
  imports: [CommonModule],
})
export class RoleNotifierModule {}
