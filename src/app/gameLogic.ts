import { Game, GamePhase, GameRound, Picture, Player } from "./game";
import { shuffleArray, generateId } from "../game-tools/random-util";
import {
  emojis,
  fakesPerRound,
  gameEndCondition,
  getNumOfCardsPerPlayer,
  themesPerRound,
} from "../assets/gameConsts";
import { dealCards, drawCards } from "./gameFunctions";

export function createGame(players: Player[]): Game {
  return {
    id: generateId(),
    name: "My game",
    players,
    hostId: players[0].id,
    deck: shuffleArray(emojis),
    currentRound: -1,
    phase: GamePhase.Init,
    rounds: [],
    teamPoints: [],
    neutralCards: [],
    fakePoints: [],
  };
}

export function startRound(game: Game) {
  if (game.currentRound === -1) {
    const dealtCards = dealCards(
      game.deck,
      game.players.length,
      getNumOfCardsPerPlayer(game.players.length)
    );
    game.players.forEach((player, index) => {
      player.pictures = dealtCards[index].map((card) => ({ card }));
    });
  }

  game.currentRound++;
  const round: GameRound = {
    painterIds: getPainterIdsForRound(game.players, game.currentRound),
    buyerIds: getBuyerIdsForRound(game.players, game.currentRound),
    themes: drawCards(game.deck, themesPerRound),
    pictures: [],
  };

  game.rounds.push(round);

  game.phase = GamePhase.Demand;
}

export function setDemand(game: Game, demand: number) {
  const round = getCurrentRound(game);
  round.demand = demand;
  game.phase = GamePhase.Offer;
}

export function offerPictures(game: Game) {
  const round = getCurrentRound(game);

  const originals = game.players.reduce(
    (currentArr: Picture[], player: Player) =>
      currentArr.concat(player.pictures.filter(isPictureSelectedFromPainter)),
    []
  );
  const fakes = getFakes(game.deck);
  round.pictures = shuffleArray([...originals, ...fakes]);

  game.phase = GamePhase.Choose;
}

export function choosePictures(game: Game) {
  const round = getCurrentRound(game);
  const selectedPictures = round.pictures.filter(isPictureSelectedFromBuyer);
  game.teamPoints.push(
    ...selectedPictures.filter((pic) => pic.buyerTheme === pic.painterTheme)
  );
  game.neutralCards.push(
    ...selectedPictures.filter(
      (pic) => pic.buyerTheme !== pic.painterTheme && !pic.isFake
    ),
    ...round.pictures.filter(
      (pic) => !pic.isFake && !isPictureSelectedFromBuyer(pic)
    )
  );
  game.fakePoints.push(...selectedPictures.filter((pic) => pic.isFake));
  game.phase = GamePhase.Evaluate;
}

export function endRound(game: Game) {
  if (game.fakePoints.length >= gameEndCondition) {
    game.phase = GamePhase.End;
  } else {
    fillUpCards(game);
    startRound(game);
  }
}

function getCurrentRound(game: Game): GameRound {
  return game.rounds[game.currentRound];
}

function getPainterIdsForRound(players: Player[], round: number) {
  return players
    .map((player: Player) => player.id)
    .filter((_, index: number) => (index + round) % 3 === 0);
}

function getBuyerIdsForRound(players: Player[], round: number) {
  return players
    .map((player: Player) => player.id)
    .filter((_, index: number) => (index + round) % 3 > 0);
}

function getFakes(deck: string[]): Picture[] {
  return drawCards(deck, fakesPerRound).map((card) => ({
    card,
    isFake: true,
  }));
}

function fillUpCards(game: Game) {
  game.players.forEach((player) => {
    const numOfCards = player.pictures.length;
    // remove selected cards
    player.pictures = player.pictures.filter(
      (pic) => !isPictureSelectedFromPainter(pic)
    );
    const numOfPlayedCards = numOfCards - player.pictures.length;
    if (numOfPlayedCards) {
      player.pictures.push(
        ...drawCards(game.deck, numOfPlayedCards).map((card) => ({ card }))
      );
    }
  });
}

function isPictureSelectedFromPainter(pic: Picture): boolean {
  return pic.painterTheme !== undefined;
}

function isPictureSelectedFromBuyer(pic: Picture): boolean {
  return pic.buyerTheme !== undefined;
}
