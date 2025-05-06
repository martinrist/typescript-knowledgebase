import { describe } from 'mocha';
import { expect } from 'chai';

describe('Sets', () => {
  it('Constructor takes iterable argument with members', () => {
    const s = new Set([1, 2, 3, 4]);
    expect(s.size).to.equal(4);
  });

  it('Does not contain duplicates', () => {
    const s = new Set('Mississippi');
    expect(s.size).to.equal(4);
    expect(s).to.include('M');
    expect(s).to.include('i');
    expect(s).to.include('s');
    expect(s).to.include('p');
  });

  it('`add()` adds new elements if not duplicates', () => {
    const s = new Set();
    expect(s).to.be.empty;
    s.add(1);
    expect(s.size).to.equal(1);
    s.add(2);
    expect(s.size).to.equal(2);
    s.add(2);
    expect(s.size).to.equal(2);
  });

  it('`add()` returns set, enabling chained calls', () => {
    const s = new Set().add('a').add('b').add('c');
    expect(s.size).to.equal(3);
    expect(s).to.include('a');
    expect(s).to.include('b');
    expect(s).to.include('c');
  });

  it('`delete()` removes elements if present and returns `true`', () => {
    const s = new Set([1, 2, 3]);
    const result = s.delete(1);
    expect(s).to.not.contain(1);
    expect(s.size).to.equal(2);
    expect(result).to.be.true;
  });

  it('`delete()` returns `false` if deleting non-existent element', () => {
    const s = new Set([1, 2, 3]);
    const result = s.delete(42);
    expect(s.size).to.equal(3);
    expect(result).to.be.false;
  });

  it('`clear()` removes all elements', () => {
    const s = new Set([1, 2, 3]);
    s.clear();
    expect(s).to.be.empty;
  });

  it('Uses strict equality for memberhip tests', () => {
    const s = new Set().add([1, 2, 3]);
    expect(s.size).to.equal(1);
    s.add([1, 2, 3]);

    // Set has two members, since the two arrays aren't identical
    expect(s.size).to.equal(2);
  });

  it('Iteration occurs in insertion order', () => {
    const xs = new Set().add('x').add('m').add('a').add(42);
    const ys = [];

    for(const x of xs) {
      ys.push(x);
    }

    expect(ys).to.deep.equal(['x', 'm', 'a', 42]);
  });
});
