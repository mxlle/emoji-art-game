import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Game, GameRound, Picture, Player } from "../game";
import { getPictureCssClass } from "../ui-helpers";
import { buyer, painter } from "../../assets/gameConsts";

@Component({
  selector: "app-current-player-hand",
  templateUrl: "./current-player-hand.component.html",
  styleUrls: ["./current-player-hand.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPlayerHandComponent implements OnInit {
  @Input() game!: Game;
  @Input() player!: Player;
  @Input() currentTheme!: number;

  get themes(): string[] {
    return this.game.rounds[this.game.currentRound].themes;
  }

  get currentRound(): GameRound {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  constructor() {}

  ngOnInit(): void {}

  togglePainterSelection(picture: Picture) {
    if (picture.painterTheme === this.currentTheme) {
      picture.painterTheme = undefined;
    } else {
      picture.painterTheme = this.currentTheme;
    }
  }

  getPlayerRole(): string {
    return this.currentRound?.buyerIds?.includes(this.player.id)
      ? buyer + " Buyer"
      : this.currentRound?.painterIds?.includes(this.player.id)
      ? painter + " Painter"
      : "??";
  }

  getPictureCssClass(picture: Picture): string {
    return getPictureCssClass(this.game, picture);
  }
}
