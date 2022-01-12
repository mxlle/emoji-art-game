import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GameListModule } from './game-list/game-list.module';
import { GameCreatorModule } from './game-creator/game-creator.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatButtonModule, RouterModule, GameListModule, GameCreatorModule, MatProgressSpinnerModule],
})
export class HomeModule {}
