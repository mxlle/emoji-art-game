import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { maxDemand, minDemand } from "../../assets/gameConsts";

@Component({
  selector: "app-demand-picker",
  templateUrl: "./demand-picker.component.html",
  styleUrls: ["./demand-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandPickerComponent implements OnInit {
  @Input() demand: number | undefined;
  @Output() demandChange: EventEmitter<number> = new EventEmitter<number>();

  demandOptions: number[] = [...Array(maxDemand - minDemand + 1).keys()].map(
    (val) => val + minDemand
  );

  constructor() {}

  ngOnInit(): void {}
}
