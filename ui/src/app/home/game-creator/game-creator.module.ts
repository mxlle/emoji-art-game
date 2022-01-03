import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCreatorComponent } from './game-creator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GameCreatorComponent],
  exports: [GameCreatorComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class GameCreatorModule {}
