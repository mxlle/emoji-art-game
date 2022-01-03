import { animationFrameScheduler, interval, map, Observable, takeUntil, timer } from 'rxjs';
import { easeInQuad } from '../data/functions';

export function animateNumber(value: number, animationMillis: number = 1000): Observable<number> {
  const start = animationFrameScheduler.now();

  return interval(0, animationFrameScheduler).pipe(
    map(() => {
      const now = animationFrameScheduler.now();
      const linearPoints = ((now - start) / animationMillis) * value;
      return easeInQuad(linearPoints, value);
    }),
    map((animatedValue) => Math.min(value, animatedValue)),
    takeUntil(timer(animationMillis))
  );
}
