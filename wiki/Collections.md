# Collections - Arrays, Tuples, Maps & Sets

## Contents
<!-- TOC -->
- [Collections - Arrays, Tuples, Maps \& Sets](#collections---arrays-tuples-maps--sets)
  - [Contents](#contents)
  - [JavaScript Fundamentals](#javascript-fundamentals)
    - [Overview](#overview)
    - [Creating Arrays](#creating-arrays)
    - [Reading, Writing, Adding \& Deleting Array Elements](#reading-writing-adding--deleting-array-elements)
    - [Iterating Arrays](#iterating-arrays)
    - [Array Methods](#array-methods)
    - [Array-like Objects](#array-like-objects)
  - [Array Types \& Member Access](#array-types--member-access)
  - [Spreads \& Rests](#spreads--rests)
  - [Tuples](#tuples)
  - [Sets](#sets)
  - [Maps](#maps)
<!-- TOC -->


## JavaScript Fundamentals

### Overview

- Arrays in JavaScript are _dynamic_, growing or shrinking as needed.  There is
  no need to declare a fixed size for the array on creation.

- Arrays may be _sparse_ - i.e. elements do not necessarily have contiguous
  indices, and there may be gaps.

- Arrays may be multi-dimensional, with each element of the top-level array
  being another array, e.g.:

    ```javascript
    const table = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]
    ```

- Arrays have a `length` property which:
    - Is greater than the number of elements if the array is _sparse_.
    - Is equal to the number of elements if the array is _dense_.


### Creating Arrays

- Simplest way to create arrays is via _Array literals_ - e.g. `[1, 2, 3, 4]`:
    - Multiple commas in a row (e.g. `[1, , 3]`) create sparse arrays.
    - Missing elements in sparse arrays return `undefined`.

- The _spread operator_ (`...`) includes the elements of an array with an
  array literal:

    ```javascript
    const a = [1, 2, 3];
    const b = [0, ...a, 4];

    // The spread operator is an easy way to creata a shallow array copy
    const original = [1, 2, 3];
    const copy = [...original];
    ```

- The `Array()` constructor creates arrays in different ways depending on the
  arguments:
    - No arguments - `new Array()` - creates an empty array, like `[]`.
    - Single argument - `new Array(10)` - creates an array with specified length.
    - Two or more arguments - `new Array(1, 2, 3, 4)` - constructor args become
      elements of the array.

- `Array.of()` (ES6) - factory method that creates a new array using argument
  values - e.g. `Array.of(1)`.

- `Array.from()` (ES6) - factory method that expects an iterable or array-like
  object and creates a new array from it.


### Reading, Writing, Adding & Deleting Array Elements

- Access to array elements is via the `[]` operator:

    ```javascript
    const a = ['world'];
    a[1];
    a[0];
    ```

- Note that arrays are a special kind of object - `[]` works the same as for
  objects - numeric indices are converted to strings which are used as
  property names.

- All indexes used in the `[]` operator are property names, but only
  property names that are integers less than 2<sup>32</sup>-2 are indexes.

- Because of this equivalence of property names and indices, JavaScript has no
  notion of an index-out-of-bounds error.  Accessing elements past the end of
  an array returns `undefined`.

- Elements can be added to arrays by assigning values to new indices, or using
  `push()` to add to the end of an array (equivalent to assigning to
  `a[a.length]`).

- `pop()` is the opposite of `push()` - it removes and returns the last element
  of the array.

- Array elements can be deleted using the `delete` operator:
    - The array element becomes `undefined`.
    - The array becomes sparse.



### Iterating Arrays

- In ES6, the easiest way to loop through each element is the `for / of` loop:

    ```javascript
    const letters = [...'Hello world'];
    let string = '';
    for (letter of letters) {
      string += letter;
    }
    ```

- `for / of` has no special behaviour for sparse arrays - it returns `undefined`
  for any elements that do not exist.

- To gain access to the indices of the list, use `entries()` and destructuring:

    ```javascript
    let everyOther = '';
    for (let (index, letter) of letters.entries()) {
      if (index % 2 === 0) everyOther += letter;
    }
    ```

- Array iteration can also be done with `forEach()` - which is sparse-array-aware
  and does not invoke the function for elements that are not there:



### Array Methods

- Several _array iterator_ methods exist that allow processing all the elements
  of the array in some way:
    - These typically take a function argument which itself has three arguments -
      the value of the element, the index of the element, and the array itself.
    - Most methods also take a second argument - the function in the first
      argument is invoked as if it were a member of the second argument - i.e.
      the second argument becomes the value of `this` in the function.

- Example array iterator methods:
    - `forEach()` - iterates through array - with no way to terminate iteration.
    - `map()` - applies transformation function to each element, returning a new
      array.
    - `filter()` - applies a predicate to each element, returning a new array
      containing the elements for which the predicate evaluates to `true`.
      Skips elements in sparse arrays, and the result is always dense.
    - `find()` / `findIndex()` - like `filter()` but stop iterating the first
      time the predicate finds a value.  If no match, then `find()` returns
      `undefined` and `findIndex()` returns `-1`.
    - `every()` / `some()` - take a predicate and return `true` / `false` if
      every element / at least one element satisfies the predicate.
    - `reduce()` / `reduceRight()` - perform an accumulating fold on the array
      elements.  Second argument is the initial value - if not supplied, the
      initial accumulation is with the first two elements of the array.

- Arrays can be 'flattened' using `flat()` and `flatMap()` functions:
    - `flat()` removes a single level of array containment by default.  Pass a
      numeric argument to flatten more levels.
    - `flatMap()` applies `map()` then `flat()` to the result.

- `concat()` creates and returns a new array that contains the elements of the
  original array on which the method was called, then each of the arguments.

- Various methods allow the use of arrays as _stacks_ and _queues_:
    - `push()` / `pop()` - add / remove element to / from end of array -
      modifying it in place.  Allows use of array as a _first-in, last-out
      stack_.
    - `unshift()` / `shift()` - act like `push()` / `pop()` but at the start of
      the list, shifting other elements up and down as required.

- Various methods allow operation on subarrays - contiguous regions of the array:
    - `slice()` returns a _slice_ or sub-array - two arguments specify the start
      and end (exclusive) of the slice to be returned.  Doesn't modify the array
      on which it's invoked.
    - `splice()` is a general-purpose method for inserting and removing elements
      which modifies the array on which it is invoked.
    - `fill()` sets the elements of an array or a slice of an array to a
      specified value, mutating the array it is called on.

- Searching and sorting can be performed on arrays:
    - `indexOf()` / `lastIndexOf()` - seach an array for a specific value
      (using the `===` operator) and return the first / last index of the match.
    - `includes()` - takes a single argument and returns `true` if the array
      contains the value (effectively set membership testing for arrays).
    - `sort()` - sorts the array values in place.  By default sort is
      alphabetical.  Custom comparator function can be supplied as second
      argument.
    - `reverse()` - reverses the order of the array in-place.



### Array-like Objects

- JavaScript arrays have special features that other objects do not:
    - The `length` property is automatically updated as new elements are added.
    - Setting `length` to a smaller value truncates the array.
    - Arrays inherit methods from `Array.prototype`.
    - `Array.isArray()` returns `true` for arrays.

- _Array-like Objects_ are other objects that have a numeric `length` property
  and corresponding non-negative integer properties:
    - They can be iterated over and accessed as for arrays.
    - However, the `length` property doesn't do anything special.
    - Nor can you access methods from `Array.prototype`.


## Array Types & Member Access

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

- If a type annotation isn't provided on an initially-empty array, TypeScript
  will treat the array as an evolving `any[]` - this is generally discouraged.

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


## Spreads & Rests

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


## Tuples

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



## Sets

- Sets are collections that are not indexed or ordered, and cannot contain
  duplicates.

- Create sets using the `Set()` constructor, which takes an iterable consisting
  of the members of the newly-created set.

- Can add and remove elements with `add()`, `delete()` and `clear()`.

- `add()` removes the set it was invoked on so you can chain calls, e.g.:

    ```javascript
    s.add('a').add('b').add('c');
    ```

- `delete()` returns a boolean specifying whether the value was actually a
  member of the set.

- Set membership is based on _strict equality_ (`===`), which is important for
  object or array members.

- Set membership is tested with the `has()` method - optimised for faster testing:
    - Array's `include()` method is linear in the length of the array.
    - Set's `has()` method is much faster.

- `Set`s are iterable, so they can be iterated over using a `for / of` loop,
  or converted to arrays with `...`:
    - When iterating, set members are returned in insertion order.



## Maps

- Maps represent sets of value known as _keys_ where each key has a _value_
  associated with it:
    - Like arrays, but instead of using sequential integers as keys, they
      use arbitrary values as indices.

- Maps have fast lookup by key (not as fast as array lookup by index, but
  still very fast).

- Create new map using `Map()` constructor, which takes an iterable of 2-element
  `[k, v]` arrays.

- Once created, can query entries using `get()`, and set entries for keys with
  `set()`:
    - Calling `set()` with an exisitng key updates the value for that key.

- Similar to sets, use `has()` to check membership by key, `delete()` to delete
  entry by key, and `clear()` to remove all entries.

- Iterating `Map`s with `for / of` produces a `[key, value]` array for each
  entry, which idiomatically is destructured, e.g.:

    ```javascript
    for (const [k, v] of m) {
        // ...
    }
    ```

- `Map`s iterate in entry insertion order, like `Set`s.

- To iterate just keys or values, use the `keys()` and `values()` methods.


<!-- References -->
