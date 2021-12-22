import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Game, Picture } from "../game";
import { getPictureCssClass } from "../ui-helpers";

@Component({
  selector: "app-current-offer",
  templateUrl: "./current-offer.component.html",
  styleUrls: ["./current-offer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentOfferComponent implements OnInit {
  @Input() game!: Game;
  @Input() pictures: Picture[] = [];
  @Input() currentTheme!: number;

  get themes(): string[] {
    return this.game.rounds[this.game.currentRound].themes;
  }

  constructor() {}

  ngOnInit(): void {}

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }

  toggleBuyerSelection(picture: Picture) {
    if (picture.buyerTheme === this.currentTheme) {
      picture.buyerTheme = undefined;
    } else {
      picture.buyerTheme = this.currentTheme;
    }
  }
}
