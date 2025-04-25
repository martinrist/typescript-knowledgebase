# Functions

## Contents
<!-- TOC -->
- [Functions](#functions)
  - [Contents](#contents)
  - [JavaScript Fundamentals](#javascript-fundamentals)
    - [Overview](#overview)
    - [Defining Functions (§8.1)](#defining-functions-81)
    - [Invoking Functions (§8.2)](#invoking-functions-82)
    - [Function Arguments \& Parameters (§8.3)](#function-arguments--parameters-83)
    - [Functions as Values (§8.4)](#functions-as-values-84)
    - [Functions as Namespaces (§8.5)](#functions-as-namespaces-85)
    - [Function Properties, Methods \& Constructor (§8.7)](#function-properties-methods--constructor-87)
    - [Functional Programming (§8.8)](#functional-programming-88)
  - [Typing Function Parameters](#typing-function-parameters)
  - [Return Types](#return-types)
  - [Function Types](#function-types)
  - [Function Overloads](#function-overloads)
<!-- TOC -->


## JavaScript Fundamentals

### Overview

- A _function_ is ablock of code that is defined once but may be _invoked_ any
  number of times:
    - Function definitions define _parameters_ that work as local variables in
      the function body.
    - Function invocations provide _arguments_ for the function's parameters.
    - Each invocation also has an _invocation_ context - the values of the
      `this` keyword in the function body.

- Functions that are assinged to a property of an object are known as _methods_:
    - When a function is invoked on or through and object, that object is the
      invocation context.


### Defining Functions (§8.1)

*TODO: Complete section*


### Invoking Functions (§8.2)

*TODO: Complete section*


### Function Arguments & Parameters (§8.3)

*TODO: Complete section*


### Functions as Values (§8.4)

*TODO: Complete section*


### Functions as Namespaces (§8.5)

*TODO: Complete section*


### Closures (§8.6)

*TODO: Complete section*


### Function Properties, Methods & Constructor (§8.7)

*TODO: Complete section*


### Functional Programming (§8.8)

*TODO: Complete section*



## Typing Function Parameters

- Like variables, TypeScript allows types of function parameters to be declared
  with a type annotation:

    ```typescript
    function sing(song: string) {
      console.log(`Singing: ${song}!`);
    }
    ```

- Unlike JavaScript, TypeScript requires the number of arguments in a function
  call to match the number of parameters in the function declaration.

- To specify optional arguments, add a `?` before the `:` in the type
  annotation.  These parameters don't have to be provided to function calls and
  their types therefore have an implicit `| undefined` added as a union type:

    ```typescript
    function announceSong(song: string, singer?: string) {
      console.log(`Song: ${song}`);

      // At this point, `singer` is of type `string | undefined`
      if (singer) {
        // Here, `singer` has been narrowed to `string`
        console.log(`Singer: ${singer}`);
      }
    }

    announceSong("Greensleeves");
    announceSong("Chandelier", "Sia");
    ```

- Optional parameters must be the last parameters in the function signature.

- Optional parameters may be given a default value with a `=` and value in their
  declaration.  These parameters don't have the implicit `| undefined` union
  added:

    ```typescript
    function rateSong(song: string, rating = 0) {
      console.log(`${song} gets ${rating}/5 stars!`);
    }

    rateSong("Photograph");
    rateSong("Set Fire to the Rain", 5);
    ```

- The `...` spread operator may be placed on the last parameter in a function
  declaration to indicate _rest_ arguments passed to the function that should be
  stored in a single array:

    ```typescript
    function singAllTheSongs(singer: string, ...songs: string[]) {
      for (const song of songs) {
        console.log(`${song}, by ${singer}`);
      }
    }

    singAllTheSongs("Alicia Keys");
    singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");
    ```


## Return Types

- If TypeScript knows all the possible return values from a function, it can
  infer the return type of the function:

- If a function contains multiple return statements with different values, the
  return type is a union of the possible types:

    ```typescript
    // `getStringOrNumber` has return type `string | number`
    function getStringOrNumber() {
      const random = Math.random();
      if (random) {
        return random.toString();
      } else {
        return random;
      }
    }
    ```

- The return type can be explicitly declared in cases where it might be useful,
  e.g.:
    - Enforce functions with many `return` statements to always return the same
      type.
    - In recursive functions, where TypeScript may struggle to infer the return
      type.
    - To speed up type checking in large projects.

- Example:

    ```typescript
    function singsongsrecursive(songs: string[], count = 0): number {
      return songs.length ? singsongsrecursive(songs.slice(1), count + 1): count;
    }
    ```

- `void` is a return type that indicates a function doesn't return a value - it
  contains either no `return` statements, or just `return` statements without
  values:
    - `void` isn't the same as `undefined` - `void` means the return type of the
      function will be ignored, whereas `undefined` is a literal value to be
      returned.

- `never` is a return type that indicates that the function isn't supposed to
  return at all:

    ```typescript
    function fail(message: string): never {
        throw new Error(`Invariant failure: ${message}.`);
    }
    ```


## Function Types

- Since functions can be used as first-class values, we need a way to declare
  the type of a variable that contains a function.

- The type of a function looks like an arrow function, but with the return type
  instead of the body.  Note in particular the use of parentheses to determine
  precedence:

    ```typescript
    let nothingInReturnsString: () => string;

    let inputAndOutput: (songs: string[], count?: number) => number;

    // Type is a function that returns a union
    let returnsStringOrUndefined: () => string | undefined;

    // Type is either `undefined` or a function that returns a string
    let maybeReturnsString: (() => string) | undefined;
    ```

- Type aliases can also be used for function types:

    ```typescript
    type StringToNumber = (input: string) => number;

    let stringToNumber: StringToNumber;

    stringToNumber = (input) => input.length;
    ```


## Function Overloads

- TypeScript allows _function overloading_ by declaring multiple versions of the
  function's name, parameters and return ttypes before a final _implementation
  signature_ and the function body:

    ```typescript
    function createDate(timestamp: number): Date;
    function createDate(month: number, day: number, year: number): Date;
    function createDate(monthOrTimestamp: number, day?: number, year?: number) {
      return day === undefined || year === undefined
        ? new Date(monthOrTimestamp)
        : new Date(year, monthOrTimestamp, day);
    }

    console.log(createDate(554356800));
    console.log(createDate(7, 27, 1987));
    ```

- The _implementation signature_ is what the function implementation uses for
  parameter types and return type:
    - Therefore each parameter in each _overload signature_ needs to be
      assignable to the parameter in the same index in the _imlemenation
      signature_.
    - Each overload signature's return type must also be assignable to the
      implementation signature return type.


<!-- References -->
