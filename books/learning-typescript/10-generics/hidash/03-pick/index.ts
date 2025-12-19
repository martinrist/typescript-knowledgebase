// Write your pick function here! ✨
// You'll need to export it so the tests can run it.
export function pick<T, K extends keyof T>(container: T, key: K) {
	return container[key];
}
