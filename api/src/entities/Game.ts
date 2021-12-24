import { Document } from 'mongoose';
import { Game, GamePhase, Player } from '@gameTypes';

type GameDocument = Game & Document;
export { Game, GameDocument, GamePhase, Player };

export * as GameController from '@gameFunctions';

export function docToPlain(gameDoc: GameDocument): Game {
  return gameDoc.toObject();
}
