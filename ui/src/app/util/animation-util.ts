import { animationFrameScheduler, interval, map, mapTo, merge, Observable, takeUntil, timer } from 'rxjs';
import { easeInQuad } from '../../data/functions';

export function animateNumber(value: number, animationMillis: number = 1000): Observable<number> {
  const start = animationFrameScheduler.now();
  const animationTimer = timer(animationMillis).pipe(mapTo(value));
  const animationInterval = interval(0, animationFrameScheduler).pipe(
    map(() => {
      const now = animationFrameScheduler.now();
      const linearPoints = ((now - start) / animationMillis) * value;
      return easeInQuad(linearPoints, value);
    }),
    takeUntil(timer(animationMillis))
  );

  return merge(animationInterval, animationTimer);
}
