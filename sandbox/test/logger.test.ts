import { describe, expect, it } from 'vitest';
import { formatMessage } from '../src/logger.js';

describe('format message', () => {
  it('should return unchanged message when called with no arguments', () => {
    expect(formatMessage('input')).toEqual('input');
  });

  it('should replace a single placeholder with the first argument', () => {
    expect(formatMessage('one: %s', '1')).toEqual('one: 1');
  });

  it('should discard excess arguments', () => {
    expect(formatMessage('one: %s', '1', '2', '3')).toEqual('one: 1');
  });

  it('should keep placeholders if there are not enough arguments', () => {
    expect(formatMessage('one: %s, two: %s, three: %s', '1', '2')).toEqual(
      'one: 1, two: 2, three: %s',
    );
  });
});
