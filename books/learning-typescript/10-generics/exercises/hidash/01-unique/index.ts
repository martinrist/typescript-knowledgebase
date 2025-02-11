// Write your unique function here! ✨
// You'll need to export it so the tests can run it.

export function unique<T>(...allItems: T[][]): T[] {
  let result = new Set<T>();

  for (const outer of allItems) {
    for (const inner of outer) {
      result.add(inner);
    }
  }

  return Array.from(result);
}
