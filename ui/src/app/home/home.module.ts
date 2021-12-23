import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GameListModule } from './game-list/game-list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatButtonModule, RouterModule, GameListModule],
})
export class HomeModule {}
