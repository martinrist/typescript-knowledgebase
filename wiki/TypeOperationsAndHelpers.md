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

- TODO: Complete section


## Mapped Types

- TODO: Complete section


## Conditional Types

- TODO: Complete section


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

- TODO: Complete section


## Template Literal Types

- TODO: Complete section


<!-- References -->
