import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('JavaScript Object fundamentals', () => {
  describe('Object prototypes', () => {
    it('All object literals have the same prototype', () => {
      const first = { x: 1, y: 2 };
      const second = { x: 1, y: 2 };
      expect(Object.getPrototypeOf(first)).to.equal(
        Object.getPrototypeOf(second),
      );
    });

    it('Object literals have Object.prototype as their prototype', () => {
      const obj = {};
      expect(Object.getPrototypeOf(obj)).to.equal(Object.prototype);
    });

    it('Array literals have Array.prototype as their prototype', () => {
      const arr = [];
      expect(Object.getPrototypeOf(arr)).to.equal(Array.prototype);
    });

    it('Function literals have Function.prototype as their prototype', () => {
      const fn = () => {};
      expect(Object.getPrototypeOf(fn)).to.equal(Function.prototype);
    });

    it('Date literals have Date.prototype as their prototype', () => {
      const date = new Date();
      expect(Object.getPrototypeOf(date)).to.equal(Date.prototype);
    });

    it('RegExp literals have RegExp.prototype as their prototype', () => {
      const regex = /foo/;
      expect(Object.getPrototypeOf(regex)).to.equal(RegExp.prototype);
    });

    it('Error literals have Error.prototype as their prototype', () => {
      const error = new Error();
      expect(Object.getPrototypeOf(error)).to.equal(Error.prototype);
    });

    it('Object.prototype has no prototype', () => {
      expect(Object.getPrototypeOf(Object.prototype)).to.equal(null);
    });

    it('Date.prototype has Object.prototype as its prototype', () => {
      expect(Object.getPrototypeOf(Date.prototype)).to.equal(Object.prototype);
    });

    it('Object.create() creates a new object using its first argument as the prototype', () => {
      const testObject = { x: 1, y: 2 };
      const obj = Object.create(testObject);
      expect(Object.getPrototypeOf(obj)).to.equal(testObject);
      expect(obj.x).to.equal(1);
      expect(obj.y).to.equal(2);
    });
  });

  describe('Property access', () => {
    it('Dot notation can be used to access properties', () => {
      const obj = { x: 1, y: 2 };
      expect(obj.x).to.equal(1);
      expect(obj.y).to.equal(2);
    });

    it('Bracket notation can be used to access properties', () => {
      const obj = { x: 1, y: 2 };
      expect(obj['x']).to.equal(1);
      expect(obj['y']).to.equal(2);
    });

    it('Bracket notation returns undefined if the property does not exist', () => {
      const obj = { foo: 'bar' };
      expect(obj['baz']).to.be.undefined;
    });

    it('Dot notation returns undefined if the property name does not exist', () => {
      const obj = { foo: 'bar' };
      expect(obj.baz).to.be.undefined;
    });

    it('Searches the objects prototype chain when accessing properties', () => {
      const parent = Object.create({ x: 1, y: 2 });
      const child = Object.create(parent);
      expect(child.x).to.equal(1);
      expect(child.y).to.equal(2);
    });
  });

  describe('Property deletion', () => {
    it('Deletes properties from an object', () => {
      const obj = { x: 1, y: 2 };
      delete obj.x;
      expect(obj.x).to.be.undefined;
    });

    it('Returns true if the property was deleted', () => {
      const obj = { x: 1, y: 2 };
      const result = delete obj.x;
      expect(result).to.be.true;
    });

    it('Returns true if the property does not exist', () => {
      const obj = { x: 1, y: 2 };
      const result = delete obj.z;
      expect(result).to.be.true;
    });
  });

  describe('Property testing', () => {
    it('The `in` operator can be used to test whether an object has a property', () => {
      const obj = { x: 1, y: 2 };
      expect('x' in obj).to.be.true;
      expect('z' in obj).to.be.false;
    });

    it('`hasOwnProperty()` can be used to test whether an object has an own property', () => {
      const obj = { x: 1, y: 2 };
      expect(obj.hasOwnProperty('x')).to.be.true;
      expect(obj.hasOwnProperty('z')).to.be.false;
    });

    it('hasOwnProperty() doesnt return true for inherited properties', () => {
      const obj = Object.create({ x: 1, y: 2 });
      expect('x' in obj).to.be.true;
      expect(obj.hasOwnProperty('x')).to.be.false;
    });
  });

  describe('Enumerating properties', () => {
    it("Object.keys() returns an array of an object's own enumerable properties", () => {
      const obj = { x: 1, y: 2 };
      expect(Object.keys(obj)).to.deep.equal(['x', 'y']);
    });
  });

  describe('Serialising objects', () => {
    it('JSON.stringify() can be used to convert an object to a JSON string', () => {
      const obj = { x: 1, y: 2 };
      expect(JSON.stringify(obj)).to.equal('{"x":1,"y":2}');
    });

    it('JSON.parse() can be used to convert a JSON string to an object', () => {
      const str = '{"x":1,"y":2}';
      expect(JSON.parse(str)).to.deep.equal({ x: 1, y: 2 });
    });
  });

  describe('Object methods', () => {
    it('toString() provides a string-based description of the object', () => {
      const obj = { x: 1, y: 2 };
      expect(obj.toString()).to.equal('[object Object]');
    });

    it('toString() can be overridden to provide a custom description', () => {
      const obj = { x: 1, y: 2 };
      obj.toString = function () {
        return `{ x: ${this.x}, y: ${this.y} }`;
      };
      expect(obj.toString()).to.equal('{ x: 1, y: 2 }');
    });

    it('addition operator coerces its operands to primitives and then calls toString()', () => {
      const obj = { x: 1, y: 2 };
      obj.toString = function () {
        return `{ x: ${this.x}, y: ${this.y} }`;
      };
      expect('Value: ' + obj).to.equal('Value: { x: 1, y: 2 }');
    });
  });

  describe('Extended object literal syntax', () => {
    it('Shorthand properties', () => {
      const x = 1,
        y = 2;
      const obj = { x, y };
      expect(obj.x).to.equal(1);
      expect(obj.y).to.equal(2);
    });

    it('Computed property names', () => {
      const PROPERTY_NAME = 'p1';
      function computePropertyName() {
        return 'p' + 2;
      }
      const obj = { [PROPERTY_NAME]: 1, [computePropertyName()]: 2 };

      expect(obj.p1).to.equal(1);
      expect(obj.p2).to.equal(2);
    });
  });

  describe('Spread operator', () => {
    it('Copies the properties of an existing object into a new one', () => {
      const position = { x: 0, y: 0 };
      const dimensions = { width: 100, height: 75 };
      const rect = { ...position, ...dimensions };

      expect(rect.x).to.equal(0);
      expect(rect.y).to.equal(0);
      expect(rect.width).to.equal(100);
      expect(rect.height).to.equal(75);
    });

    it('Takes the latest value of the property if there are duplicates', () => {
      const obj = { x: 1, y: 2, z: 3 };
      const copy = { ...obj, x: 4, y: 5 };

      expect(copy.x).to.equal(4);
      expect(copy.y).to.equal(5);
      expect(copy.z).to.equal(3);
    });
  });
});
