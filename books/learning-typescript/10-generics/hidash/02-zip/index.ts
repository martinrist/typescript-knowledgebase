// Write your zip function here! ✨
// You'll need to export it so the tests can run it.

export function zip<A, B>(a: A[], b: B[]) {
	const result: (A | B)[] = [];
	let i: number;

	for (i = 0; i < Math.min(a.length, b.length); i += 1) {
		result.push(a[i]);
		result.push(b[i]);
	}

	for (const remaining of [a, b]) {
		for (; i < remaining.length; i += 1) {
			result.push(remaining[i]);
		}
	}

	return result;
}
