# Chapter 6 - Arrays

## Links

- [Chapter 6 Hub][ref-chapter06-hub]
- [Exercises - Analyzing DNA][ref-chapter06-exercises-analyzing-dna]
- [Exercises - Structural Kitchen][ref-chapter06-exercises-text-processor]


## Notes

### Array Types & Member Access

- JavaScript arrays are heterogeneous by default.  In TypeScript, heterogeneous
  arrays can be declared, but they are technically arrays of a single type - the
  union type of all the element types:

    ```typescript
    // `elements` is of type `(number | boolean | undefined | null)[]`
    const elements = [true, null, undefined, 42];

    // Here, TypeScript infers a single-typed array: `string[]`:
    const warriors = ["Artemisia", "Boudica"];
    ```

- The type of an array is expressed as `T[]`, where `T` is the type of the array
  elements.

- If `T` is a function type, extra parens are needed to distinguish what's part
  of the function type:

    ```typescript
    // This is a function that creates an array of strings
    let createStrings: () => string[];

    // This is an array of functions that each create a string
    let stringCreators: (() => string)[];
    ```

- Union types can be used to indicate that each element of an array can be one
  of multiple select types.  Again, we need to careful with parentheses:

    ```typescript
    // Type is either a string or an array of numbers
    let stringOrArrayOfNumbers: string | number[];

    // Type is an array of elements, each of which is either a number or
    // a string
    let arrayOfStringOrNumber: (string | number)[];
    ```

- Multi-dimensional arrays are specified as arrays-of-arrays, using more `[]`'s:

    ```typescript
    let arrayOfArraysOfNumbers: number[][];

    arrayOfArraysOfNumbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    ```

- Typecript uses typical 0-index-based access for retrieving array members:
    - Addressing off the end of bounds returns `undefined` rather than throwing
      errors or crashing.


### Spreads & Rests

- _Rest parameters_ and _array spreading_, both using the `...` operator, are
  key ways to interact with arrays.

- Arrays can be joined together using the `...` operator.  If both arrays are
  the same type, the new array is that type.  If not, the new array is an array
  type of the union:

    ```typescript
    const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];
    const soldierAges = [90, 19, 45];

    // `conjoined` is of type (string | number)[]
    const conjoined = [...soldiers, ...soldierAges]
    ```

- Arrays used as arguments for rest parameters must have the same array type as
  the rest parameter:

    ```typescript
    function logWarriors(greeting: string, ...names: string[]) {
      for (const name of names) {
        console.log(`${greeting}, ${name}!`);
      }
    }
    ```


### Tuples

- Sometimes, it's useful to have an array of a fixed size - commonly referred to
  as a _tuple_.

- Tuples have a specific known type at each index (rather than a union type of
  all possible members of the array).  They are declared like an array literal,
  but with types in place of element values:

    ```typescript
    let yearAndWarrior: [number, string];

    // OK
    yearAndWarrior = [530, "Tomyris"]

    // Error - second element is mandatory.  This would be ok if
    // `yearAndWarrior` were declared as type `[number, string?]`
    yearAndWarrior = [530];

    // Error - order is significant
    yearAndWarrior = ["Tomyris", 530]
    ```

- Variable length array types aren't assignable to tuple types as the latter are
  considered more specific.

- Also, tuples of different lengths are not assignable to each other.



<!-- References -->

[ref-chapter06-hub]: https://www.learningtypescript.com/arrays/
[ref-chapter06-exercises-analyzing-dna]: https://www.learningtypescript.com/arrays/analyzing-dna/
[ref-chapter06-exercises-text-processor]: https://www.learningtypescript.com/arrays/text-processor/
