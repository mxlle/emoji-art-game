import {Game, GameBase} from '@entities/Game';
import {GameModel} from "@daos/Mongoose/models";

export interface GameDao {
    getOne: (id: string) => Promise<Game | null>;
    getAll: () => Promise<Game[]>;
    add: (game: Game) => Promise<Game>;
    update: (game: Game) => Promise<Game>;
    delete: (id: string) => Promise<void>;
}

class GameDaoImpl implements GameDao {

    public async getOne(id: string): Promise<Game | null> {
        return await GameModel.findOne({id: id}).exec();
    }


    /**
     *
     */
    public async getAll(): Promise<Game[]> {
        return await GameModel.find().exec();
    }


    /**
     *
     * @param game
     */
    public async add(game: GameBase): Promise<Game> {
        return await new GameModel(game).save();
    }


    /**
     *
     * @param game
     */
    public async update(game: Game): Promise<Game> {
        return await game.save();
    }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        await GameModel.findOneAndDelete({id: id});
    }
}

export default GameDaoImpl;
