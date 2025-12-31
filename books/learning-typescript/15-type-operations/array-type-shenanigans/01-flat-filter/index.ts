// Write your FilteredArrayItems type here! ✨
// You'll need to export it so the tests can run it.

export type FilteredArrayItems<T, Filter> = T extends (infer Item)[]
	? Item extends Filter
		? FilteredArrayItems<Item, Filter>
		: never
	: T extends Filter
		? T
		: never;
