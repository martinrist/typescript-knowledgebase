// Write your deepDifferences function here! ✨
// You'll need to export it so the tests can run it.
export function deepDifferences(a: string[][], b: string[][]) {
  if (a.length !== b.length) {
    return undefined;
  }

  let results: ((string | undefined)[] | undefined)[] = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) {
      results.push(undefined);
    } else {
      results.push(a[i].map((value, index) => value === b[i][index] ? value : undefined));
    }
  }

  return results;
}
