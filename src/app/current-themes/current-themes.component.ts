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
  @Input() themes: string[] = [];
  @Input() currentTheme?: number;
  @Output() currentThemeChange: EventEmitter<number> =
    new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
