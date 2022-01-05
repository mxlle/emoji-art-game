import { animateNumber } from './animation-util';

export const scrollIntoViewIfPossible = (element?: Element, container?: Element, topBuffer: number = 0, bottomBuffer: number = 0) => {
  if (element && container && canGetElementPositions(element, container)) {
    const verticalDiff = getVerticalScrollDiffToShowElement(element, container, topBuffer, bottomBuffer);
    scrollByY(container, verticalDiff);
  }
};

export const scrollTop = (container?: Element) => {
  if (container && canGetElementPosition(container)) {
    scrollByY(container, 0 - container.scrollTop);
  }
};

export const scrollByY = (container: Element, y: number) => {
  if (y !== 0) {
    const startTop = container.scrollTop;
    animateNumber(y, 300).subscribe((animatedDiff) => {
      container.scrollTop = startTop + animatedDiff;
    });
  }
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

/**
 * Gets the vertical difference which the container should be scrolled to make the inner element fully visible
 * Optional buffer values, if difference should not be based on the outer edges (like a container margin)
 *
 * Returns 0 if element is already fully visible
 *
 * Use in combination with `canGetElementPositions` to avoid exceptions
 * @see canGetElementPositions
 */
export const getVerticalScrollDiffToShowElement = (
  element: Element,
  container: Element,
  topBuffer: number = 0,
  bottomBuffer: number = 0
): number => {
  const bounding = element.getBoundingClientRect();
  const containerBounding = container.getBoundingClientRect();

  const topDiff = bounding.top - (containerBounding.top + topBuffer);
  const bottomDiff = bounding.bottom - (containerBounding.bottom - bottomBuffer);

  if (topDiff > 0 && bottomDiff < 0) {
    // element fully visible - no scrolling needed
    return 0;
  } else {
    // "nearest block" behavior
    // finds the shortest distance to align one edge
    // when element is below visible area: will align the top edges if element is higher than container, and align the bottom edges if element is smaller than container
    // when element is above visible area: the other way around
    if (Math.abs(topDiff) < Math.abs(bottomDiff)) {
      return topDiff;
    } else {
      return bottomDiff;
    }
  }
};
