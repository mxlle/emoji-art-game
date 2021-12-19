import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Picture } from "../game";
import { masterFaker } from "../../assets/gameConsts";

@Component({
  selector: "app-picture",
  templateUrl: "./picture.component.html",
  styleUrls: ["./picture.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent implements OnInit {
  @Input() picture?: Picture;
  @Input() themes: string[] = [];
  @Input() selected: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get masterFaker(): typeof masterFaker {
    return masterFaker;
  }
}
