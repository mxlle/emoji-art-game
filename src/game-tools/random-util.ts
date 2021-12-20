/**
 * Shuffles array in place
 */
export function shuffleArray<T>(a: T[]): T[] {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function randomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateId() {
  return Math.random().toString(36).replace("0.", "");
}
