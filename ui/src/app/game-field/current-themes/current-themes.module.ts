import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentThemesComponent } from './current-themes.component';
import { CardModule } from '../../card/card.module';

@NgModule({
  declarations: [CurrentThemesComponent],
  exports: [CurrentThemesComponent],
  imports: [CommonModule, CardModule],
})
export class CurrentThemesModule {}
