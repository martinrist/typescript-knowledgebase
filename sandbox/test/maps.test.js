import { describe } from 'mocha';
import { expect } from 'chai';

describe('Maps', () => {
  let m;

  beforeEach(() => {
    m = new Map([
      ['three', 3],
      ['four', 4],
      ['one', 1],
      ['two', 2],
    ]);
  });

  it('Constructor takes iterable argument with [k, v] arrays', () => {
    expect(m.size).to.equal(4);
  });

  it('`get()` retrieves value for key if present`', () => {
    expect(m.get('four')).to.equal(4);
  });

  it('`get()` returns `undefined` if key not present', () => {
    expect(m.get('not-a-key')).to.be.undefined;
  })

  it('`set()` adds new entries if key not already present', () => {
    m.set('forty-two', 42);
    expect(m.get('forty-two')).to.equal(42);
  });

  it('`set()` modifies existing entry if key already present', () => {
    m.set('one', -1);
    expect(m.size).to.equal(4);
    expect(m.get('one')).to.equal(-1);
  });

  it('`set()` returns modified map, enabling chained calls', () => {
    m.set('five', 5).set('six', 6).set('seven', 7);
    expect(m.size).to.equal(7);
    expect(m.get('five')).to.equal(5);
    expect(m.get('six')).to.equal(6);
    expect(m.get('seven')).to.equal(7);
  });

  it('`delete()` removes elements if present and returns `true`', () => {
    const result = m.delete('one');
    expect(m).to.not.contain('one');
    expect(m.size).to.equal(3);
    expect(result).to.be.true;
  });

  it('`delete()` returns `false` if deleting non-existent element', () => {
    const result = m.delete('forty-two');
    expect(m.size).to.equal(4);
    expect(result).to.be.false;
  });

  it('`clear()` removes all elements', () => {
    m.clear();
    expect(m).to.be.empty;
  });

  it('Iteration occurs in insertion order', () => {
    const keys = [];
    const values = [];

    for(const [k, v] of m) {
      keys.push(k);
      values.push(v);
    }

    expect(keys).to.deep.equal(['three', 'four', 'one', 'two']);
    expect(values).to.deep.equal([3, 4, 1, 2]);
  })
});
