# Modules

## Contents
<!-- TOC -->
- [Modules](#modules)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Modules with Classes, Objects \& Closures](#modules-with-classes-objects--closures)
  - [Node Modules using `require()`](#node-modules-using-require)
  - [ES6 Modules](#es6-modules)
<!-- TOC -->


## Overview

- Historically, JavaScript had no built-in support for modules - instead
  programmers used weak modularity support offered by classes, objects and
  closures.

- Closure-based modularity, with support from code-bundling tools, led to a
  practical form of modularity based on a `require()` function.

- `require()`-based modularity was adopted by Node, but not outside the Node
  ecosystem.

- ES6 defines modules in terms of `import` and `export` keywords.



## Modules with Classes, Objects & Closures

- Classes provide a degree of modularity - they act as modules for their methods,
  so multiple classes can define the same-named methods without clashes.

- However, using classes doesn't offer us ways to hide internal implementation
  details inside the module.

- Local-variables and nested functions _are_ private to that function.  This
  allows the use of _immediately-invoked-function-expressions (IIFEs)_ for
  a kind of modularity, e.g.:

    ```javascript
    const BitSet = (function () {
        // Private implementation details
        function isValid(set, n) { ... }
        function has(set, byte, bit) { ... }
        const BITS = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
        const MASKS - new Uint8Array([-1, -2, -4, -8, -16, -32, -64, -128]);

        // The public API is just the class which we define and return here
        return class BitSet extends AbstractWriteableSet {
            // ... implementations omitted
        };
    }());
    ```

- Another example of a stats module with multiple functions in its public API:

    ```javascript
    const stats = (function() {
        // private utility functions
        const sum = (x, y) => x + y;
        const square = x => x * x;

        // A public function that will be exported
        function mean(data) {
            return data.reduce(sum) / data.length;
        }

        // Another public function that will be exported
        function stddev(data) {
            let n = mean(data);
            return Math.sqrt(
                data.map(x => x - m).map(square).reduce(sum) / (data.length - 1)
            );
        }

        // We export the public functions as properties of an object
        return { mean, stddev };
    }());

    // here's how it's used
    stats.mean([1, 3, 5, 7, 9]);
    stats.stddev([1, 3, 5, 7, 9]);
    ```



## Node Modules using `require()`

- In Node, it's assumed that files live on a fast, local filesystem, so there's
  no need to bundle everything into a single file.

- In Node, each file is an independent module with a private namespace:
    - Constants, variables, functions and classes defined in one file are
      private to that file unless the file exports them.
    - Values exported by one module are only visible in another if it explicitly
      imports them.

- Node defines a global `exports` object that's always defined.  To export a
  value, assign it to the properties of this object:

    ```javascript
    const sum = (x, y) => x + y;
    const square = x => x * x;

    exports.mean = data => data.reduce(sum) / data.length;
    exports.stddev = function(d) {
        let m = exports.mean(d);
        return Math.sqrt(d.map(x => x - m).map(square).reduce(sum) / (d.length - 1));
    };
    ```

- Node imports another module by calling `require()` with the name of the module
  and assigning the result to a variable through which exports will be accessed:

    ```javascript
    const fs = require('fs');              // Node built-in
    const http = require('http');          // Node built-in

    const express = require('express');    // Third-party

    const stats = require('./stats.js');   // Internal - relative path

    // Use destructuring assignment to just import the functions we need
    const { stddev } = require('./stats.js');
    ```



## ES6 Modules

- ES6 adds `import` and `export` keywords to JavaScript to support first-class
  modularity as a core language feature.

- ES6 modularity is conceptually similar to Node modularity:
    - Each file is its own module.
    - Constants, variables, functions and classes defined in a file are private
      to that file unless explicitly exported.
    - Values exported from a module are available for use in another module
      that explicitly imports them.

- ES6 modiules differ from standard JavaScript 'scripts' in important ways:
    - In regular scripts, all top-level constructs are in global context.
    - Code inside an ES6 module is automatically in _strict mode_, so you
      don't have to write `use strict` to enable it.
    - In modules, `this` is `undefined` (as opposed to the global object)
      in top-level code.

- Export constants, variables, functions or classes from ES6 modules by adding
  the `export` keyword:

    ```javascript
    export const PI = Math.PI;

    export function degreesToRadians(d) { return d * PI / 180; }

    export class Circle {
        constructor(r) { this.r = r; }
        area() { return PI * this.r * this.r; }
    }
    ```

- Alternatively, declare constructs as normal, then (typically at end) write
  a single export statement:

    ```javascript
    export { Circle, degreesToRadians, PI }
    ```

- If module exports only a single value, can use `export default` to make it
  easier to import:

    ```javascript
    export default class BitSet {
        // ,,, implementation omitted
    }
    ```

- Importing values uses the `import` keyword of which there are various
  syntaxes.

- To import a default export, just use the identifier to which the imported
  value should be referred to by the importing module, e.g.:

    ```javascript
    import BitSet from './bitset.js';
    ```

- To import values from a module that exports multiple values, list those
  names within curly braces, e.g.:

    ```javascript
    import { mean, stddev } from `./stats.js';
    ```

- To import everything exported by a module, use `* as` syntax, e.g.:

    ```javascript
    import * as stats from './stats.js`;
    ```

- To import a module with no exports (that might run code as a side-effect),
  use a bare `import`:

    ```javascript
    import './analytics.js';
    ```

- The `as` keyword can be used to rename imports as they are imported, to
  avoid clashes, e.g.:

    ```javascript
    import { render as renderImage } from './imageutils.js';
    import { render as renderUI } from './ui.js';
    ```



<!-- References -->
