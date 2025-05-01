# Functions

## Contents
<!-- TOC -->
- [Functions](#functions)
  - [Contents](#contents)
  - [JavaScript Fundamentals](#javascript-fundamentals)
    - [Overview](#overview)
    - [Defining Functions](#defining-functions)
    - [Invoking Functions](#invoking-functions)
    - [Function Arguments \& Parameters](#function-arguments--parameters)
    - [Functions as Values](#functions-as-values)
    - [Functions as Namespaces](#functions-as-namespaces)
    - [Closures](#closures)
    - [Function Properties \& Methods](#function-properties--methods)
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


### Defining Functions

- _Function declarations_ consist of the `function` keyword followed by:
    - An identifier that names the function - it is used as the name of a
      variable, and the newly-defined function is assigned to the variable.
    - A pair of parentheses around a comma-separated list of zero-or more
      identifiers, which are the parameter names for hte function.
    - A pair of curly-braces with one or more JavaScript statements - the _body_
      of the function.

- Function declaration statements are 'hoisted' to the top of the enclosing
  script, function or block, so that they can be invoked before declaration.

- In ES6 and later, function declarations are allowed within blocks and are
  visible only inside those blocks.

- _Function expressions_ are similar to function declarations but appear within
  the context of a larger expression or statement, and their name is optional:

    ```javascript
    const square = function(x) { return x * x; };

    // function expressions can include names for recursion
    const f = function fact(x) { if (x <= 1) return 1; else return x * fact(x-1); };

    // function expressions are sometimes immediately-invoked
    let tensquared = (function(x) { return x * x; })(10);
    ```

- Unlike function declarations, function expressions do not declare a variable -
  it's up to you to assign the newly-defined function to a variable.

- In ES6, a new compact syntax - _arrow functions_ can be used instead of
  the `function` keyword when defining function expressions, e.g.:

    ```javascript
    const sum = (x, y) => { return x + y; };

    // if the body is a single `return` statement, then `return` and the
    // braces can be omitted:
    const sum = (x, y) => x + y;
    ```

- Note that arrow functions inherit their invocation context (the value of
  `this`) from the environment in which they are defined, _not_ the one in
  which they are executed.

- Functions can be nested inside other functions, gaining access to the
  parameters and variables of the enclosing function:

    ```javascript
    function hypotenuse(a, b) {
        function square(x) { return x * x; }
        return Math.sqrt(square(a) + square(b));
    }
    ```

- Note, however, that nested functions do not inherit the invocation context
  of the outer function in which they are defined.  In the nested function,
  `this` is always `undefined`.



### Invoking Functions

- JavaScript functions can be invoked in five ways:
    - As functions.
    - As methods.
    - As constructors.
    - Indirectly, through their `call()` and `apply()` methods.
    - Implicitly, via language functions that don't appear like normal function
      invocations.

- Functions are invoked as functions or methods with an _invocation expression_,
  consisting of a function expression that evaluates to a function, followed by
  an open parenthesis, a comma-separated list of zero or more argument
  expressions and a close parenthesis:
    - In ES2020, you can insert `?.` after the function expression and before
      the opening parenthesis to invoke the function only if it is not `null`
      or `undefined` - e.g. `f?.(x)`.
    - If the function expression is a property-access expression then it is a
      _method invocation expression_ - e.g. `object.method(x, y)` or
      `object["method"](x, y)`.
    - For _method invocation_, the invocation context is the object on which
      the method was invoked.
    - For _function invocation_, the invocation context is `undefined`.

- If a function or method invocation is preceded by the `new` keyword, it is a
  _constructor invocation_:
    - Results in a new, empty object that inherits from the object specified
      by the _prototype_ property of the constructor.
    - The newly-created object is used as the invocation context, so the
      constructor function can use it as `this`.

- Since JavaScript functions are objects, they have methods, including:
    - `call()` - invokes function with its own argument list.
    - `apply()` - expects an array of arguments that it passes onto the
      function.

- Language features that implicitly invoke functions include:
    - Querying or setting values of object properties may invoke _getter_ or
      _setter_ methods for those properties.
    - When an object is used in a `string` context, its `toString()` method is
      invoked.  When used in a numeric context, its `valueOf()` method is
      invoked.
    - Various methods are called when looping over elements of an iterable
      object.
    - Tagged template literals are function invocations in disguise.
    - Proxy objects have their behaviour completely defined in terms of
      functions.


### Function Arguments & Parameters

- Plain JavaScript doesn't do any checking on the number or type of arguments
  supplied on function invocation, versus the parameter list in the Function
  definition.

- When a function is invoked with fewer arguments than declared parameters, the
  additional parameters are set to their default value - usually `undefined`:
    - Function definitions can be writtent so as to allow optional arguments,
      with default values being provided using the `|| defaultValue` idiom.
    - Make sure to keep the optional arguments at the end of the argument list.
    - ES6 and later permits the definition of a default value in the function
      signature, e.g. `function getPropertyNames(o, a = []) { ... }`.

- _Rest parameters_ enable writing functions that can be invoked with arbitrary
  lists of arguments, by specifying the rest parameter as the last parameter:

    ```javascript
    function max(first=-Infinity, ...rest) {
        let maxValue = first;
        for (let n of rest) {
            if n > maxValue {
                maxValue = n;
            }
        }
        return maxValue;
    }
    ```

- The _spread operator_ - `...` is used to unpack, or 'spread out' the elements
  of an array (or other iterable object) in a context where individual values
  are expected, e.g.:

    ```javascript
    const numbers = [5, 2, 10, -1, 5, 100, 20];
    Math.min(...numbers);
    ```



### Functions as Values

- In JavaScript, functions are first-class values that can be assigned to
  variables, or passing in function invocations as _higher-order functions_.

- The following function definition defines a function and assigns it to the
  variable `square`:

    ```javascript
    function square(x) { return x * x; }

    // The function referenced by `square` can now be assigned to `s`
    // and invoked through it:
    let s = square;
    s(4);
    ```

- Functions can be assigned to object properties - we refer to them as _methods_
  when we do this.

- Functions are a specialised kind of object, which means that they can have
  properties:
    - e.g. if a function needs a 'static' variable whose values persist across
      invocations, it's often convenient to use a function property



### Functions as Namespaces

- Variables declared within a function are not visible outside the function:
    - Functions are therefore sometimes used as a temporary namespace in which
      variables can be declared without cluttering the global namespace.


### Closures

- JavaScript uses _lexical scoping_ - functions are executed using the variable
  scope in effect when they were defined, not when they were invoked.

- The combination of a function object and its scope (a set of variable
  bindings) is called a _closure_.

- Technically, all JavaScript functions are closures, but most are invoked from
  the same scope as they are defined, so it doesn't really matter:
    - Closures become interesting when they are invoked from a different scope
      than the declaration scope.
    - This happens most often when a nested function object is returned from
      the function in which it was defined.

- For example, in the code below, the nested function `f` is defined in a scope
  where `scope` is bound to 'local scope', so this is what's returned by the
  call to `checkScope()()`, not 'global scope':

    ```javascript
    const scope = 'global scope';

    function checkScope() {
        const scope = 'local scope';
        function f() { return scope; }
        return f;
    }

    const s = checkScope()();
    ```


### Function Properties & Methods

- Functions have various properties:
    - `length` - specifies the _arity_ of the function - the number of
      parameters it declares in its parameter list.
    - `name` - the name used when the function was declared.
    - `prototype` (not for arrow functions)

- There are two common methods that allow indirectly invoking functions:
    - `f.call(o)` - invoke the function `f` with `o` as the invocation context.
      Arguments after `o` are passed as-is to `f`.
    - `f.apply(o)` - invoke the function `f` with `o` as the invocation context.
      Contents of the array argument after `o` are unwrapped and passed to `f`.

- `bind()` is used to _bind_ a function to an object - `f.bind(o)` returns a
  new function - invoking this invokes the original function `f` as if it
  were a emthod of `o`:
    - Can also pass extra parameters to `bind()` which are then _partially
      applied_:

        ```javascript
        const sum = (x, y) => x + y;
        const succ = sum.bind(null, 1);
        succ(2);                         // => 3
        ```



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
