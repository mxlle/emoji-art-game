import { Document } from 'mongoose';
import { Game, GameController, GamePhase, Player } from '@gameLogic';

type GameDocument = Game & Document;
export { Game, GameDocument, GamePhase, Player, GameController };

export function docToPlain(gameDoc: GameDocument): Game {
  return gameDoc.toObject();
}
