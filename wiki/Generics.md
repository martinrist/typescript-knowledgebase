# Generics

## Contents
<!-- TOC -->
- [Generics](#generics)
  - [Contents](#contents)
  - [Generic Functions](#generic-functions)
  - [Generic Interfaces](#generic-interfaces)
  - [Generic Classes](#generic-classes)
  - [Generic Type Aliases](#generic-type-aliases)
  - [Generic Modifiers](#generic-modifiers)
  - [Constrained Generic Types](#constrained-generic-types)
  - [Promises](#promises)
<!-- TOC -->


## Generic Functions

- Constructs such as functions may declare any number of generic _type
  parameters_ that are determined for each use of the generic construct.
  For functions, type parameters are declared before the parameters
  parentheses:

    ```typescript
    function identity<T>(input: T) {
      return input;
    }

    const myString = identity("me");      // Type: "me"
    const myNumber = identity(123);       // Type: 123
    ```

- Arrow functions can also be generic - their type parameter is also
  declared just before the parameter parentheses:

    ```typescript
    const identity = <T>(input: T) => input;
    ```

- Most of the time when calling generic functions, TypeScript will be able
  to infer type arguments based on how the function is called:
    - In some cases, this isn't possible.  TypeScript will then infer
      `unknown` for any type argument that it can't infer.
    - To avoid this, use a type parameter at the call site to explicitly
      declare the value for the type parameter.

- Functions may define any number of type parameters:

    ```typescript
    function makeTuple<First, Second>(first: First, second: Second) {
      return [first, second] as const;
    }
    ```


## Generic Interfaces

- Interfaces may also be declared as generic, following similar rules to
  functions:

    ```typescript
    interface Box<T> {
      inside: T;
    }

    let stringBox: Box<string> = {
      inside: "abc"
    };
    ```

- As with generic functions, generic interface type arguments may be
  inferred from usage.


## Generic Classes

- Classes, like interfaces, can also declare any number of type parameters
  to be later used on members:

    ```typescript
    class Secret<Key, Value> {
      key: Key;
      value: Value;

      constructor(key: Key, value: Value) {
        this.key = key;
        this.value = value;
      }

      getValue(key: Key): Value | undefined {
        return this.key === key ? this.value : undefined;
      }
    }
    ```

- Instantiating generic classes follows the same rules as calling generic
  functions - if the types can be inferred, they will, otherwise the type
  argument will default to `unknown`.

- Generic classes can extend base classes as with normal classes.  The
  `extends` clause may provide concrete values for type parameters, or pass
  their own type arguments through to the base class:

    ```typescript
    class Quote<T> { ... }

    class SpokenQuote extends Quote<string[]> {
      // `SpokenQuote` has no type parameters
    }

    class AttributedQuote<Value> extends Quote<Value> {
      // `AttributedQuote` has a type parameter `Value` which it shares
      // with `Quote`
    }
    ```

- Generic classes may also implement generic interfaces by providing any
  necessary type parameters (or passing their own through):

    ```typescript
    interface ActingCredit<Role> {
      role: Role
    }

    class MoviePart implements ActingCredit<string> {
      role: string;
    }

    class GenericMoviePart<Role> implements ActingCredit<Role> {
      role: Role;
    }
    ```

- Class methods may also declare their own generic type parameters separate
  from their class instance.

- Static members of a class are separate from instance methods, and aren't
  associated with a class instance, so they don't have access to type
  information that's specific to class instance:
    - Therefore, although they _can_ declare their own type parameters, they
      can't access type parameters declared on the class.


## Generic Type Aliases

- Type aliases may also be made generic with type arguments:

    ```typescript
    type Nullish<T> = T | null | undefined;
    ```

- Generic type aliases are often used with generic functions to describe the
  type of a generic function:

    ```typescript
    type CreatesValue<Input, Output> = (input: Input) => Output;
    let creator: CreatesValue<string, number> = text => text.length;
    ```

- Generic discriminated unions can be used to elegantly model a generic
  'result' type that denotes either a successful result with data or a
  failure with an error:

    ```typescript
    type Result<Data> = FailureResult | SuccessfulResult<Data>;

    interface FailureResult {
      error: Error;
      succeeded: false;
    }

    interface SuccessfulResult<Data> {
      data: Data;
      succeeded: true;
    }

    function handleResult(result: Result<string>) {
      if (result.succeeded) {
        // result: SuccessfulResult<string>
        console.log(`We did it! ${result.data}`);
      } else {
        // result: FailureResult
        console.error(`Awww... ${result.error}`);
      }
    }
    ```


## Generic Modifiers

- TypeScript includes syntax that allows you to modify the behaviour of
  generic type parameters.

- Type parameters can be given default values to be used (instead of
  `unknown`) if the type argument isn't provided at the call site and can't
  be otherwise inferred:

    ```typescript
    interface Quote<T = string> {
      value: T;
    }

    // Type parameters can default to earlier parameters in the same declaration
    interface KeyValuePair<Key, Value = Key> {
      key: Key;
      value: Value;
    }
    ```

- As with default function parameter values, default type parameters must
  come last in their declaration list.


## Constrained Generic Types

- TypeScript allows for a type parameter to declare itself as needing to
  _extend_ a type, meaning it's only allowed to alias types that are
  assignable to that type.

- This can be done by placing the `extends` keyword after the type
  parameter's name, followed by the type to constrain it to:

    ```typescript
    interface WithLength {
      length: number;
    }

    function logWithLength<T extends WithLength>(input: T) {
      console.log(`Length: ${input.length}`);
      return input;
    }
    ```

- The `keyof` operator also works well with constrained type parameters - it
  allows a type parameter to be constrained to the keys of a previous type
  parameter:

    ```typescript
    function get<T, Key extends keyof T>(container: T, key: Key) {
      return container[key];
    }

    const roles = {
      favorite: "Fargo",
      others: ["Almost Famous", "Burn After Reading", "Nomadland"]
    }

    const favorite = get(roles, "favorite");  // Type: string
    const others = get(roles, "others");      // Type: string[]
    ```


## Promises

- Promises are represented in the TypeScript type system as a generic
  `Promise<Value>` class.

- Creating a Promise intended to resolve with a value requires us to
  explicitly declare the type argument of the Promise in order to prevent
  TypeScript from defaulting to `unknown`:

    ```typescript
    // resolvesToUnknown: Promise<unknown>
    const resolvesToUnknown = new Promise((resolve) => {
      setTimeout(() => resolve("Done!"), 1000);
    });

    // resolvesToString: Promise<string>
    const resolvesToString = new Promise<string>((resolve) => {
      setTimeout(() => resolve("Done!"), 1000);
    });
    ```

- Functions declared as `async` return a `Promise`:

    ```typescript
    // lengthAfterSecond: (string) => Promise<number>
    async function lengthAfterSecond(text: string) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return text.length;
    }
    ```


<!-- References -->
