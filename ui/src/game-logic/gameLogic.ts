import {DELETE_CLEARANCE_TIME, Game, GamePhase, GameRound, Picture, Player} from './game';
import {shuffleArray} from '../game-tools/random-util';
import {
  emojis,
  fakesPerRound,
  gameEndCondition,
  getNumOfCardsPerPlayer,
  getRoleOrder,
  themesPerRound
} from './gameConsts';
import {dealCards, drawCards} from '../game-tools/card-game-util';
import {generateEmojiId} from '../game-tools/emoji-util';

export function createGame(players: Player[]): Game {
  return {
    id: generateEmojiId(),
    name: 'My game',
    players,
    hostId: players[0]?.id,
    deck: shuffleArray(emojis),
    currentRound: -1,
    phase: GamePhase.Init,
    rounds: [],
    teamPoints: [],
    neutralCards: [],
    fakePoints: [],
  };
}

export function addPlayer(game: Game, player: Player) {
  if (!game.hostId) game.hostId = player.id; // backup plan
  if (!player.pictures) player.pictures = [];
  game.players.push(player);
}

export function updatePlayer(game: Game, player: Player) {
  let currentUser = game.players.find(p => p.id === player.id);
  if (!currentUser) return;
  currentUser.name = player.name;
  currentUser.color = player.color;
}

export function removePlayerFromGame(game: Game, playerId: string) {
  const index = game.players.findIndex(p => p.id === playerId);
  if (index > -1) {
    game.players.splice(index, 1);
  }
}

export function startGame(game: Game) {
  // deal cards, assign roles and shuffle player order
  const dealtCards = dealCards(game.deck, game.players.length, getNumOfCardsPerPlayer(game.players.length));
  const roleOrder = getRoleOrder(game.players.length);
  shuffleArray(game.players);
  game.players.forEach((player, index) => {
    player.pictures = dealtCards[index].map((card) => ({ card }));
    player.role = roleOrder[index];
  });

  // start first round
  startRound(game);
}

function startRound(game: Game) {
  game.currentRound++;
  const round: GameRound = {
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

export function togglePainterSelection(game: Game, playerId: string, card: string, theme: string) {
  const player = game.players.find((player) => player.id === playerId);
  const picture = player?.pictures.find((pic) => pic.card === card);
  if (picture) {
    if (picture.painterTheme === theme) {
      picture.painterTheme = undefined;
    } else {
      picture.painterTheme = theme;
    }
  }
}

export function offerPictures(game: Game) {
  const round = getCurrentRound(game);

  const originals = getOfferedPictures(game);
  const fakes = getFakes(game.deck);
  round.pictures = shuffleArray([...originals, ...fakes]);

  game.phase = GamePhase.Choose;
}

export function toggleBuyerPreSelection(game: Game, playerId: string, card: string, theme: string) {
  const picture = game.rounds[game.currentRound].pictures.find((pic) => pic.card === card);
  if (picture) {
    if (!picture.buyerSelection) {
      picture.buyerSelection = {};
    }
    const selectionForTheme = picture.buyerSelection[theme];
    if (!selectionForTheme) {
      picture.buyerSelection[theme] = [playerId];
    } else {
      if (selectionForTheme.includes(playerId)) {
        picture.buyerSelection[theme] = selectionForTheme.filter((id) => id !== playerId);
      } else {
        picture.buyerSelection[theme] = [...picture.buyerSelection[theme], playerId];
      }
    }
  }
}

export function choosePictures(game: Game) {
  const round = getCurrentRound(game);
  round.pictures.forEach(setBuyerThemeForPicture);
  const selectedPictures = round.pictures.filter(isPictureSelectedFromBuyer);
  game.teamPoints.push(...selectedPictures.filter((pic) => pic.buyerTheme === pic.painterTheme));
  game.neutralCards.push(
    ...selectedPictures.filter((pic) => pic.buyerTheme !== pic.painterTheme && !pic.isFake),
    ...round.pictures.filter((pic) => !pic.isFake && !isPictureSelectedFromBuyer(pic))
  );
  game.fakePoints.push(...selectedPictures.filter((pic) => pic.isFake));
  game.phase = GamePhase.Evaluate;
}

export function endRound(game: Game) {
  if (game.fakePoints.length >= gameEndCondition) {
    game.phase = GamePhase.End;
  } else {
    fillUpCards(game);
    rotateRoles(game);
    startRound(game);
  }
}

function getCurrentRound(game: Game): GameRound {
  return game.rounds[game.currentRound];
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
    player.pictures = player.pictures.filter((pic) => !isPictureSelectedFromPainter(pic));
    const numOfPlayedCards = numOfCards - player.pictures.length;
    if (numOfPlayedCards) {
      player.pictures.push(...drawCards(game.deck, numOfPlayedCards).map((card) => ({ card })));
    }
  });
}

function rotateRoles(game: Game) {
  const firstRole = game.players[0].role;
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    const nextPlayer = game.players[i + 1];
    player.role = nextPlayer?.role ?? firstRole;
  }
}

function isPictureSelectedFromPainter(pic: Picture): boolean {
  return !!pic.painterTheme;
}

function isPictureSelectedFromBuyer(pic: Picture): boolean {
  return !!pic.buyerTheme;
}

export function getOfferedPictures(game: Game): Picture[] {
  return game.players.reduce(
    (currentArr: Picture[], player: Player) => currentArr.concat(player.pictures.filter(isPictureSelectedFromPainter)),
    []
  );
}

export function getBuyerSelection(game: Game): Picture[] {
  return game && GamePhase.Choose === game.phase ? game.rounds[game.currentRound].pictures.filter(
    (pic) => !!pic.buyerTheme || (pic.buyerSelection && !!Object.keys(pic.buyerSelection).length)
  ) : [];
}

export function setBuyerThemeForPicture(picture: Picture) {
  if (picture.buyerSelection) {
    picture.buyerTheme = Object.keys(picture.buyerSelection).reduce((currentTheme: string, theme: string) => {
      if (
        !currentTheme ||
        (picture.buyerSelection && picture.buyerSelection[theme]?.length > picture.buyerSelection[currentTheme]?.length)
      ) {
        return theme;
      }
      return currentTheme;
    }, '');
  }
}

export function getPlayersWithRequiredAction(game: Game): Player[] {
  return game.players;
}

export function getClearedForDeletion(game: Game, nowTime: number = (new Date()).getTime()): boolean {
  if (game?.creationTime) {
    const diff = nowTime - (new Date(game.creationTime).getTime());
    return diff > DELETE_CLEARANCE_TIME;
  } else {
    return [GamePhase.Init, GamePhase.End].includes(game.phase);
  }
}