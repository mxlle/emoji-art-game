import {
  BuyerSelection,
  DELETE_CLEARANCE_TIME,
  DemandSuggestion,
  Game,
  GameInfo,
  GamePhase,
  GameRound,
  Picture,
  Player,
  PlayerGame,
} from './game';
import { shuffleArray } from '../game-tools/random-util';
import { emojis, fakesPerRound, gameEndCondition, getNumOfCardsPerPlayer, getRoleOrder, minDemand, themesPerRound } from './gameConsts';
import { dealCards, drawCards } from '../game-tools/card-game-util';
import { generateEmojiId } from '../game-tools/emoji-util';

export function createGame(players: Player[] = []): Game {
  const id = generateEmojiId();

  return {
    id,
    name: `Game ${id}`,
    players,
    hostId: players[0]?.id,
    deck: [],
    currentRound: -1,
    phase: GamePhase.Init,
    rounds: [],
    teamPoints: [],
    neutralCards: [],
    fakePoints: [],
  };
}

export function addOrUpdatePlayer(game: Game, newPlayer: Player) {
  if (GamePhase.Init !== game.phase) return;

  if (!game.hostId) game.hostId = newPlayer.id; // whoever joins first, becomes host
  const index = game.players.findIndex((player: Player) => player.id === newPlayer.id);
  if (index === -1) {
    game.players.push(newPlayer);
  } else {
    game.players.splice(index, 1, newPlayer); // replace existing player
  }
}

export function removePlayerFromGame(game: Game, playerId: string) {
  if (GamePhase.Init !== game.phase) return;

  const index = game.players.findIndex((p) => p.id === playerId);
  if (index > -1) {
    game.players.splice(index, 1);
  }
}

export function startGame(game: Game) {
  if (GamePhase.Init !== game.phase) return;

  // deal cards and assign roles
  game.deck = shuffleArray(emojis);
  const dealtCards = dealCards(game.deck, game.players.length, getNumOfCardsPerPlayer(game.players.length));
  const roleOrder = getRoleOrder(game.players.length);
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

export function suggestDemand(game: Game, playerId: string, demand: number) {
  if (GamePhase.Demand !== game.phase) return;

  const round = getCurrentRound(game);
  if (!round.demandSuggestions) {
    round.demandSuggestions = [];
  }

  const demandIndex = round.demandSuggestions.findIndex((sug) => sug.demand === demand);
  const suggestionForDemand = round.demandSuggestions[demandIndex];
  if (!suggestionForDemand) {
    round.demandSuggestions.push({ demand, playerIds: [playerId] });
  } else {
    const index = suggestionForDemand.playerIds.findIndex((id) => id === playerId);
    if (index >= 0) {
      suggestionForDemand.playerIds.splice(index, 1);
      if (!suggestionForDemand.playerIds.length) {
        round.demandSuggestions.splice(demandIndex, 1);
        if (round.demandSuggestions.length === 0) {
          round.demandSuggestions = undefined;
        }
      }
    } else {
      suggestionForDemand.playerIds.push(playerId);
    }
  }
}

export function setDemand(game: Game) {
  if (GamePhase.Demand !== game.phase) return;

  const round = getCurrentRound(game);
  if (!round?.demandSuggestions?.length) return; // TODO

  round.demand = getDemandFromSuggestions(round.demandSuggestions);
  game.phase = GamePhase.Offer;
}

export function togglePainterSelection(game: Game, playerId: string, card: string, theme: string) {
  if (GamePhase.Offer !== game.phase) return;

  const player = game.players.find((player) => player.id === playerId);
  const picture = player?.pictures?.find((pic) => pic.card === card);
  if (picture) {
    if (picture.painterTheme === theme) {
      picture.painterTheme = undefined;
    } else {
      picture.painterTheme = theme;
    }
  }
}

export function offerPictures(game: Game) {
  if (GamePhase.Offer !== game.phase) return;

  const round = getCurrentRound(game);

  const originals = getOfferedPictures(game);
  const fakes = getFakes(game.deck);
  round.pictures = shuffleArray([...originals, ...fakes]);

  game.phase = GamePhase.Choose;
}

export function toggleBuyerPreSelection(game: Game, playerId: string, card: string, theme: string) {
  if (GamePhase.Choose !== game.phase) return;

  const picture = game.rounds[game.currentRound].pictures.find((pic) => pic.card === card);
  if (picture) {
    if (!picture.buyerSelection) {
      picture.buyerSelection = [];
    }
    const selectionIndex = picture.buyerSelection.findIndex((sel) => sel.theme === theme);
    const selectionForTheme = picture.buyerSelection[selectionIndex];
    if (!selectionForTheme) {
      picture.buyerSelection.push({ theme, playerIds: [playerId] });
    } else {
      const index = selectionForTheme.playerIds.findIndex((id) => id === playerId);
      if (index >= 0) {
        selectionForTheme.playerIds.splice(index, 1);
        if (!selectionForTheme.playerIds.length) {
          picture.buyerSelection.splice(selectionIndex, 1);
          if (picture.buyerSelection.length === 0) {
            picture.buyerSelection = undefined;
          }
        }
      } else {
        selectionForTheme.playerIds.push(playerId);
      }
    }
  }
}

export function choosePictures(game: Game) {
  if (GamePhase.Choose !== game.phase) return;

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
  if (GamePhase.Evaluate !== game.phase) return;

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
    const numOfCards = player.pictures?.length ?? 0;
    // remove selected cards
    player.pictures = player.pictures?.filter((pic) => !isPictureSelectedFromPainter(pic));
    const numOfPlayedCards = numOfCards - (player.pictures?.length ?? 0);
    if (numOfPlayedCards && player.pictures) {
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
    (currentArr: Picture[], player: Player) => currentArr.concat((player.pictures ?? []).filter(isPictureSelectedFromPainter)),
    []
  );
}

export function getBuyerSelection(game: Game): Picture[] {
  return game && GamePhase.Choose === game.phase
    ? game.rounds[game.currentRound].pictures.filter(
        (pic) => !!pic.buyerTheme || (pic.buyerSelection && !!Object.keys(pic.buyerSelection).length)
      )
    : [];
}

export function getDemandFromSuggestions(suggestions: DemandSuggestion[] = []): number {
  const bestSelection = suggestions.reduce((currentSuggestion: DemandSuggestion | undefined, suggestion: DemandSuggestion) => {
    if (!currentSuggestion || suggestion.playerIds?.length > currentSuggestion.playerIds?.length) {
      return suggestion;
    }
    return currentSuggestion;
  }, undefined);
  return bestSelection?.demand ?? minDemand;
}

export function setBuyerThemeForPicture(picture: Picture) {
  if (picture.buyerSelection) {
    const bestSelection = picture.buyerSelection.reduce((currentSelection: BuyerSelection | undefined, selection: BuyerSelection) => {
      if (!currentSelection || selection.playerIds?.length > currentSelection.playerIds?.length) {
        return selection;
      }
      return currentSelection;
    }, undefined);
    picture.buyerTheme = bestSelection?.theme;
  }
}

export function getPlayersWithRequiredAction(_game: Game): Player[] {
  return []; // todo
}

export function getClearedForDeletion(game: Game | GameInfo, nowTime: number = new Date().getTime()): boolean {
  if (game?.creationTime) {
    const diff = nowTime - new Date(game.creationTime).getTime();
    return diff > DELETE_CLEARANCE_TIME;
  } else {
    return [GamePhase.Init, GamePhase.End].includes(game.phase);
  }
}

export function getPlayerInGame(game: Game | GameInfo, playerId?: string): Player | undefined {
  return game.players.find((player: Player) => player.id === playerId);
}

export function toPlayerGame(game: Game): PlayerGame {
  const { id, name, hostId, players, phase, currentRound, rounds, teamPoints, fakePoints, neutralCards } = game;
  const round = rounds[currentRound];

  return {
    id,
    name,
    hostId,
    players,
    currentOffer:
      round?.pictures.map(({ card, isFake, buyerTheme, painterTheme, buyerSelection }) => {
        if (GamePhase.Evaluate === phase) {
          return { card, isFake, buyerTheme, painterTheme };
        } else {
          return { card, buyerSelection };
        }
      }) ?? [],
    currentThemes: round?.themes ?? [],
    currentDemand: round?.demand ?? 0,
    currentDemandSuggestions: round?.demandSuggestions ?? [],
    offerCount: getOfferedPictures(game).length,
    selectionCount: getBuyerSelection(game).length,
    correctCount: round?.pictures.filter((pic) => game.teamPoints.findIndex((p) => pic.card === p.card) > -1).length,
    phase,
    teamPoints,
    fakePoints,
    neutralCards,
  };
}

export function toGameInfo(game: Game): GameInfo {
  const { id, name, hostId, players, phase, creationTime } = game;

  return {
    id,
    name,
    hostId,
    players: players.map(({ id, name, color }) => ({ id, name, color })),
    phase,
    creationTime,
  };
}
