import { animationFrameScheduler, interval, map, mapTo, merge, Observable, take, takeUntil, timer } from 'rxjs';

export enum AnimationType {
  Linear,
  EaseIn,
  EaseInOut,
}

export function animateNumber(
  value: number,
  animationMillis: number = 1000,
  animationType: AnimationType = AnimationType.EaseInOut
): Observable<number> {
  const start = animationFrameScheduler.now();
  const animationTimer = timer(animationMillis).pipe(mapTo(value), take(1));
  const animationInterval = interval(0, animationFrameScheduler).pipe(
    map(() => {
      const now = animationFrameScheduler.now();
      const progress = (now - start) / animationMillis;

      switch (animationType) {
        case AnimationType.Linear:
          return progress * value;
        case AnimationType.EaseIn:
          return easeInQuad(progress) * value;
        case AnimationType.EaseInOut:
        default:
          return easeInOutQuad(progress) * value;
      }
    }),
    takeUntil(timer(animationMillis))
  );

  return merge(animationInterval, animationTimer);
}

function easeInQuad(x: number): number {
  return x * x;
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
