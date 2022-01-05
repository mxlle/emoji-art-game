import { Picture, PublicGame } from '../../game-logic/game';
import { TrackByFunction } from '@angular/core';
import { SETTING_COLOR } from '../../data/constants';

export const trackByObjectId: TrackByFunction<{ id: string }> = (
  _index: number,
  value: {
    id: string;
  }
) => {
  return value?.id;
};

export const trackByPictureCard: TrackByFunction<Picture> = (_index: number, value: Picture) => {
  return value?.card;
};

export function getPictureCssClass(game: PublicGame, picture: Picture): string {
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

export function setPrimaryPlayerColor() {
  const playerColor = window.localStorage.getItem(SETTING_COLOR);
  if (playerColor) {
    document.body.style.setProperty('--primary-color', playerColor);
  }
}
