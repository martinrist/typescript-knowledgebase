// Write your unique function here! ✨
// You'll need to export it so the tests can run it.

export function unique<T>(...allItems: T[][]) {
	const found = new Set<T>();

	for (const items of allItems) {
		for (const item of items) {
			found.add(item);
		}
	}

	return Array.from(found);
}
