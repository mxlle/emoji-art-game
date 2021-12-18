import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { allColors, randomInt } from "game-tools-js";
import { Game, GamePhase, GameRound, Player } from "../game";
import {
  choosePictures,
  createGame,
  endRound,
  offerPictures,
  setDemand,
  startRound,
} from "../gameLogic";

const getInitialPlayers = (): Player[] => [
  {
    id: "almi",
    name: "Almi",
    color: allColors[0],
    pictures: [],
    selectedPictures: [],
  },
  {
    id: "owi",
    name: "Owi",
    color: allColors[4],
    pictures: [],
    selectedPictures: [],
  },
  {
    id: "wibi",
    name: "Wibi",
    color: allColors[8],
    pictures: [],
    selectedPictures: [],
  },
  {
    id: "uli",
    name: "Uli",
    color: allColors[12],
    pictures: [],
    selectedPictures: [],
  },
];

@Component({
  selector: "app-game-field",
  templateUrl: "./game-field.component.html",
  styleUrls: ["./game-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent implements OnInit {
  game: Game;
  currentSelection: string[] = [];

  get currentRound(): GameRound {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  constructor() {
    this.game = createGame(getInitialPlayers());
  }

  ngOnInit(): void {}

  offerPicture(player: Player, picture: string) {
    if (player.selectedPictures.includes(picture)) {
      player.selectedPictures = player.selectedPictures.filter(
        (pic) => pic !== picture
      );
    } else {
      player.selectedPictures.push(picture);
    }
  }

  choosePicture(picture: string) {
    if (this.currentSelection.includes(picture)) {
      this.currentSelection = this.currentSelection.filter(
        (pic) => pic !== picture
      );
    } else {
      this.currentSelection.push(picture);
    }
  }

  newGame() {
    this.game = createGame(getInitialPlayers());
  }

  proceed() {
    switch (this.game?.phase) {
      case GamePhase.Init:
        startRound(this.game);
        break;
      case GamePhase.Demand:
        setDemand(this.game, randomInt(5) + 2);
        break;
      case GamePhase.Offer:
        offerPictures(this.game);
        break;
      case GamePhase.Choose:
        choosePictures(this.game, this.currentSelection);
        this.currentSelection = [];
        break;
      case GamePhase.Evaluate:
        endRound(this.game);
        break;
      case GamePhase.End:
        this.newGame();
        break;
    }
  }
}
