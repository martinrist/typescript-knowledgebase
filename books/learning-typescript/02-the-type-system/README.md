# Chapter 2 - The Type System

## Links

- [Chapter 2 Hub][ref-chapter02-hub]
- [Exercises - System of a Clown][ref-chapter02-exercises-system-of-a-clown]

## Notes

### Primitive Types

- TypeScript has similar primitive types to JavaScript:
  - `null`
  - `undefined`
  - `boolean` - `true` or `false`
  - `string` - `""`, `"hi!"`, `"1234"`
  - `number` - `0`, `2.1`, `-4`
  - `bigint` - `0n`, `2n`, `-4n`
  - `symbol` - `Symbol()`, `Symbol("hi")`


### Kinds of Errors

- Two main types of errors exist in TypeScript:
  - _Syntax errors_ - prevent TypeScript from being converted to JavaScript.
  - _Type errors_ - don't prevent JavaScript conversion, but may indicate issues
    that could cause runtime problems. 


### Assignability

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


### Type Annotations

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


### Type Shapes

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



<!-- References -->

[ref-chapter02-hub]: https://www.learningtypescript.com/the-type-system/
[ref-chapter02-exercises-system-of-a-clown]: https://www.learningtypescript.com/the-type-system/system-of-a-clown/
