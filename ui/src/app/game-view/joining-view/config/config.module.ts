import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { CardModule } from '../../../ui-components/card/card.module';
import { EmojiListPreviewModule } from '../../../shared/emoji-list-preview/emoji-list-preview.module';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ConfigComponent],
  exports: [ConfigComponent],
  imports: [CommonModule, CardModule, EmojiListPreviewModule, MatSliderModule, FormsModule, MatIconModule],
})
export class ConfigModule {}
