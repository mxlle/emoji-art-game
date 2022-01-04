import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiListPreviewComponent } from './emoji-list-preview.component';

@NgModule({
  declarations: [EmojiListPreviewComponent],
  exports: [EmojiListPreviewComponent],
  imports: [CommonModule],
})
export class EmojiListPreviewModule {}
