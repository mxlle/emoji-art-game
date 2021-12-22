import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from "@angular/core";
import { Game, GameRound, Player } from "../../game";
import { buyer, painter } from "../../../assets/gameConsts";

@Component({
  selector: "app-player-info",
  templateUrl: "./player-info.component.html",
  styleUrls: ["./player-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent implements OnInit {
  @Input() game!: Game;
  @Input() player!: Player;

  @HostBinding("style.--border-color") get color(): string {
    return this.player.color ?? "transparent";
  }

  get currentRound(): GameRound {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  get selectedPictures(): number {
    return this.player.pictures.filter((pic) => !!pic.painterTheme).length;
  }

  constructor() {}

  ngOnInit(): void {}

  getPlayerRole(): string {
    return this.currentRound?.buyerIds?.includes(this.player.id)
      ? buyer + " Buyer"
      : this.currentRound?.painterIds?.includes(this.player.id)
      ? painter + " Painter"
      : "??";
  }
}
