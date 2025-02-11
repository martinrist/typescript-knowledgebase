// Write your zip function here! ✨
// You'll need to export it so the tests can run it.
export function zip<T, U>(xs: T[], ys: U[]): (T|U)[] {
  let result: (T|U)[] = [];

  const length = Math.max(xs.length, ys.length);
  for (let i = 0; i < length; i++) {
    if (xs[i]) {
      result.push(xs[i]);
    }
    if (ys[i]) {
      result.push(ys[i]);
    }
  }

  return result;
}
