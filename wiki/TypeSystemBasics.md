# Type System Basics

## Contents
<!-- TOC -->
- [Type System Basics](#type-system-basics)
  - [Contents](#contents)
  - [Primitive Types](#primitive-types)
  - [Kinds of Errors](#kinds-of-errors)
  - [Assignability](#assignability)
  - [Type Annotations](#type-annotations)
  - [Type Shapes](#type-shapes)
  - [Union Types](#union-types)
  - [Narrowing](#narrowing)
  - [Literal Types](#literal-types)
  - [Strict Null Checking](#strict-null-checking)
  - [Type Aliases](#type-aliases)
  - [Top Types - `any` \& `unknown`](#top-types---any--unknown)
  - [`never` - the Bottom Type](#never---the-bottom-type)
<!-- TOC -->


## Primitive Types

- TypeScript has similar primitive types to JavaScript:
    - `null`
    - `undefined`
    - `boolean` - `true` or `false`
    - `string` - `""`, `"hi!"`, `"1234"`
    - `number` - `0`, `2.1`, `-4`
    - `bigint` - `0n`, `2n`, `-4n`
    - `symbol` - `Symbol()`, `Symbol("hi")`


## Kinds of Errors

- Two main types of errors exist in TypeScript:
    - _Syntax errors_ - prevent TypeScript from being converted to JavaScript.
    - _Type errors_ - don't prevent JavaScript conversion, but may indicate
      issues that could cause runtime problems.


## Assignability

- TypeScript reads the initial values of variables to determine their type if it
  isn't explicitly specified.

- If there's a later assignment to a different value, TypeScript will check that
  the new value type is the same as the original type, e.g.:

    ```typescript
    let firstName = "Carole";

      // This is fine
    firstName = "Joan";

    // This isn't, and will produce a type error
    lastName = true;
    // Error: Type 'boolean' is not assignable to type 'string'
    ```

- This checking of whether a value is allowed to be provided to a function call
  or variable is called _assignability_.


## Type Annotations

- If a variable doesn't have an initial value, it'll implicitly be the `any`
  type.

- This is called an _evolving any_ - TypeScript will evolve its understanding of
  the type as new values are assigned to it, e.g.:

    ```typescript
    let rocker;            // Type: any
    rocker.toUpperCase()   // OK

    rocker = "Joan Jett";  // Type: string
    rocker.toUpperCase();  // OK

    rocker = 19.58;        // Type: number (reassignment is ok)
    rocker.toUpperCase();  // Error: 'toUpperCase' does not exist on type 'number'
    ```

- Use of _evolving any_, and the `any` type in general, is discouraged.

- Type annotations prevent the use of _evolving any_, e.g.:

    ```typescript
    let rocker: string;    // Type: string
    rocker = "Joan Jett";
    rocker.toUpperCase();  // OK

    rocker = 19.58;        // Error: Type 'number' is not assignable t otype 'string'
    ```

- None of the type annotations get emitted into JavaScript - they are only used
  for type checking by `tsc`.

- Type annotations need not be added when a variable has an initial value that
  determines the type.


## Type Shapes

- As well as checking assignability, TypeScript knows what member properties
  exist on objects - i.e. the _type shape_, e.g.:

    ```typescript
    let rapper = "Queen Latifah";   // type: string
    rapper.length;                  // OK

    rapper.push('!');               // Error: Property 'push' does not exist on type 'string'
    ```

- This also works for objects:

    ```typescript
    let cher = {
        firstName: "Cherilyn",
        lastName: "Sarkisian"
    }

    cher.middleName;               // Error: Propery 'middleName' does not exist on type...
    ```


## Union Types

- Types that can be _either_ one thing _or_ another are called _Union Types_,
  denoted via the pipe operator `|`:

    ```typescript
    // `mathematician` is a union type - `string | undefined`
    let mathematician = Math.random() > 0.5
      ? undefined
      : "Georg Cantor"
    ```

- When a value is known to be a union type, you can only access member
  properties that exist on _all_ possible types in the union

    ```typescript
    // physicist: string | number
    let physicist = Math.random() > 0.5
      ? "Marie Curie"
      : 84;

    // OK - `toString` exists on both `string` and `number`
    physicist.toString();

    // Error - `toUpperCase` does not exist on type `number`
    physicist.toUpperCase();
    ```


## Narrowing

- To use a property of union type that only exists on a subset of the allowable
  types, you need to indicate that the value at that location is one of the
  more specific types - a process called _narrowing_.

- _Assignment narrowing_ is where you directly assign a value to a variable, at
  which point TypeScript narrows the variable's type to that value's type:

    ```typescript
    let admiral: number | string;
    admiral = "Grace Hopper";

    // OK - `admiral` has been narrowed to `string` and `toUpperCase` exists
    // on `string`
    admiral.toUpperCase();

    // Error: `toFixed` does not exist on type `string`
    admiral.toFixed();

    // Reassigning narrows `admiral` to `number`, so we can call `toFixed`
    admiral = 42;
    admiral.toFixed(2))
    ```

- _Conditional Checks_ allow TypeScript to narrow a variable's value by writing
  an `if` statement to check the variable for a value of a known type:

    ```typescript
    // scientist: number | string
    let scientist = Math.random() > 0.5
      ? "Rosalind Franklin"
      : 51;

    if (scientist === "Rosalind Franklin") {
      // OK - here TypeScript knows `scientist` is of type `string`
      scientist.toUpperCase()
    }
    ```

- _Typeof Checks_ use the `typeof` operator to narrow variable types:

    ```typescript
    // scientist: number | string
    let scientist = Math.random() > 0.5
      ? "Rosalind Franklin"
      : 51;

    if (typeof scientist === "string") {
      // OK - here TypeScript knows `scientist` is of type `string`
      scientist.toUpperCase()
    };

    // This can also be done with the ternary operator
    typeof scientist === "string"
      ? scientist.toUpperCase()
      : scientist.toFixed()
    ```

- Need to be careful when narrowing across scopes - type narrowing done in a
  wider scope sometimes doesn't transfer down to lower scopes (e.g. down to
  closures inside calls to `filter()`):
    - In cases like this, try assigning the narrowed property to a variable in
      the wider scope.


## Literal Types

- _Literal Types_ are more specific versions of primitive types.  A literal
  type is known to be a specific value of a primitive, rather than all the
  possible values of that primitive.

- Declaring a variable as `const` and giving it a literal value infers the
  variable to be that literal value as a type:

    ```typescript
    // `einstein` has the literal type "Albert Einstein"
    const einstein = "Albert Einstein";
    ```

- Using `let` and declaring a variable as a literal type means that other
  literal values are not assignable to it:

    ```typescript
    let specificallyAda: "Ada";

    // OK - the literal matches the literal type
    specificallyAda = "Ada";

    // Error - type "Byron" is not assignable to type "Ada"
    specificallyAda = "Byron";
    ```


## Strict Null Checking

- TypeScript can enforce _strict null checking_, where the assignments like the
  following are forbidden (assuming `strict` or `strictNullChecks` is `true`
  in `tsconfig.json`):

    ```typescript
    // Error: type `null` is not assignable to type `string`
    const firstName: string = null;

    // Error: type `undefined` is not assignable to type `string`
    const lastName: string = undefined;
    ```


## Type Aliases

- _Type aliases_ allow a shorter name to be specified for reused types:

    ```typescript
    type RawData = boolean | number | string | null | undefined;

    let rawData1: RawData;
    let rawData2: RawData;
    let rawData3: RawData;
    ```

- Type aliases are not compiled to output JavaScript - they only exist in the
  TypeScript type system.

- Type aliases can reference other aliases:

    ```typescript
    type Id = number | string;

    // Equivalent to `number | string | undefined | null`
    type IdMaybe = Id | undefined | null;
    ```


## Top Types - `any` & `unknown`

- A _top type_ or _universal type_ is a type that can represent any possible
  value in a type system.

- The `any` type can act as a top type - any type can be provided to a location
  of type `any`.  However, no type checking is performed on that value's
  assignability or members.

- To indicate that a value can be anything, the `unknown` type is much safer.
  TypeScript is much more restrictive about values of type `unknown` than it is
  with the `any` type:
    - TypeScript does not allow directly accessing properties of `unknown`-typed
      values.
    - `unknown` is not assignable to types that aren't top types (`any` or
      `unknown`).

- The way to access members on a variable of type `unknown` is to narrow the
  value's type, e.g. by using `instanceof`, `typeof` or with a type assertion:

    ```typescript
    function greetComedianSafely(name: unknown) {
      if (typeof name === "string") {
        // `name` has been narrowed to `string` here
        console.log(`Announcing ${name.toUpperCase()}!`);
      } else {
        console.log(`Well, I'm off`);
      }
    }
    ```


## `never` - the Bottom Type

- `never` is the type that represents something that can never happen, such as
  a function that will never return:

    ```typescript
    // This is of type: () => never
    const getNever = () => {
        throw new Error('This function never returns!');
    }
    ```

- `never` is known as the 'bottom' type (as opposed to `unknown` as the top
  type):
    - So, `never` can be assigned to anything.
    - But nothing can be assigned to a reference of type `never`.


<!-- References -->
