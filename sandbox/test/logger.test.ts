import { describe, it } from 'mocha';
import { expect } from 'chai';
import { formatMessage } from '../src/logger.js';

describe('format message', () => {
  it('should return unchanged message when called with no arguments', () => {
    expect(formatMessage('input')).to.equal('input');
  });

  it('should replace a single placeholder with the first argument', () => {
    expect(formatMessage('one: %s', '1')).to.equal('one: 1');
  });

  it('should discard excess arguments', () => {
    expect(formatMessage('one: %s', '1', '2', '3')).to.equal('one: 1');
  });

  it('should keep placeholders if there are not enough arguments', () => {
    expect(formatMessage('one: %s, two: %s, three: %s', '1', '2')).to.equal(
      'one: 1, two: 2, three: %s',
    );
  });
});
