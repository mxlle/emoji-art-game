import { Picture, PublicGame } from '../../game-logic/game';
import { TrackByFunction } from '@angular/core';

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

/**
 * Checks if an element is completely visible inside a container element
 *
 * Use in combination with `canGetElementPositions` to avoid exceptions
 * @see canGetElementPositions
 */
export const isElementVerticallyCompletelyVisible = (element: Element, container: Element): boolean => {
  const bounding = element.getBoundingClientRect();
  const containerBounding = container.getBoundingClientRect();

  return bounding.top >= containerBounding.top && bounding.bottom <= containerBounding.bottom;
};

/**
 * Checks if the `getBoundingClientRect` function exists on all provided elements
 */
export const canGetElementPositions = (...elements: Element[]): boolean => {
  return elements.every(canGetElementPosition);
};

export const canGetElementPosition = (element: Element): element is HTMLElement => {
  return typeof element?.getBoundingClientRect === 'function';
};
