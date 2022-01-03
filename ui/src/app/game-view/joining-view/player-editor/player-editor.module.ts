import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerEditorComponent } from './player-editor.component';
import { ColorPickerModule } from '../../../ui-components/color-picker/color-picker.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlayerEditorComponent],
  exports: [PlayerEditorComponent],
  imports: [CommonModule, ColorPickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
})
export class PlayerEditorModule {}
