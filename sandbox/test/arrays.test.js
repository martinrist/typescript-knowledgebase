import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('JavaScript Array fundamentals', () => {
  describe('Creating arrays', () => {
    it('Array literals can create sparse arrays', () => {
      const a = [1, , 3];
      expect(a.length).to.equal(3);
      expect(a[1]).to.be.undefined;
    });

    it('... operator "spreads" elements in array literal', () => {
      let a = [1, 2, 3];
      let b = [0, ...a, 4];
      expect(b).to.deep.equal([0, 1, 2, 3, 4]);
    });

    it('Spread operator can shallow copy an array', () => {
      let original = [1, 2, 3];
      let copy = [...original];

      expect(copy).to.not.equal(original);
      expect(copy).to.deep.equal(original);
    });

    describe('Array() constructor', () => {
      it('With no arguments, creates empty array', () => {
        const a = new Array();
        expect(a).to.be.empty;
      });

      it('With single numeric argument, creates array of specified length', () => {
        const a = new Array(5);
        expect(a.length).to.equal(5);
        a.forEach((x) => expect(x).to.be.undefined);
      });

      it('With single non-numeric argument, creates single-element array', () => {
        const a = new Array('foo');
        expect(a).to.eql(['foo']);
      });

      it('With multiple numeric arguments, creates array with multiple elements', () => {
        const a = new Array(1, 2, 3);
        expect(a).to.eql([1, 2, 3]);
      });
    });

    describe('Array.of() factory method', () => {
      it('With no arguments, creates empty array', () => {
        const a = Array.of();
        expect(a).to.be.empty;
      });

      it('With single argument, creates single-element array', () => {
        const a = Array.of(5);
        expect(a).to.eql([5]);
      });

      it('With multiple argument, creates array with matching elements', () => {
        const a = Array.of(1, 'two', 3, true);
        expect(a).to.eql([1, 'two', 3, true]);
      });
    });
  });

  describe('Array element access and modification', () => {
    it('Accessing out of bounds returns undefined', () => {
      const a = [0, 1, 2];
      expect(a[42]).to.be.undefined;
    });

    it('`delete` operator removes element', () => {
      const a = [0, 1, 2, 3];
      delete a[1];
      expect(a).to.be.of.length(4)
      expect(a).to.eql([0, undefined, 2, 3]);
    });

    it('Setting `length` property deletes elements from end', () => {
      const a = [0, 1, 2, 3];
      a.length = 3;
      expect(a).to.be.of.length(3);
      expect(a).to.eql([0, 1, 2]);
    });
  });

  describe('Array iteration', () => {
    it('Iteration with `for/of` includes undefined elements in sparse arrays', () => {
      const array = [0, , 2, , 4];
      let counter = 0;

      for (const _ of array) {
        counter++;
      }

      expect(counter).to.equal(5)
    });

    it('Iteration with `forEach()` skips undefined elements in sparse arrays', () => {
      const array = [0, , 2, , 4];
      let counter = 0;

      array.forEach(_ => counter++);

      expect(counter).to.equal(3)
    });
  });
});
