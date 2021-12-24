import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { PlayerInfoModule } from '../game-field/player-info/player-info.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LobbyComponent],
  exports: [LobbyComponent],
  imports: [CommonModule, PlayerInfoModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatButtonModule],
})
export class LobbyModule {}