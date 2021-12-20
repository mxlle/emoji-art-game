import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { Game, GamePhase, GameRound, Picture, Player } from "../game";
import {
  choosePictures,
  createGame,
  endRound,
  offerPictures,
  setDemand,
  startRound,
} from "../gameLogic";
import { buyer, maxDemand, minDemand, painter } from "../../assets/gameConsts";
import { allColors } from "../../game-tools/color-util";
import { randomInt } from "../../game-tools/random-util";

const getInitialPlayers = (): Player[] => [
  {
    id: "almi",
    name: "Almi",
    color: allColors[0],
    pictures: [],
  },
  {
    id: "owi",
    name: "Owi",
    color: allColors[4],
    pictures: [],
  },
  {
    id: "wibi",
    name: "Wibi",
    color: allColors[8],
    pictures: [],
  },
  {
    id: "uli",
    name: "Uli",
    color: allColors[12],
    pictures: [],
  },
];

@Component({
  selector: "app-game-field",
  templateUrl: "./game-field.component.html",
  styleUrls: ["./game-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent implements OnInit {
  set game(game: Game) {
    this._game = game;
    localStorage.setItem("game", JSON.stringify(game));
  }
  get game(): Game {
    return this._game;
  }

  currentTheme: number = 0;

  get currentRound(): GameRound {
    return this.game && this.game.rounds[this.game.currentRound];
  }

  private _game: Game;

  constructor() {
    const savedGame = localStorage.getItem("game");
    this._game = savedGame
      ? JSON.parse(savedGame)
      : createGame(getInitialPlayers());
  }

  ngOnInit(): void {}

  togglePainterSelection(picture: Picture) {
    if (picture.painterTheme === this.currentTheme) {
      picture.painterTheme = undefined;
    } else {
      picture.painterTheme = this.currentTheme;
    }
  }

  toggleBuyerSelection(picture: Picture) {
    if (picture.buyerTheme === this.currentTheme) {
      picture.buyerTheme = undefined;
    } else {
      picture.buyerTheme = this.currentTheme;
    }
  }

  getPictureCssClass(picture: Picture): string {
    if (
      this.game.teamPoints.findIndex((pic) => pic.card === picture.card) > -1
    ) {
      return "correct";
    } else if (
      this.game.neutralCards.findIndex((pic) => pic.card === picture.card) > -1
    ) {
      return "neutral";
    } else if (
      this.game.fakePoints.findIndex((pic) => pic.card === picture.card) > -1
    ) {
      return "fake";
    } else {
      return "";
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
        setDemand(this.game, randomInt(maxDemand, minDemand));
        break;
      case GamePhase.Offer:
        offerPictures(this.game);
        break;
      case GamePhase.Choose:
        choosePictures(this.game);
        break;
      case GamePhase.Evaluate:
        endRound(this.game);
        break;
      case GamePhase.End:
        this.newGame();
        break;
    }
    // trigger save
    this.game = { ...this.game };
  }

  get painter(): typeof painter {
    return painter;
  }

  get buyer(): typeof buyer {
    return buyer;
  }
}
