import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerMarkerComponent } from './player-marker.component';

@NgModule({
  declarations: [PlayerMarkerComponent],
  exports: [PlayerMarkerComponent],
  imports: [CommonModule],
})
export class PlayerMarkerModule {}
