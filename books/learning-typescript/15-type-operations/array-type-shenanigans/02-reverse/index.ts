// Write your Reverse type here! ✨
// You'll need to export it so the tests can run it.

export type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
	? [...Reverse<Rest>, First]
	: T;
