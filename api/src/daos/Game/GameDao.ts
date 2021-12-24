import { Game, GameDocument } from '@entities/Game';
import { GameModel } from '@daos/Mongoose/models';

export interface GameDao {
  getOne: (id: string) => Promise<GameDocument | null>;
  getAll: () => Promise<GameDocument[]>;
  add: (game: GameDocument) => Promise<GameDocument>;
  update: (game: GameDocument) => Promise<GameDocument>;
  delete: (id: string) => Promise<void>;
}

class GameDaoImpl implements GameDao {
  public async getOne(id: string): Promise<GameDocument | null> {
    return await GameModel.findOne({ id: id }).exec();
  }

  /**
   *
   */
  public async getAll(): Promise<GameDocument[]> {
    return await GameModel.find().exec();
  }

  /**
   *
   * @param game
   */
  public async add(game: Game): Promise<GameDocument> {
    return await new GameModel(game).save();
  }

  /**
   *
   * @param game
   */
  public async update(game: GameDocument): Promise<GameDocument> {
    return await game.save();
  }

  /**
   *
   * @param id
   */
  public async delete(id: string): Promise<void> {
    await GameModel.findOneAndDelete({ id: id });
  }
}

export default GameDaoImpl;
