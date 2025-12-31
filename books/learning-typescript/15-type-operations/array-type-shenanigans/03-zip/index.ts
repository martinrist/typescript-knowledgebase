// Write your Zip type here! ✨
// You'll need to export it so the tests can run it.

export type Zip<T extends any[], U extends any[]> = T extends [infer FirstT, ...infer RestT]
	? U extends [infer FirstU, ...infer RestU]
		? [FirstT, FirstU, ...Zip<RestT, RestU>]
		: [...T]
	: U;
