import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game, GamePhase, Player} from '../../game-logic/game';
import {choosePictures, createGame, endRound, offerPictures, setDemand, startGame} from '../../game-logic/gameLogic';
import {allColors} from '../../game-tools/color-util';
import {updateMockGame} from "./mock-service";

export const getInitialPlayers = (): Player[] => [
  {
    id: 'almi',
    name: 'Almi',
    color: allColors[0],
    pictures: [],
  },
  {
    id: 'owi',
    name: 'Owi',
    color: allColors[4],
    pictures: [],
  },
  {
    id: 'wibi',
    name: 'Wibi',
    color: allColors[8],
    pictures: [],
  },
  {
    id: 'uli',
    name: 'Uli',
    color: allColors[12],
    pictures: [],
  },
];

@Component({
  selector: 'app-mock-mode',
  templateUrl: './mock-mode.component.html',
  styleUrls: ['./mock-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockModeComponent implements OnInit {
  @Input() set game(game: Game) {
    this._game = game;
    localStorage.setItem('game', JSON.stringify(game));
  }
  get game(): Game {
    return this._game;
  }
  @Input() demand?: number;
  @Input() currentPlayer?: Player;
  @Output() demandChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentPlayerChange: EventEmitter<Player> = new EventEmitter<Player>();

  private _game: Game;

  constructor() {
    const savedGame = localStorage.getItem('game');
    this._game = savedGame ? JSON.parse(savedGame) : createGame(getInitialPlayers());
    updateMockGame(this._game);
  }

  ngOnInit(): void {}

  newGame() {
    this.game = createGame(getInitialPlayers());
  }

  proceed() {
    switch (this.game?.phase) {
      case GamePhase.Init:
        startGame(this.game);
        break;
      case GamePhase.Demand:
        if (this.demand) {
          setDemand(this.game, this.demand);
          this.demandChange.emit(undefined);
        }
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
    if (this.game) {
      updateMockGame(this.game);
    }
  }
}
