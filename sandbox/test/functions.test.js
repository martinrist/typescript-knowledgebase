import { beforeEach, describe } from 'mocha';
import { expect } from 'chai';

describe('JavaScript Function fundamentals', () => {
  describe('Function properties', () => {

    function uniqueInteger() {
      return uniqueInteger.counter++;
    }

    beforeEach(() => {
      uniqueInteger.counter = 0;
    });

    it('Before calling, counter is zero', () => {
      expect(uniqueInteger.counter).to.equal(0);
    })

    it('On calling, returns 0 and then incrememts counter', () => {
      expect(uniqueInteger()).to.equal(0);
      expect(uniqueInteger.counter).to.equal(1);
    })

    it('On calling three times, returns 2 and incrememts counter', () => {
      uniqueInteger();
      uniqueInteger();
      expect(uniqueInteger()).to.equal(2);
      expect(uniqueInteger.counter).to.equal(3);
    })
  });
});
