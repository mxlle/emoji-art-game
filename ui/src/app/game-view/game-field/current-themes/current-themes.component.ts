import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { unknownCardEmoji } from '../../../../game-logic';
import { scrollTop } from '../../../util/scroll-into-view';
import { BehaviorSubject, filter, take } from 'rxjs';

@Component({
  selector: 'app-current-themes',
  templateUrl: './current-themes.component.html',
  styleUrls: ['./current-themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentThemesComponent {
  @Input() set themes(themes: string[]) {
    if (this._themes.join() !== themes.join()) {
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
  private _themes: string[] = [];

  @Input() active?: boolean;
  @Input() scrollContainer?: HTMLElement;

  @Input() currentTheme?: string;
  @Output() currentThemeChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() set roleNotifierVisible(isVisible: boolean) {
    this._roleNotifierVisible$.next(isVisible);
  }
  private _roleNotifierVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showBack: boolean = false;
  enterAnimation: boolean = false;

  readonly unknownCardEmoji = unknownCardEmoji;

  constructor(private _cdr: ChangeDetectorRef) {}

  private _showAppearAnimation() {
    this.showBack = true;
    this.enterAnimation = true;

    requestAnimationFrame(() => {
      scrollTop(this.scrollContainer).then(() => {
        this.enterAnimation = false;
        this._cdr.markForCheck();

        this._roleNotifierVisible$
          .pipe(
            filter((isVisible: boolean) => !isVisible),
            take(1)
          )
          .subscribe(() => {
            this.showBack = false;
            this._cdr.markForCheck();
          });
      });
    });
  }
}
