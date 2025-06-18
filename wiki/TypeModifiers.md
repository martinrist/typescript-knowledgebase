# Type Modifiers

## Contents
<!-- TOC -->
- [Type Modifiers](#type-modifiers)
  - [Contents](#contents)
  - [Type Predicates](#type-predicates)
  - [Type Operators](#type-operators)
  - [Type Assertions](#type-assertions)
  - [Const Assertions](#const-assertions)
<!-- TOC -->


## Type Predicates

- Simple constructs such as `instanceof` and `typeof` checks can be used to
  narrow types, but it gets lost if the logic is wrapped in a function:

    ```typescript
    function isNumberOrString(value: unknown) {
      return ['number', 'string'].includes(typeof value);
    }

    function logValueIfExists(value: number | string | null | undefined) {
      if (isNumberOrString(value)) {
        // `isNumberOrString` only does the check, it doesn't narrow the type of `value`
        // @ts-expect-error: 'value' is possibly 'null' or 'undefined'.
        value.toString();
      } else {
        console.log("Value does not exist:", value);
      }
    }
    ```

- _Type predicates_ (sometimes also known as _user-defined type guards_)
  indicate that the input type of a function is a more specific type than that
  declared for the parameter:

    ```typescript
    function typePredicate(input: WideType): input is NarrowType;
    ```

- In the earlier example, using a `value is number | string` predicate for
  `isNumberOrString()` means that narrowing is performed on `value` in addition
  to the check:

    ```typescript
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
    ```


## Type Operators

- Sometimes it is necessary to create a new type that performs some
  transformation on an existing type.  These are created using _type operators_.

- `keyof` is a type operator that takes an existing type and gives back a
  union of all the keys allowed on the type:

    ```typescript
    interface Ratings {
      audience: number;
      critic: number;
    }

    // Here `keyof Ratings` is equivalent to the union type 'audience' | 'critic'
    function getCountKeyOf(ratings: Ratings, key: keyof Ratings): number {
      return ratings[key];
    }

    const ratings: Ratings = { audience: 66, critic: 84 };

    console.log(getCountKeyOf(ratings, 'audience'));
    console.log(getCountKeyOf(ratings, 'critic'));
    // @ts-expect-error: Argument of type 'other' is not assignable to parameter of type `keyof Ratings`
    console.log(getCountKeyOf(ratings, 'other'));
    ```

- `typeof` gives back the type of a provided value, which can be useful if
  the type would be annoying to write out manually:

    ```typescript
    const original = {
      medium: "movie",
      title: "Mean Girls"
    };

    let adaptation: typeof original
    ```

- Note that, although `typeof` as a type operator looks like the _runtime_
  `typeof` operator used to return a string description of a value's type.
  The type operator version only applies in the type system and is therefore
  removed from compiled code.

- Chaining `keyof typeof` together retrieves the allowed keys on a type
  given a value:

    ```typescript
    function logRating(key: keyof typeof ratings) {
      console.log(ratings[key]);
    }

    logRating('critic');
    ```


## Type Assertions

- In some cases, we need to manually override the type system's
  understanding of a value, by providing a _type assertion_ (also known as a
  _type cast_):

    ```typescript
    const rawData = `["grace", "frankie"]`;

    // Type: any
    JSON.parse(rawData);

    // Type: string[]
    JSON.parse(rawData) as string[];

    // Type: [string, string]
    JSON.parse(rawData) as [string, string];

    // Type: ["grace", "frankie"]
    JSON.parse(rawData) as ["grace", "frankie"];
    ```

- Best practice is generally to avoid type assertions where possible.

- Another common use case for type assertions is to remove `null` and / or
  `undefined` from a variable that only theoretically (not practically)
  might include them.  A `!` after the variable signifies this:

    ```typescript
    // Inferred type: Date | undefined
    let maybeDate = Math.random() > 0.5
      ? undefined
      : new Date();

    // Asserted type: Date
    maybeDate as Date;

    // Asserted type: Date (shorthand)
    maybeDate!;
    ```


## Const Assertions

- _Const assertions_ can be used to indicate that any value should be
  treated as the constant, immutable version of itself:
    - Arrays are treated as `readonly` tuples, not mutable arrays.
    - Literals are treated as literals, not their general primitive equivalents.
    - Properties on objects are considered `readonly`


<!-- References -->
