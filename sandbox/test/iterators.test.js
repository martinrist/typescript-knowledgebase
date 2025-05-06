import { describe, it } from 'mocha';
import { expect } from 'chai';

class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  // Make a range act like a Set of numbers
  has(x) {
    return typeof x === 'number'
      && this.from <= x
      && x <= this.to;
  }

  // Return string representation of the Range
  toString() {
    return `{ x | ${this.from} <= x <= ${this.to} }`;
  }

  // Make a Range iterable by returning an iterator
  [Symbol.iterator]() {
    let next = Math.ceil(this.from);
    let last = this.to;

    // return the iterator object
    return {
      // This is the method that returns the next iterator result object
      next() {
        return (next <= last)
          ? { value: next++ }
          : { done: true };
      },

      // as a convenience, we make the iterator itself iterable
      [Symbol.iterator]() {
        return this;
      }
    };
  }
}

describe('Iterators & Generators', () => {
  describe('Iterable Range object', () => {
    it('Can be iterated as expected', () => {
      const result = [];
      const numbers = new Range(1, 5);
      for (const number of numbers) {
        result.push(number);
      }

      expect(result).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });
});
