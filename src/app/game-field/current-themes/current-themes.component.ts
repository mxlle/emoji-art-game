import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-current-themes",
  templateUrl: "./current-themes.component.html",
  styleUrls: ["./current-themes.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentThemesComponent implements OnInit {
  @Input() set themes(themes: string[]) {
    this._themes = themes;
    if (!this.currentTheme || !themes.includes(this.currentTheme)) {
      this.currentThemeChange.emit(themes[0]);
    }
  }
  get themes(): string[] {
    return this._themes;
  }

  @Input() currentTheme?: string;
  @Output() currentThemeChange: EventEmitter<string> =
    new EventEmitter<string>();

  private _themes: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
