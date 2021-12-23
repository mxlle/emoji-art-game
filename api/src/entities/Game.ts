import {Document} from 'mongoose';
import {Game as GameBase, GamePhase, Player} from '@gameTypes';

type Game = GameBase & Document;
export { GameBase, Game, GamePhase, Player };

export * as GameController from '@gameFunctions';
