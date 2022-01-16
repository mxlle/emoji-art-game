import { buyer, painter, pointsEmoji } from '../gameConsts';

export enum GamePhase {
  Init,
  Demand,
  Offer,
  Choose,
  Evaluate,
  End,
}

export const getPhaseEmojis = (phase: GamePhase) => {
  switch (phase) {
    case GamePhase.Init:
      return `👥`;
    case GamePhase.Demand:
      return `${buyer}🔢`;
    case GamePhase.Offer:
      return `${painter}🖼️`;
    case GamePhase.Choose:
      return `${buyer}💰`;
    case GamePhase.Evaluate:
      return `📊${pointsEmoji}`;
    case GamePhase.End:
      return `${pointsEmoji}⌛`;
    default:
      return '?';
  }
};
