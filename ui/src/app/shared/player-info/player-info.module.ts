import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerInfoComponent } from './player-info.component';
import { MatCardModule } from '@angular/material/card';
import { CardModule } from '../../ui-components/card/card.module';

@NgModule({
  declarations: [PlayerInfoComponent],
  exports: [PlayerInfoComponent],
  imports: [CommonModule, MatCardModule, CardModule],
})
export class PlayerInfoModule {}
