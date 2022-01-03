import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameViewComponent } from './game-view.component';
import { JoiningViewModule } from './joining-view/joining-view.module';
import { GameFieldModule } from './game-field/game-field.module';
import { StatusBarModule } from './status-bar/status-bar.module';
import { EndViewModule } from './end-view/end-view.module';
import { HelpersModule } from '../shared/helpers/helpers.module';

@NgModule({
  declarations: [GameViewComponent],
  imports: [CommonModule, JoiningViewModule, GameFieldModule, StatusBarModule, EndViewModule, HelpersModule],
})
export class GameViewModule {}
