# Iterators & Generators

## Contents
<!-- TOC -->
- [Iterators \& Generators](#iterators--generators)
  - [Contents](#contents)
  - [Overview](#overview)
  - [How Iterators Work](#how-iterators-work)
  - [Implementing Iterable Objects](#implementing-iterable-objects)
  - [Generators](#generators)
<!-- TOC -->


## Overview

- Iterable objects and their associated iterators were introduced in ES6:
    - Arrays (and typed arrays), strings, `Set`s and `Map`s are all iterable.
    - Iteration over these objects is done with the `for / of` loop.
    - Iterators can also be used with the 'spread' operator `...` to expand
      the iterable object for an array initialiser or function invocation.

- Iterators can also be used with destructuring assignments.

- In ES6 and later, many built-in functions and constructors that are commonly
  used with `Array` arguments can also be used with iterable objects, e.g.:

    ```javascript
    new Set('abc')   // => new Set(['a', 'b', 'c'])
    ```

- _Generators_ (also an ES6 feature) are an easy way to create iterators.


## How Iterators Work

- There are three separate types of objects involved in iterators:
    - _Iterable objects_ - types like `Array`, `Set` and `Map` that can be
      iterated.
    - The _iterator object_ itself - the object that performs the iteration.
    - The _iteration result object_ that holds the result of each iteration
      step.

- An _iterable object_ is any object with a special iterator method that
  returns an _iterator_ object:
    - This doesn't have a conventional name, but instead uses the Symbol
      `Symbol.iterator` as its name

- An _iterator_ is any object with a `next()` method that returns an
  _iteration result object_.

- An _iteration result object_ is any object with properties named `value` and
  `done`.

- An example of a simple `for / or` loop written the full way:

    ```javascript
    let iterable = [99];
    let iterator = iterable[Symbol.iterator]();
    for (let result = iterator.next(); !result.done; result = iterator.next()) {
        console.log(result.value);
    }
    ```


## Implementing Iterable Objects

- To make a class iterable, implement a method whose name is `Symbol.iterator`,
  that returns an iterator object with a `next()` method:

    ```javascript
    class Range {
      constructor(from, to) {
        this.from = from;
        this.to = to;
      }

      // Make a Range iterable by returning an iterator
      [Symbol.iterator]() {
        let next = Math.ceil(this.from);
        let last = this.to;

        // return the iterator object
        return {
          // This is the method that returns the next iterator result object
          next() {
            return (next <= last) ? { value: next++ } : { done: true };
          },

          // as a convenience, we make the iterator itself iterable
          [Symbol.iterator]() { return this; }
        };
      }
    }
    ```

- A key advantage of iterable objects and iterators is that they are lazy -
  i.e. they don't have to compute all their members until those members are
  needed:
    - These make them good for representing infinite sequences, or sequences
      whose members are expensive to calculate.

- Iterator objects can also implement a `return()` method to go along with
  `next()`:
    - If iteration stops before `next()` returns an iteration result object
      with `done` set to `true`, then the `return()` method is called.
    - Can be usedful if the iterator needs to clean up (e.g. close files)
      if iteration ends early.



## Generators

- _Generators_ are a powerful mechanism for simplifying the creation of
  iterable objects.

- To creata a generator, first define a _generator function_:
    - Syntactically similar to a standard function, but declared with
      `function*` keyword.
    - Invoking a generator function doesn't execute the function body, but
      instead returns a _generator object_ (which is an _iterator_).
    - Calling `next()` on the generator object causes the body of the
      generator function to run from the start (or current position) to a
      `yield` statement.
    - The value of the `yield` statement becomes the value returned by the
      `next()` call.

- Example:

    ```javascript
    function* oneDigitPrimes() {
        yield 2;
        yield 3;
        yield 5;
        yield 7;
    }

    // Invoking the generator function gives a generator
    const primes = oneDigitPrimes();

    for (const prime in primes) {
        console.log(prime);
    }
    ```

- Can also use expression form with generator functions:

    ```javascript
    const seq = function*(from, to) {
        for (let i = from; i <= to; i++) yield i;
    }
    ```

- To use generators to write iterable classes, replace the `[Symbol.iterator]`
  function with a `*[Symbol.iterator]()` generator function, e.g. for the above
  `Range` implementation:

    ```javascript
    *[Symbol.iterator](){
        for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }
    ```

- Generators are more interesting if they actually compute the values they
  yield - e.g.:

    ```
    function* fibonacciSequence() {
        let x =0, y = 1;
        for(;;) {
            yield y;
            [x, y] = [y, x + y];
        }
    }
    ```

- In addition to `yield`, `yield*` can be used to iterate an iterable object
  and yield each of the resulting values in turn.

<!-- References -->
