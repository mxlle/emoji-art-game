import { ChangeDetectionStrategy, Component } from '@angular/core';
import { gameEmojis } from '../../game-logic/gameConsts';
import { splitEmojis } from '../../game-tools/emoji-util';
import { emojiCategories, EmojiCategory } from '../../game-logic/deck';

interface UiEmojiCategory extends EmojiCategory {
  open: boolean;
}

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOverviewComponent {
  readonly gameEmojis = splitEmojis(gameEmojis);
  emojiCategories: UiEmojiCategory[] = emojiCategories.map((category) => ({ ...category, open: true }));
  mainOpen: boolean = true;

  expandAll() {
    this.mainOpen = true;
    this.emojiCategories.forEach((category) => (category.open = true));
  }

  collapseAll() {
    this.mainOpen = false;
    this.emojiCategories.forEach((category) => (category.open = false));
  }
}
