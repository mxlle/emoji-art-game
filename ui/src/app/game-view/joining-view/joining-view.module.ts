import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoiningViewComponent } from './joining-view.component';
import { PlayerInfoModule } from '../../shared/player-info/player-info.module';
import { MatButtonModule } from '@angular/material/button';
import { PlayerEditorModule } from './player-editor/player-editor.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [JoiningViewComponent],
  exports: [JoiningViewComponent],
  imports: [CommonModule, PlayerInfoModule, MatButtonModule, PlayerEditorModule, MatIconModule],
})
export class JoiningViewModule {}
