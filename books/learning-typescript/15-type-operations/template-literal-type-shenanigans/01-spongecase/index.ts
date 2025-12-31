// Write your SpOnGeCaSe type here! ✨
// You'll need to export it so the tests can run it.

export type SpOnGeCaSe<
	Text,
	FirstTransform extends "upper" | "lower" = "upper",
> = Text extends `${infer First}${infer Rest}`
	? FirstTransform extends "upper"
		? `${Capitalize<First>}${SpOnGeCaSe<Rest, "lower">}`
		: `${Lowercase<First>}${SpOnGeCaSe<Rest, "upper">}`
	: ``;
