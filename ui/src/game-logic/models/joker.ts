import { Role } from './role';
import { GamePhase } from './gamePhase';

export interface Joker {
  readonly type: JokerType;
  readonly phase: GamePhase;
  readonly role: Role;
  used: boolean;
}

export enum JokerType {
  EXCHANGE_THEMES = 3,
  SWAP_HAND = 4,
  CHANGE_DEMAND = 5,
  QUESTION_PICTURE = 6,
}

export const getInitialJokers = (): Joker[] => {
  return [
    { type: 3, phase: GamePhase.Demand, role: Role.BUYER, used: false },
    { type: 4, phase: GamePhase.Offer, role: Role.PAINTER, used: false },
    { type: 5, phase: GamePhase.Offer, role: Role.PAINTER, used: false },
    { type: 6, phase: GamePhase.Choose, role: Role.BUYER, used: false },
  ];
};

export function getJokerLabel(joker: { type: JokerType }): string {
  switch (joker.type) {
    case JokerType.EXCHANGE_THEMES:
      return `2️⃣🔄`;
    case JokerType.SWAP_HAND:
      return `✋🔄`;
    case JokerType.CHANGE_DEMAND:
      return `➕➖`;
    case JokerType.QUESTION_PICTURE:
      return `🖼️❓`;
    default:
      return '';
  }
}
