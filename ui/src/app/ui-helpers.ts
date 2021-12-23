import { Game, Picture } from '../game-logic/game';
import { TrackByFunction } from '@angular/core';

export const trackByObjectId: TrackByFunction<{ id: string | number }> = (
  _index: number,
  value: {
    id: string | number;
  }
) => {
  return value?.id;
};

export function getPictureCssClass(game: Game, picture: Picture): string {
  if (game.teamPoints.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'correct';
  } else if (game.neutralCards.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'neutral';
  } else if (game.fakePoints.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'fake';
  } else {
    return '';
  }
}
