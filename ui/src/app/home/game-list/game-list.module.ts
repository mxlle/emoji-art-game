import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GameListComponent],
  exports: [GameListComponent],
  imports: [CommonModule, MatListModule, RouterModule, MatButtonModule, MatIconModule],
})
export class GameListModule {}
