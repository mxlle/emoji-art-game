import { generateId } from '@shared/functions';

import GameDaoImpl from '@daos/Game';
import { docToPlain, GameController, GameDocument, GamePhase, Player } from '@entities/Game';
import { forbiddenError, gameNotFoundError, paramMissingError } from '@shared/constants';
import { Namespace } from 'socket.io';
import { Game, GameApi, GameEvent, Role, ROOM_GAME_LIST, ROOM_GAME_PLAYER } from '@gameTypes';
import { toGameInfo, toPlayerGame } from '@gameFunctions';

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
    return game && toPlayerGame(docToPlain(game), this.userId);
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

    this.emitPlayerGame(updatedGame);
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

    this.emitPlayerGame(updatedGame);

    return true;
  }

  async removePlayerFromGame(gameId: string, playerId: string) {
    const game = await gameDao.getOne(gameId);

    if (!game) throw new Error(gameNotFoundError);
    if (!playerId) throw new Error(paramMissingError);
    if (playerId !== this.userId && this.userId !== game.hostId) throw new Error(forbiddenError);

    GameController.removePlayerFromGame(game, playerId);

    const updatedGame = await gameDao.update(game);

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

    this.emitPlayerGame(updatedGame);

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

  emitPlayerGame(game: GameDocument) {
    const plainGame = docToPlain(game);
    plainGame.players.forEach((player) => {
      const playerGame = toPlayerGame(docToPlain(game), player.id);
      this.socket.to(ROOM_GAME_PLAYER(game.id, player.id)).emit(GameEvent.Update, playerGame);
    });
  }
}

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default GameApiImpl;
