import { describe, it } from 'mocha';
import { expect } from 'chai';
import { add, subtract } from '../src/calculator.js';

describe('addition', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 1)).to.equal(2);
  });

  it('should add one positive and one negative number', () => {
    expect(add(1, -1)).to.equal(0);
  });
});

describe('subtraction', () => {
  it('should subtract one positive number from another', () => {
    expect(subtract(2, 1)).to.equal(1);
  });

  it('should subtract one negative number from a positive number', () => {
    expect(subtract(1, -1)).to.equal(2);
  });
});
