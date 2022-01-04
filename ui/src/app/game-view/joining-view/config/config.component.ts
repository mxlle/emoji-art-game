import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { emojiCategories, EmojiCategory, EmojiCategoryId } from '../../../../game-logic/deck';
import { GameConfig } from '../../../../game-logic/game';
import { getDefaultConfig, maxPerCategory, minDeck, minPerCategory } from '../../../../game-logic/gameConsts';
import { MatSlider, MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  @Output() configChange: EventEmitter<GameConfig> = new EventEmitter<GameConfig>();
  @ViewChild(MatSlider) limitSlider?: MatSlider;

  config: GameConfig = getDefaultConfig();
  show: boolean = false;

  readonly emojiCategories = emojiCategories;
  readonly minDeck = minDeck;
  readonly minPerCategory = minPerCategory;
  readonly maxPerCategory = maxPerCategory;

  get deckTooSmall(): boolean {
    return this.config.calculatedCount < minDeck;
  }

  constructor() {
    this._onConfigChange();
  }

  resetConfig() {
    this.config = getDefaultConfig();
  }

  onLimitChange(event: MatSliderChange) {
    if (event.value) {
      this.config.deckLimitPerCategory = event.value;
      this._onConfigChange();
    }
  }

  toggleCategorySelection(category: EmojiCategory) {
    if (this.config.deckCategories.includes(category.id)) {
      this.config.deckCategories = this.config.deckCategories.filter((id: EmojiCategoryId) => id !== category.id);
    } else {
      this.config.deckCategories = this.config.deckCategories.concat(category.id);
    }
    this._onConfigChange();
  }

  private _onConfigChange() {
    this.config.calculatedCount = this._calculateDeckSize();
    if (this.config.calculatedCount < minDeck && this.config.deckLimitPerCategory < maxPerCategory) {
      this.config.deckLimitPerCategory++;
      if (this.limitSlider) this.limitSlider.value = this.config.deckLimitPerCategory;
      this._onConfigChange();
    } else {
      this.configChange.emit(this.config);
    }
  }

  private _calculateDeckSize() {
    return this.emojiCategories
      .filter((cat) => this.config.deckCategories.includes(cat.id))
      .reduce((size: number, category: EmojiCategory) => {
        return size + category.emojis.slice(0, this.config.deckLimitPerCategory).length;
      }, 0);
  }
}
