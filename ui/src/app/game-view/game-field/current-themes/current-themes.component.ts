import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { unknownCardEmoji } from '../../../../game-logic/gameConsts';

@Component({
  selector: 'app-current-themes',
  templateUrl: './current-themes.component.html',
  styleUrls: ['./current-themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentThemesComponent {
  @Input() set themes(themes: string[]) {
    if (this._themes.join() !== themes.join()) {
      this.themesChange.emit();
      this._showAppearAnimation();
    }
    this._themes = themes;
    if (!this.currentTheme || !themes.includes(this.currentTheme)) {
      this.currentThemeChange.emit(themes[0]);
    }
  }
  get themes(): string[] {
    return this._themes;
  }

  @Input() active?: boolean;

  @Input() currentTheme?: string;
  @Output() currentThemeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() themesChange: EventEmitter<void> = new EventEmitter<void>();

  showBack: boolean = true;
  enterAnimation: boolean = true;

  readonly unknownCardEmoji = unknownCardEmoji;

  private _themes: string[] = [];

  constructor(private _cdr: ChangeDetectorRef) {}

  private _showAppearAnimation() {
    this.showBack = true;
    this.enterAnimation = true;

    requestAnimationFrame(() => {
      this.enterAnimation = false;
      this.showBack = false;
      this._cdr.markForCheck();
    });
  }
}
