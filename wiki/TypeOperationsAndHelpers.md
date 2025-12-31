# Type Operations & Helpers

## Contents
<!-- TOC -->
- [Type Operations \& Helpers](#type-operations--helpers)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Mapped Types](#mapped-types)
  - [Conditional Types](#conditional-types)
  - [Type Helpers](#type-helpers)
    - [`Pick`](#pick)
    - [`Omit`](#omit)
    - [Non-Distributivity of `Pick` and `Omit`](#non-distributivity-of-pick-and-omit)
    - [`Partial` and `Required`](#partial-and-required)
    - [`Readonly`](#readonly)
    - [`Parameters`, `ReturnType` and `Awaited`](#parameters-returntype-and-awaited)
  - [Indexed Access Types](#indexed-access-types)
  - [`never`](#never)
  - [Template Literal Types](#template-literal-types)
<!-- TOC -->

## Overview

- TypeScript contains powerful operations that can be applied to types, in
  order to define new types.

- All these operations exist _only_ at compile time - they all disappear at
  runtime.


## Mapped Types

- New types can be created based on the properties of another type - these
  are referred to as _mapped types_.

- Mapped types take in another type and perform some operation on each property
  of that type.

- Uses a syntax similar to index signatures, but instead of a static key type
  (like `[i: string]`), they use a computed type from the original type with
  `in`:

    ```typescript
    type NewType = {
        [K in OriginalType]: NewProperty;
    }
    ```

- Simplest example is to create a new type whose keys are each of the string
  literals in an existing union type, e.g.:

    ```typescript
    type Animals = 'alligator' | 'baboon' | 'cat';

    type AnimalCounts = {
        [K in Animals]: number;
    };

    const animalCounts: AnimalCounts = {
        alligator: 1,
        baboon: 2,
        cat: 3,
    }

    // @ts-expect-error: Property 'dog' does not exist in type 'AnimalCounts'
    animalCounts.dog = 4;
    ```

- An alternative is to use `keyof` to grab the keys of an existing type:

    ```typescript
    interface AnimalVariants {
        alligator: boolean;
        baboon: number;
        cat: string;
    }

    // This is equivalent to the definition above, but is based on an existing
    // type, rather than a union of the property names
    type AnimalCounts = {
        [K in keyof AnimalVariants]: number;
    };
    ```

- When using the `K in ...` syntax to assign an identifier to each key, then
  the members of the mapped type can refer to the original member using
  `OriginalType[K]`.  For example, this can be used to convert all the
  properties in a type to being nullable:

    ```typescript
    interface BirdVariants {
        dove: string;
        eagle: boolean;
    }

    // Equivalent to:
    // ```
    // {
    //     dove: string | null;
    //     eagle: boolean | null;
    // }
    // ```
    type NullableBirdVariants = {
        [K in keyof BirdVariants]: BirdVariants[K] | null;
    };
    ```

- Mapped types don't distinguish between the _method syntax_ and _property
  syntax_ for declaring interface members as functions - they treat functions
  declared with _method syntax_ as being properties on the original types:

    ```typescript
    interface Researcher {
        researchMethod(): void;
        researchProperty: () => string;
    }

    // Equivalent to:
    // ```
    // type ResearcherProperties = {
    //     researchMethod: () => void;
    //     researchProperty: () => string;
    // }
    // ```
    type ResearcherProperties = {
        [K in keyof Researcher]: Researcher[K];
    };
    ```

- Mapped types can change the `readonly` and `?` modifiers by adding them:, or
  removing them with `-readonly` / `-?`:

    ```typescript
    interface Environmentalist {
        area: string;
        name: string;
    }

    // Adding the `readonly` modifier
    type ReadonlyEnvironmentalist = {
        readonly [K in keyof Environmentalist]: Environmentalist[K];
    };

    // Adding the `?` optionality modifier
    type OptionalEnvironmentalist = {
        [K in keyof Environmentalist]?: Environmentalist[K];
    };

    interface Conservationist {
        name: string;
        catchphrase?: string;
        readonly born: number;
        readonly died?: number;
    }

    // Removing the `readonly` modifier
    type WriteableConservationist = {
        -readonly [K in keyof Conservationist]: Conservationist[K];
    };

    // Removing the `?` optionality modifier
    type AllRequiredConservationist = {
        [K in keyof Conservationist]-?: Conservationist[K];
    };
    ```

- Combining mapped types with generics gives _generic mapped types_, which
  allows a single mapped type to be reused across many types.  This allows
  many useful [Type Helpers](#type-helpers) to be created:

    ```typescript
    type MakeReadonly<T> = {
        readonly [K in keyof T]: T[K]
    }

    interface Species {
        genus: string;
        name: string;
    }

    type ReaonlySpecies = MakeReadonly<Species>;
    ```


## Conditional Types

- _Conditional types_ are types that resolve to one of two possible types,
  based on a check against an existing type.  It uses the syntax:

    ```typescript
    type ResultingType = LeftType extends RightType ? IfTrue : IfFalse;

    // exmaple - type: `false`
    type CheckStringAgainstNumber = string extends number ? true : false;
    ```

- Conditional types are able to check any type name in their scope, including
  a type parameter on the conditional type itself.  This allows writing
  reusable generic types, e.g.:

    ```typescript
    type CheckAgainstNumber<T> = T extends number ? true : false;

    // type: `false`
    type CheckString = CheckAgainstNumber<string>;

    // type: `true`
    type CheckNumber = CheckAgainstNumber<42>;

    // Turn a value into a function returning that value (or do nothing
    // if the supplied value is already a function)
    type CallableSetting<T> =
        T extends () => any
        ? T
        : () => T;

    // type: `() => number[]`
    type GetNumbersSetting = CallableSetting<() => number[]>;

    // type: `() => string`
    type StringSetting = CallableSetting<string>;
    ```

- Conditional types _distribute_ over unions, so the resulting type is a union
  of applying the conditional type to each constituent.  In other words,
  `ConditionalType<T | U> = ConditionalType<T> | ConditionalType<U>`

- Conditional types are able to access arbitrary portions of their condition
  using the `infer` keyword within their `extends` clause:

    ```typescript
    type ArrayItems<T> =
        // using `infer Item` allows us to refer to `Item` in the true case
        T extends (infer Item)[]
        ? Item
        : T;

    // A recursive version
    type ArrayItemsRecursive<T> =
        T extends (infer Item)[]
        ? ArrayItemsRecursive<Item>
        : T;
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


### `Parameters`, `ReturnType` and `Awaited`

- The `Parameters` type helper allows you to get the parameters of a function
  type, e.g.:

    ```typescript
    const makeQuery = (
        url: string,
        opts?: {
            method?: string;
            body?: string
        }
    ) => {};


    type MakeParameters = Parameters<typeof makeQuery>
    ```

- Similarly, `ReturnType` is a type helper that extracts the return type of a
  function type, e.g.:

    ```typescript
    const const createUser = (id: string) => {
        return {
            id,
            name: "John Doe",
            email: "example@email.com",
        };
    };

    type User = ReturnType<typeof createUser>;
    ```

- If the function is `async`, the return type will actually be a `Promise`.
  We can use `Awaited` to extract the actual return type:

    ```typescript
    const fetchUser = async (id: string) => {
        return {
            id,
            name: "John Doe",
            email: "example@email.com",
        };
    };

    type User = Awaited<ReturnType<typeof fetchUser>>;
    ```


## Indexed Access Types

- _Indexed Access Types_ allow us to use an expression to index into the types
  of properties in a type, e.g.:

    ```typescript
    export const programModeEnumMap = {
        GROUP: 'group',
        ANNOUNCEMENT: 'announcement',
        ONE_ON_ONE: '1on1',
    } as const;

    type ProgramModeMap = typeof programModeEnumMap;

    // `Group` is "group" - and always stays in sync with the value in `programModeEnumMap`
    type Group = ProgramModeMap['GROUP'];
    ```

- This can be useful for keeping types synchronised across different types -
  to establish single sources of truth.

- It's also possible to pass a union type as the index, e.g.:

    ```typescript
    type PlannedPrograms = ProgramModeMap['PLANNED_ONE_ON_ONE' | 'PLANNED_SELF_DIRECTED'];

    // the above is the same as the following, but more succinct
    type PlannedPrograms = ProgramModeMap['PLANNED_ONE_ON_ONE']
        | ProgramModeMap['PLANNED_SELF_DIRECTED'];
    ```

- It's also possible to pass in a `keyof` expression to extract a union of
  all the values from an object:

    ```typescript
    // This is `'group' | 'announcement' | '1on1'`
    type AllPrograms = ProgramModeMap[keyof ProgramModeMap];

    // same as above, just more condensed and idiomatic
    type AllPrograms = (typeof programModeMap)[keyof typeof programModeMap];
    ```

- If trying to do this from an array, we need to pass in `number`:

    ```typescript
    // Note that `programModes` is now an array, not an object
    export const programModes = [
        "group",
        "announcement",
        "1on1",
    ] as const;

    type AllPrograms = (typeof programModes)[number];
    ```

## `never`

- `never` is TypeScript's 'bottom' type - it can have no possible values and
  can't be reached.  It's a type that can't exist, which can give interesting
  behaviours with other type system features.

- `never` in an `&` intersection type reduces the whole intersection type to
  `never`, whereas `never` in a `|` union type is ignored:

    ```typescript
    // type: `never`
    type NeverIntersection = never & string;

    // type: `string`
    type NeverUnion = never | string;
    ```

- Generic conditional types commonly use `never` to filter out types from
  unions:

    ```typescript
    type OnlyStrings<T> = T extends string ? T : never;

    // type: `'red' | 'blue'`
    type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
    ```

- `never` is also commonly combined with inferred conditional types when making
  type utilities.  It's often put in the false case if this is never meant
  to be used, e.g.:

    ```typescript
    type FirstParameter<T extends (...args: any[]) => any> =
        T extends (arg: infer Arg) => any
            ? Arg
            : never;
    ```

- `never` can be used to filter out keys of an object using the following
  combination of features:
    - `never` is ignored in unions
    - Mapped types can map members of types
    - Conditional types can be used to turn types into `never` if a
        condition is met

- Example:

    ```typescript
    type OnlyStringProperties<T> = {
        [K in keyof T]: T[K] extends string ? K : never;
    }[keyof T];

    interface AllEventData {
        participants: string[];
        location: string;
        name: string;
        year: number;
    }

    type OnlyStringEventData = OnlyStringProperties<AllEventData>;
    ```


## Template Literal Types

- _Template literal types_ fall somewhere between the completely-flexible
  `string` type and literal types such as `''` and `'abc'`.  They allow a
  string-like type to follow a pattern, e.g.:

    ```typescript
    type Greeting = `Hello${string}`;

    const matches: Greeting = 'Hello, world!'; // OK

    const nonMatching: Greeting = 'hi'; // Error
    ```

- String literal types, and unions of them, can be used in the type
  interpolation instead of `${string}`:

    ```typescript
    type Brightness = 'dark' | 'light';
    type Colour = 'red' | 'blue';

    type BrightnessAndColour = `${Brightness}-${Colour}`;
    ```

- Other primitive types like `number`, `boolean` (but not `symbol`) can be used:

    ```typescript
    type ExtolNumber = `much ${number} wow`;
    ```

- TypeScript supplies a small number of intrinsic generic utility types to
  manipulate strings:
    - `Uppercase` - converts a string literal type to uppercase.
    - `Lowercase` - converts a string literal type to lowercase.
    - `Capitalize` - converts the first character of a string literal type to
        uppercase.
    - `Uncapitalize` - converts the first character of a string literal type to
        lowercase.

- Template literal types can be used wherever you can use string literals, e.g.
  as the index signature in a mapped type:

    ```typescript
    type DataKey = 'location' | 'name' | 'year';

    // Equivalent to:
    // {
    //   checkLocation: () => boolean;
    //   checkName: () => boolean;
    //   checkYear: () => boolean;
    // }
    type ExistenceChecks = {
        [K in `check${Capitalize<DataKey>}`]: () => boolean;
    }
    ```

- If we want to create new keys for members of mapped types, we can use
  template literal types with the `as` keyword:

    ```typescript
    interface DataEntry<T> {
        key: T;
        value: string
    }

    type DataKey = 'location' | 'name' | 'year';

    // Equivalent to:
    // {
    //   getLocation: () => DataEntry<'location'>;
    //   getName: () => DataEntry<'name'>;
    //   getYear: () => DataEntry<'year'>;
    // }
    type DataEntryGetters = {
        [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
    }
    ```


<!-- References -->
