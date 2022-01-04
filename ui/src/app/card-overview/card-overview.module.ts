import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardOverviewComponent } from './card-overview.component';
import { CardModule } from '../ui-components/card/card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmojiListPreviewModule } from '../shared/emoji-list-preview/emoji-list-preview.module';

@NgModule({
  declarations: [CardOverviewComponent],
  imports: [CommonModule, CardModule, MatIconModule, MatButtonModule, EmojiListPreviewModule],
})
export class CardOverviewModule {}
