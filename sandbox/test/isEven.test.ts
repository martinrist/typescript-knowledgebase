import { isEven } from '../src/isEven';

describe('isEven', () => {
  it('should return true for even numbers', () => {
    const evenNumber = 10;

    const result = isEven(evenNumber);

    expect(result).toBe(true);
  });

  it('should return false for odd numbers', () => {
    const oddNumber = 7;

    const result = isEven(oddNumber);

    expect(result).toBe(false);
  });

  it('should return true for zero', () => {
    const zero = 0;

    const result = isEven(zero);

    expect(result).toBe(true);
  });
});
