# Type Modifiers & Helpers

## Contents
<!-- TOC -->
- [Type Modifiers \& Helpers](#type-modifiers--helpers)
  - [Contents](#contents)
  - [Type Predicates](#type-predicates)
  - [Type Operators](#type-operators)
  - [Type Assertions](#type-assertions)
  - [Const Assertions](#const-assertions)
  - [The `readonly` Modifier](#the-readonly-modifier)
  - [Type Helpers](#type-helpers)
    - [`Pick`](#pick)
    - [`Omit`](#omit)
    - [Non-Distributivity of `Pick` and `Omit`](#non-distributivity-of-pick-and-omit)
    - [`Partial` and `Required`](#partial-and-required)
    - [`Readonly`](#readonly)
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


## The `readonly` Modifier

- In a type or interface, the `readonly` modifier can be used to indicate that,
  once set, the property cannot be set to a different value:

    ```typescript
    interface Page {
      readonly text: string;
    }

    function read(page: Page) {
      // OK - reading
      console.log(page.text);

      // Error - cannot assign to 'text' because it is a read-only property
      // page.text += "!";
    }
    ```

- `readonly` can also be applied to function parameters of array or tuple type.
  When used like this, the modifier denotes that mutating operations cannot be
  performed on the array or tuple, e.g.:

    ```typescript
    function printNames(names: readonly string[]) {
        // @ts-expect-error
        names.push('Another name');

        // @ts-expect-erropr
        names[0] = 'Billy';
    }
    ```

- Note that _mutable_ arrays are assignable to `readonly` arrays, but not the
  other way around:

    ```typescript
    function printNamesReadonly(names: readonly string[]) {
        // implementation omitted
    }

    function printNamesMutable(names: string[]) {
        // implementation omitted
    }

    const mutableNames = ['Alice', 'Bob', 'Carol'];
    const readonlyNames = ['Alice', 'Bob', 'Carol'] as const;

    // Mutable arrays assignable to readonly arrays
    printNamesReadonly(mutableNames);
    printNamesMutable(mutableNames);

    // Reaonly arrays only assignable to readonly arrays
    printNamesReadonly(readonlyNames);
    // @ts-expect-error
    printNamesMutable(mutableNames);
    ```

- The `readonly` modifier can also be applied to tuples:

    ```typescript
    type Coordinate = readonly [number, number];
    const point: Coordinate = [0, 0];
    ```


## Type Helpers

### `Pick`

- Sometimes we want to express a new type based on selecting (or picking) only
  certain properties from an existing type.  This can be done with the `Pick`
  type helper:

    ```typescript
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    const fetchUser = async (): Promise<User> => {
        // implementation omitted
    }

    interface PickedUser = Pick<User, 'id' | 'name'>

    const fetchOnlyIdAndName = async (): Promise<PickedUser> => {
        // implementation omitted
    }
    ```


### `Omit`

- The `Omit` type helper is the opposite of `Pick` - it creates a new type by
  excluding (or omitting) certain properties from an existing type:

    ```typescript
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    interface OmittedUser = Omit<User, 'email' | 'role'>

    const fetchUserWithoutSensitiveData = async (): Promise<OmittedUser> => {
        // implementation omitted
    }
    ```

- In this example, `OmittedUser` will have the same properties as `User` except
  for `email` and `role`, resulting in a type equivalent to:
  `{ id: string; name: string; }`.

- One quirk of `Omit` is that it's possible to omit properties that don't
  exist on the base type.  However, for `Pick`, the picked properties _must_
  exist.


### Non-Distributivity of `Pick` and `Omit`

- Note that neither `Pick` nor `Omit` are _distributive_ - i.e. when used on
  union types, the `Pick` / `Omit` doesn't go into the union members, e.g.:

    ```typescript
    type User = {
        id: string;
        name: string;
        age: number;
        imageId: string;
    };

    type Organisation = {
        id: string;
        name: string;
        address: string;
        imageId: string;
    };

    type Product = {
        id: string;
        name: string;
        price: number;
        imageId: string;
    };

    type Entity = User | Organisation | Product

    // We want this to be `Omit<User, 'id'> | Omit<Organisation, 'id'> | Omit<Product, 'id'>`
    // but actually it's `{ name: string, imageId: string }` - i.e. only the
    // shared properties.
    type EntityWithoutId = DistributiveOmit<Entity, 'id'>
    ```

- To get this behaving as expected, we need to define `DistributivePick` and
  `DistributiveOmit` helpers as follows:

    ```typescript
    type DistributivePick<T, K extends PropertyKey> = T extends any
        ? Pick<T, K>
        : never;

    type DistributiveOmit<T, K extends PropertyKey> = T extends any
        ? Omit<T, K>
        : never;
    ```


### `Partial` and `Required`

- The `Partial` type helper allows us to convert a type or interface into another
  where all the properties are optional:

    ```typescript
    interface Product {
        id: number;
        name: string;
        price: number;
        description: string;
    }

    type PartialProduct = Partial<Product>

    // The type of `PartialProduct` is now:
    // `{
    //     id?: number | undefined;
    //     name?: string | undefined;
    //     price?: number | undefined;
    //     description?: string | undefined;
    //  }`
    ```

- The opposite of `Partial` is `Required`, which turns all optional properties
  into required properties.


### `Readonly`

- The `Readonly` type helper can be used to add a `readonly` modifier to the
  start of all properties in a type, e.g.:

    ```typescript
    type SearchParams = {
        q?: string;
        page?: number;
        pageSize?: number;
    };

    function handleSearchParams(search: Readonly<SearchParams>) {
        // @ts-expect-error Should not be able to modify readonly properties
        search.q = 'test';
    }
    ```

- Note that `Readonly` only applies one level deep - it doesn't apply
  recursively to properties of types of properties.

- An alternative is to use the `as const` annotation on a value.  As described
  in ['Const assertions'](#const-assertions) above, this makes all the
  properties read-only, but also narrows their types to literals.

    ```typescript
    // Both cancel.type and confirm.type are `readonly`
    const buttonAttributes = {
        cancel: {
            type: "button",
        },
        confirm: {
            type: "button",
        },
    } as const;
    ```

<!-- References -->
