import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickRulesComponent } from './quick-rules.component';

@NgModule({
  declarations: [QuickRulesComponent],
  exports: [QuickRulesComponent],
  imports: [CommonModule],
})
export class QuickRulesModule {}
