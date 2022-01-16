import { getInitialJokers, Joker } from './joker';
import { Player } from './player';
import { GamePhase } from './gamePhase';
import { Picture } from './picture';
import { generateEmojiId } from '../../game-tools/emoji-util';
import { DemandSuggestion } from './demand';

export interface Game {
  id: string;
  name: string;
  players: Player[];
  hostId: string;

  deck: string[];
  discardedDeck: string[];

  jokers: Joker[];

  currentRound: number;
  phase: GamePhase;

  rounds: GameRound[];

  teamPoints: Picture[];
  fakePoints: Picture[];

  creationTime?: Date;
  startTime?: Date;
  endTime?: Date;
}

export interface GameRound {
  themes: string[];
  demand?: number;
  demandSuggestions?: DemandSuggestion[];
  pictures: Picture[];
}

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
    fakePoints: [],
  };
}
