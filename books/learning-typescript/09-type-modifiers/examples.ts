console.log('Chapter 9 - Type Modifiers');
console.log('--------------------------');

function greetComedianSafely(name: unknown) {
  if (typeof name === "string") {
    // `name` has been narrowed to `string` here
    console.log(`Announcing ${name.toUpperCase()}!`);
  } else {
    console.log(`Well, I'm off`);
  }
}

function isNumberOrString(value: unknown): value is number | string {
  return ['number', 'string'].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    // `isNumberOrString` narrows `value` to `number | string`, so it's safe
    // to call `toString()`
    value.toString();
  } else {
    console.log("Value does not exist:", value);
  }
}

interface Ratings {
  audience: number;
  critic: number;
}

function getCountKeyOf(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key];
}

const ratings: Ratings = { audience: 66, critic: 84 };

console.log(getCountKeyOf(ratings, 'audience'));
console.log(getCountKeyOf(ratings, 'critic'));
// @ts-expect-error: Argument of type 'other' is not assignable to parameter of type `keyof Ratings`
console.log(getCountKeyOf(ratings, 'other'));

const original = {
  medium: "movie",
  title: "Mean Girls"
};

let adaptation: typeof original

function logRating(key: keyof typeof ratings) {
  console.log(ratings[key]);
}

logRating('critic');
