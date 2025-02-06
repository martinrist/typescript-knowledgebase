// Write your shallowDifferences function here! ✨
// You'll need to export it so the tests can run it.
export function shallowDifferences(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return undefined;
  }

  let result = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      result.push(a[i]);
    } else {
      result.push(undefined)
    }
  }

  return result;
}
