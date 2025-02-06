// Write your shallowEquality function here! ✨
// You'll need to export it so the tests can run it.

export function shallowEquality(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
