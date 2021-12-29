import { generateId } from '@shared/functions';

import GameDaoImpl from '@daos/Game';
import { docToPlain, GameController, GameDocument, GamePhase, Player } from '@entities/Game';
import { forbiddenError, gameNotFoundError, paramMissingError } from '@shared/constants';
import { Namespace } from 'socket.io';
import { Game, GameApi, GameEvent, Role, ROOM_GAME, ROOM_GAME_LIST, ROOM_GAME_PLAYER } from '@gameTypes';
import { getPlayerInGame, toGameInfo, toPublicGame } from '@gameFunctions';

// Init shared
const gameDao = new GameDaoImpl();

class GameApiImpl implements GameApi {
  private socket: Namespace;
  private readonly userId: string;

  constructor(socket: Namespace, userId: string) {
    this.socket = socket;
    this.userId = userId;
  }

  async loadGames() {
    const games = await gameDao.getAll();

    // filter and convert to instance
    return games
      .filter((game: Game) => {
        return game.phase === GamePhase.Init || (this.userId && game.players.findIndex((p) => p.id === this.userId) > -1);
      })
      .map((game: Game) => toGameInfo(game));
  }

  async loadGame(gameId: string) {
    const game = await gameDao.getOne(gameId);
    game && this.emitPlayerData(game, this.userId);
    return game && toPublicGame(docToPlain(game));
  }

  async addGame(game: Game) {
    if (!game) {
      throw new Error(paramMissingError);
    }

    if (!game.id) game.id = generateId();
    if (!game.hostId) game.hostId = this.userId;
    game.creationTime = new Date();

    const createdGame = await gameDao.add(game);

    this.socket.to(ROOM_GAME_LIST).emit(GameEvent.UpdateList);

    return createdGame.id as string;
  }

  async addPlayer(gameId: string, player: Player) {
    const game = await gameDao.getOne(gameId);

    if (!player) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);

    if (!player.id) player.id = this.userId;
    GameController.addOrUpdatePlayer(game, player);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame, player.id);
    this.socket.to(ROOM_GAME_LIST).emit(GameEvent.UpdateList);

    return true;
  }

  async updatePlayer(gameId: string, player: Player) {
    const game = await gameDao.getOne(gameId);

    if (!player) throw new Error(paramMissingError);
    if (player.id !== this.userId) throw new Error(forbiddenError);
    if (!game) throw new Error(gameNotFoundError);

    GameController.addOrUpdatePlayer(game, player);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame, player.id);

    return true;
  }

  async removePlayerFromGame(gameId: string, playerId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (!playerId) throw new Error(paramMissingError);
    if (playerId !== this.userId && this.userId !== game.hostId) throw new Error(forbiddenError);

    GameController.removePlayerFromGame(game, playerId);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame, playerId);

    return true;
  }

  async startGame(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.startGame(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame);

    return true;
  }

  async useExchangeThemesJoker(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.useExchangeThemesJoker(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async suggestDemand(gameId: string, demand: number) {
    const game = await gameDao.getOne(gameId);

    if (!demand) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.suggestDemand(game, this.userId, demand);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async setDemand(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.setDemand(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async useSwapHandJoker(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.PAINTER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.useSwapHandJoker(game, this.userId);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame, this.userId);

    return true;
  }

  async useChangeDemandJoker(gameId: string, newDemand: number) {
    const game = await gameDao.getOne(gameId);

    if (!newDemand) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.PAINTER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.useChangeDemandJoker(game, newDemand);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async togglePainterSelections(gameId: string, card: string, theme: string) {
    const game = await gameDao.getOne(gameId);

    if (!card) throw new Error(paramMissingError);
    if (!theme) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.PAINTER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.togglePainterSelection(game, this.userId, card, theme);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame, this.userId);

    return true;
  }

  async offerPictures(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.PAINTER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.offerPictures(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async useQuestionPictureJoker(gameId: string, card: string) {
    const game = await gameDao.getOne(gameId);

    if (!card) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.useQuestionPictureJoker(game, card);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async toggleBuyerPreSelections(gameId: string, card: string, theme: string) {
    const game = await gameDao.getOne(gameId);

    if (!card) throw new Error(paramMissingError);
    if (!theme) throw new Error(paramMissingError);
    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.toggleBuyerPreSelection(game, this.userId, card, theme);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async choosePictures(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId && p.role === Role.BUYER) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.choosePictures(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);

    return true;
  }

  async endOfRound(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.players.findIndex((p: Player) => p.id === this.userId) === -1) {
      throw new Error(forbiddenError);
    }

    GameController.endRound(game);

    const updatedGame = await gameDao.update(game);

    this.emitPublicGame(updatedGame);
    this.emitPlayerData(updatedGame);

    return true;
  }

  async deleteGame(gameId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (game.hostId !== this.userId && !GameController.getClearedForDeletion(game)) throw new Error(forbiddenError);

    await gameDao.delete(gameId);

    this.socket.to(ROOM_GAME_LIST).emit(GameEvent.UpdateList);

    return true;
  }

  emitPublicGame(game: GameDocument) {
    const publicGame = toPublicGame(docToPlain(game));
    this.socket.to(ROOM_GAME(game.id)).emit(GameEvent.Update, publicGame);
  }

  emitPlayerData(game: GameDocument, onlyPlayerId?: string) {
    if (onlyPlayerId) {
      // only one player
      this.socket.to(ROOM_GAME_PLAYER(game.id, onlyPlayerId)).emit(GameEvent.UpdatePlayerData, getPlayerInGame(game, onlyPlayerId));
    } else {
      // update all players
      game.players.forEach((player) => {
        this.socket.to(ROOM_GAME_PLAYER(game.id, player.id)).emit(GameEvent.UpdatePlayerData, getPlayerInGame(game, player.id));
      });
    }
  }
}

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default GameApiImpl;
