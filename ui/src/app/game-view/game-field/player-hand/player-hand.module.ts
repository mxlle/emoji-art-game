import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerHandComponent } from './player-hand.component';
import { PictureModule } from '../../../shared/picture/picture.module';

@NgModule({
  declarations: [PlayerHandComponent],
  exports: [PlayerHandComponent],
  imports: [CommonModule, PictureModule],
})
export class PlayerHandModule {}
