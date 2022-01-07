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
export function getDiffToCenter(element: HTMLElement, container: HTMLElement = document.body): { x: number; y: number } {
  const bounding = element.getBoundingClientRect();
  const containerBounding = container.getBoundingClientRect();
  const x = getCenteredX(containerBounding) - getCenteredX(bounding);
  const y = getCenteredY(containerBounding) - getCenteredY(bounding);
  return { x, y };
}

function getCenteredX(rect: DOMRect) {
  return rect.x + rect.width / 2;
}

function getCenteredY(rect: DOMRect) {
  return rect.y + rect.height / 2;
}
