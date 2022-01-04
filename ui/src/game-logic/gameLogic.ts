import {
  BuyerSelection,
  DELETE_CLEARANCE_TIME,
  DemandSuggestion,
  Game,
  GameConfig,
  GameInfo,
  GamePhase,
  GameRound,
  Picture,
  Player,
  PublicGame,
  Role,
} from './game';
import { shuffleArray } from '../game-tools/random-util';
import {
  defaultConfig,
  fakesPerRound,
  gameEndCondition,
  getInitialJokers,
  getNumOfCardsPerPlayer,
  getRoleOrder,
  masterFaker,
  maxDemand,
  minDemand,
  themesPerRound,
  unknownCardEmoji,
} from './gameConsts';
import { dealCards, drawCards } from '../game-tools/card-game-util';
import { generateEmojiId } from '../game-tools/emoji-util';
import { createDeck } from './deck';

export function createGame(name: string): Game {
  const id = generateEmojiId();

  return {
    id,
    name,
    players: [],
    hostId: '',
    deck: [],
    discardedDeck: [],
    jokers: getInitialJokers(),
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

export function startGame(game: Game, config: GameConfig = defaultConfig) {
  if (GamePhase.Init !== game.phase) return;

  // deal cards and assign roles
  game.deck = createDeck(config.deckCategories, config.deckLimitPerCategory);
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
    themes: drawCardsSafe(game, themesPerRound),
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
  const fakes = getFakes(game);
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
  const newTeamPoints = selectedPictures.filter((pic) => pic.buyerTheme === pic.painterTheme);
  const newFakePoints = selectedPictures.filter((pic) => pic.isFake);

  game.teamPoints.push(...newTeamPoints);
  game.fakePoints.push(...newFakePoints);
  game.neutralCards.push(
    ...selectedPictures.filter((pic) => pic.buyerTheme !== pic.painterTheme && !pic.isFake),
    ...round.pictures.filter((pic) => !pic.isFake && !isPictureSelectedFromBuyer(pic))
  );

  if (newTeamPoints.length === round.demand) {
    reactivateJoker(game, newTeamPoints.length);
  }

  game.phase = GamePhase.Evaluate;
}

export function endRound(game: Game) {
  if (GamePhase.Evaluate !== game.phase) return;

  if (game.fakePoints.length >= gameEndCondition) {
    game.phase = GamePhase.End;
  } else {
    discardRoundCards(game);
    fillUpCards(game);
    rotateRoles(game);
    startRound(game);
  }
}

// -------------
// JOKER USAGE
// -------------

export function useExchangeThemesJoker(game: Game) {
  const joker = game.jokers[0];
  if (joker.phase !== game.phase) return;
  if (joker.used) return;

  const round = getCurrentRound(game);
  game.discardedDeck.push(...round.themes);
  round.themes = drawCardsSafe(game, themesPerRound);

  joker.used = true;
}

export function useSwapHandJoker(game: Game, playerId: string) {
  const joker = game.jokers[1];
  if (joker.phase !== game.phase) return;
  if (joker.used) return;

  const player = getPlayerInGame(game, playerId);
  if (!player || !player.pictures) return;

  game.discardedDeck.push(...player.pictures?.map((pic) => pic.card));
  player.pictures = drawCardsSafe(game, player.pictures.length).map((card) => ({ card }));

  joker.used = true;
}

export function useChangeDemandJoker(game: Game, newDemand: number) {
  const joker = game.jokers[2];
  if (joker.phase !== game.phase) return;
  if (joker.used) return;
  if (newDemand < minDemand && newDemand > maxDemand) return;

  getCurrentRound(game).demand = newDemand;

  joker.used = true;
}

export function useQuestionPictureJoker(game: Game, card: string) {
  const joker = game.jokers[3];
  if (joker.phase !== game.phase) return;
  if (joker.used) return;

  const round = getCurrentRound(game);
  const picture = round.pictures.find((pic) => pic.card === card);
  if (!picture) return;

  picture.fakeStatusKnown = true;

  joker.used = true;
}

function reactivateJoker(game: Game, value: number) {
  const joker = game.jokers.find((joker) => joker.type === value);
  if (joker) {
    joker.used = false;
  }
}

function getCurrentRound(game: Game): GameRound {
  return game.rounds[game.currentRound];
}

function getFakes(game: Game): Picture[] {
  return drawCardsSafe(game, fakesPerRound).map((card) => ({
    card,
    isFake: true,
  }));
}

function discardRoundCards(game: Game) {
  const round = getCurrentRound(game);
  const notInPoints = round.pictures.filter(
    (pic: Picture) =>
      game.teamPoints.findIndex((p) => p.card === pic.card) === -1 && game.fakePoints.findIndex((p) => p.card === pic.card) === -1
  );
  if (!game.discardedDeck) game.discardedDeck = [];
  game.discardedDeck.push(...round.themes, ...notInPoints.map((p) => p.card));
  game.neutralCards = []; // reset neutral cards - todo only dynamic in round
}

function fillUpCards(game: Game) {
  game.players.forEach((player) => {
    const numOfCards = player.pictures?.length ?? 0;
    // remove selected cards
    player.pictures = player.pictures?.filter((pic) => !isPictureSelectedFromPainter(pic));
    const numOfPlayedCards = numOfCards - (player.pictures?.length ?? 0);
    if (numOfPlayedCards && player.pictures) {
      player.pictures.push(...drawCardsSafe(game, numOfPlayedCards).map((card) => ({ card })));
    }
  });
}

function drawCardsSafe(game: Game, numOfCards: number) {
  if (game.deck.length < numOfCards) {
    fillUpDeck(game.deck, game.discardedDeck);
    game.discardedDeck = [];
  }
  return drawCards(game.deck, numOfCards);
}

function fillUpDeck(deck: string[], discardedDeck: string[] = []) {
  deck.push(...shuffleArray(discardedDeck));
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

export function getOfferedPictures(game: Game, includePlayerId: boolean = false): Picture[] {
  return game.players.reduce(
    (currentArr: Picture[], player: Player) =>
      currentArr.concat(
        (player.pictures ?? []).filter(isPictureSelectedFromPainter).map((pic) => {
          if (includePlayerId) {
            return { ...pic, playerId: player.id };
          }
          return pic;
        })
      ),
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

export function getPlayerInGame(game: { players: Player[] }, playerId?: string): Player | undefined {
  return game.players.find((player: Player) => player.id === playerId);
}

export function toPublicGame(game: Game): PublicGame {
  const { id, name, hostId, players, jokers, phase, currentRound, rounds, teamPoints, fakePoints, neutralCards } = game;
  const round = rounds[currentRound];

  return {
    id,
    name,
    hostId,
    players: players.map(mapToPublicPlayer),
    jokers,
    currentOffer:
      round?.pictures.map(({ card, isFake, buyerTheme, painterTheme, buyerSelection, fakeStatusKnown }) => {
        if (GamePhase.Evaluate === phase) {
          return { card, isFake, buyerTheme, painterTheme };
        } else {
          let painterTheme = fakeStatusKnown ? (isFake ? masterFaker : Role.PAINTER) : undefined;
          return { card, buyerSelection, painterTheme };
        }
      }) ?? [],
    currentThemes: round?.themes ?? [],
    currentDemand: round?.demand ?? 0,
    currentDemandSuggestions: round?.demandSuggestions ?? [],
    offerPreview: getOfferedPictures(game, true).map(({ playerId }) => ({ card: unknownCardEmoji, playerId })),
    selectionCount: getBuyerSelection(game).length,
    correctCount: round?.pictures.filter((pic) => game.teamPoints.findIndex((p) => pic.card === p.card) > -1).length,
    phase,
    teamPoints,
    fakePoints,
    neutralCards,
  };
}

export function toGameInfo(game: Game): GameInfo {
  const { id, name, hostId, players, phase, creationTime, teamPoints } = game;
  let endResult = undefined;
  if (GamePhase.End === phase) {
    endResult = teamPoints.length;
  }

  return {
    id,
    name,
    hostId,
    players: players.map(mapToPublicPlayer),
    phase,
    creationTime,
    endResult,
  };
}

function mapToPublicPlayer({ id, name, color, role }: Player): Player {
  return { id, name, color, role };
}
