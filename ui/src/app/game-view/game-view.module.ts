import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameViewComponent } from './game-view.component';
import { LobbyModule } from './lobby/lobby.module';
import { GameFieldModule } from './game-field/game-field.module';
import { StatusBarModule } from './status-bar/status-bar.module';

@NgModule({
  declarations: [GameViewComponent],
  imports: [CommonModule, LobbyModule, GameFieldModule, StatusBarModule],
})
export class GameViewModule {}
