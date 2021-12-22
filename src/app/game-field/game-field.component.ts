import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { Game, GamePhase, GameRound, Player } from "../game";
import { createGame } from "../gameLogic";
import { getInitialPlayers } from "../mock-mode/mock-mode.component";

@Component({
  selector: "app-game-field",
  templateUrl: "./game-field.component.html",
  styleUrls: ["./game-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent implements OnInit {
  game: Game;
  currentPlayer?: Player;

  currentTheme: string = "";

  demand: number | undefined;

  get currentRound(): GameRound | undefined {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  constructor() {
    const savedGame = localStorage.getItem("game");
    this.game = savedGame
      ? JSON.parse(savedGame)
      : createGame(getInitialPlayers());
  }

  ngOnInit(): void {}

  get GamePhase(): typeof GamePhase {
    return GamePhase;
  }
}
