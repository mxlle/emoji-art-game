import { Game, GamePhase, GameRound, Player } from "./game";
import { generateId } from "./util";
import { shuffleArray } from "game-tools-js";
import {
  emojis,
  fakesPerRound,
  gameEndCondition,
  getNumOfCardsPerPlayer,
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
    chosenFakes: [],
    chosenOriginals: [],
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
      player.pictures = dealtCards[index];
    });
  }

  game.currentRound++;
  const round: GameRound = {
    painterIds: getPainterIdsForRound(game.players, game.currentRound),
    buyerIds: getBuyerIdsForRound(game.players, game.currentRound),
    themes: drawCards(game.deck, 2),
    originals: [],
    offeredPictures: [],
    chosenPictures: [],
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
  const originals: string[] = [];
  game.players.forEach((player) => originals.push(...player.selectedPictures));
  round.originals = originals;
  const fakes = drawCards(game.deck, fakesPerRound);
  round.offeredPictures = shuffleArray([...originals, ...fakes]);
  game.phase = GamePhase.Choose;
}

export function choosePictures(game: Game, pictures: string[]) {
  const round = getCurrentRound(game);
  round.chosenPictures = pictures;
  game.chosenOriginals.push(
    ...pictures.filter((pic) => round.originals.includes(pic))
  );
  game.chosenFakes.push(
    ...pictures.filter((pic) => !round.originals.includes(pic))
  );
  game.phase = GamePhase.Evaluate;
}

export function endRound(game: Game) {
  if (game.chosenFakes.length >= gameEndCondition) {
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

function fillUpCards(game: Game) {
  game.players.forEach((player) => {
    const numOfPlayedCards = player.selectedPictures.length;
    if (numOfPlayedCards) {
      player.pictures = player.pictures.filter(
        (card) => !player.selectedPictures.includes(card)
      );
      player.selectedPictures = [];
      player.pictures.push(...drawCards(game.deck, numOfPlayedCards));
    }
  });
}
