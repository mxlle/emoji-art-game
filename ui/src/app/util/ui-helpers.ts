import { Picture } from '../../game-logic/game';
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

export function getPictureCssClass(picture: Picture): string {
  if (picture.buyerTheme && picture.buyerTheme === picture.painterTheme && !picture.isFake) {
    return 'correct';
  } else if (picture.buyerTheme !== picture.painterTheme && !picture.isFake) {
    return 'neutral';
  } else if (picture.buyerTheme !== picture.painterTheme && picture.isFake) {
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
export function getDiffToCenter(element: HTMLElement): { x: number; y: number } {
  const bounding = element.getBoundingClientRect();
  const x = window.innerWidth / 2 - bounding.left - bounding.width / 2;
  const y = window.innerHeight / 2 - bounding.top - bounding.height / 2;
  return { x, y };
}
