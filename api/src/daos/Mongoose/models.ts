import mongoose from "mongoose";
import {GameSchema} from "./schemas";
import {Game} from "@entities/Game";

mongoose.connect(process.env.DB_CONNSTR || '', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

const GameModel = mongoose.model<Game>('Game', GameSchema);


export { GameModel };

