# Objects

## Contents
<!-- TOC -->
- [Objects](#objects)
  - [Contents](#contents)
  - [JavaScript Fundamentals](#javascript-fundamentals)
    - [Overview](#overview)
    - [Property Access \& Modification](#property-access--modification)
    - [Prototypes](#prototypes)
    - [Testing Properties](#testing-properties)
    - [Enumerating Properties](#enumerating-properties)
    - [Serialisation \& Deserialiastion](#serialisation--deserialiastion)
    - [Object Methods](#object-methods)
    - [Extended Object Literal Syntax](#extended-object-literal-syntax)
  - [Object Types](#object-types)
  - [Structural Typing for Objects](#structural-typing-for-objects)
  - [Optional Properties](#optional-properties)
  - [Unions of Object Types](#unions-of-object-types)
  - [Discriminated Unions](#discriminated-unions)
  - [Discriminated Tuples](#discriminated-tuples)
  - [Intersection Types](#intersection-types)
<!-- TOC -->


## JavaScript Fundamentals

### Overview

- JavaScript objects are composite values, consisting of unordered collections
  of _properties_, where each property is a key-value pair:
    - Keys are normally `string` values (although they can also be `Symbol`s).
    - Objects are mutable - their properties can be added, modified, or deleted
      after creation.

- Objects are passed by reference, not by value.

- Objects can be created various ways:
    - With object literals - e.g. `{ x: 0, y: 1 }`
    - With the `new` keyword - e.g. `new Object()`, `new Date()`
    - With the `Object.create()` function - e.g. `Object.create({x: 1, y: 2})`

- Object properties can be any valid JavaScript value (strings, numbers,
  booleans, functions, other objects, etc).


### Property Access & Modification

- Properties can be accessed using dot notation (`obj.property`) or bracket
  notation (`obj['property']`):
    - Accessing properties that do not exist on an object or in its prototype
      chain returns `undefined`.

- ES2020 supports conditional property access with `?.`, e.g.
  `book?.author?.surname`.

- To create or set a property, use the dot or bracket notation on the left hand
  side of an assignment expresion - e.g. `obj.property = newValue` or
  `obj['property'] = newValue`.

- Own properties (but not inherited ones) can be deleted using the `delete`
  operator, which takes a property access expression - e.g. `delete book.author`


### Prototypes

- Almost every JavaScript object has a second object - its _prototype_ -
  associated with it, from which it inherits properties:
    - All objects created from object literals have `Object.prototype` as their
      prototype.
    - `Date`s have `Date.prototype` as their prototype, with similar things for
      for other literals like arrays, functions, regexes.
    - Linked series of protoype objects form a _prototype chain_.
    - `Object.create()` creates a new object using its first argument as the
      prototype for that object.

- JavaScript objects have a set of _own properties_ and also those inherited
  from the object's prototype:
    - When accessing properties, JavaScript looks up the prototype chain if the
      property can't be found on the queried object.
    - Howevever, when properties are set, they are always set on the called
      object.
    - In other words, inheritance works for querying but not modifying
      properties.


### Testing Properties

- To test whether an object has a property (own or inherited) with a given name,
  use the `in` operator - e.g. `'x' in { x: 1 }`

- To test whehter an object has a property as an _own property_ (rather than an
  inherited one), use the `hasOwnProperty()` method.


### Enumerating Properties

- To enumerate both own and inherited properties of an object, use the `for/in`
  loop:

    ```javascript
    let o = { x: 1, y: 2, z: 3 };
    for(const p in o) {
      console.log(p);
    }
    ```

- Alternatively, get an array of property names using any of the following
  methods, then loop through that with `for/of`:
    - `Object.keys()`
    - `Object.getOwnPropertyNames()`
    - `Object.getOwnPropertySymbols()`
    - `Reflect.ownKeys()`


### Serialisation & Deserialiastion

- Objects can be serialised to JSON using `JSON.stringify(o)` and can be
  deserialised from JSON using `JSON.parse(str)`.

- Optional second arguments can be used to customise the (de)serialisation
  process by specifying a list of configuration properties.


### Object Methods

- All JavaScript objects (except those explicitly created without a prototype)
  inherit properties from `Object.prototype`:
    - Most of these are common methods that are intended to be replaced by
      other more specialised versions.

- `toString()` provides a `string`-based description of the object, used when
  JavaScript needs a `string` representation.

- `toLocaleString()` is a locale-sensitive version of `toString()`.

- `valueOf()` is called when JavaScript needs to convert an object to some
  primitive type other than a `string`.

- `toJSON()` is called by `JSON.stringify()` when a serialisable representation
  of an object is required.


### Extended Object Literal Syntax

- ES6 introduces a number of features to make writing object literals more
  ergonomic.

- _Shorthand properties_ allow easier assignment to an object with properties
  the same as the variables being used to assign them:

    ```javascript
    // Full syntax
    const x = 1, y = 2;
    let o1 = { x: x, y: y };

    // Shorthand properties
    let o2 = { x, y };
    ```

- _Computed property names_ allow the use of a square-brace-delimited arbitrary
  expression used to compute property names:

    ```javascript
    const PROPERTY_NAME = 'p1';
    function computePropertyName() { return 'p' + 2; }

    let p = {
      [PROPERTY_NAME]: 1,
      [computePropertyName()]: 2
    }
    ```

- In ES2018 and later, we can copy the properties of an existing object into a
  new one using the _spread operator_ `...` inside an object literal:

    ```javascript
    let position = { x: 0, y: 0 };
    let dimensions = { width: 100, height: 75 };
    let rect = { ...position, ...dimensions };

    // The latest value overwrites earlier ones
    let o = { x: 1 };
    let p = { x: 0, ...o };
    p.x                         // => 1
    ```

- In ES6, the object literal (and class definition syntax) allow _shorthand
  methods_ to be declared:

    ```javascript
    // Longhand version
    let square = {
      area: function() { return this.side * this.side; },
      side: 10
    }

    // Shorthand version
    let sqaure = {
      area() { return this.side * this.side; },
      side: 10
    }
    ```

- As well as _data properties_ (with a name and ordinary value), JavaScript
  supports _accessor properties_ which have one or two accessor methods - a
  _getter_ and / or _setter_:

    ```javascript
    let o = {
      // An ordinary data property
      dataProp: value,

      // An accessor property defined as a pair of functions
      get accessorProp() { return this.dataProp; }
      set accessorProp(value) { this.dataProp = value; }
    }
    ```


## Object Types

- When creating an object literal, TypeScript considers it to be a new type,
  based on its properties:

    ```typescript
    const poet = {
      born: 1935,
      name: "Mary Oliver"
    };

    poet.name;          // Type: string
    poet['born'];       // Type: number

    // Error: property 'end' does not exist on type
    // '{ born: number; name: string; }'
    poet.end;
    ```

- Object types use a syntax that looks like object literals, but with types in
  place of values, and semicolons as line terminators instead of commas:

    ```typescript
    let poetLater: {
      born: number;
      name: string;
    }

    // OK - the type shape conforms
    poetLater = {
      born: 1935,
      name: "Mary Oliver"
    };

    // Error: type 'string' is not assignable to type
    // '{ born: number; name: string; }'
    poetLater = "Sappho";
    ```

- Object types can be aliased using a standard type alias:

    ```typescript
    type Poet = {
      born: number;
      name: string;
    };

    let poet: Poet = {
      born: 1935,
      name: "Mary Oliver"
    };
    ```


## Structural Typing for Objects

- TypeScript's type system is _structurally typed_ - any value that satisfies a
  type is allowed to be used as a value of that type.

- This isn't the same as _duck typing_ - where nothing checks object types until
  they're used at runtime.  JavaScript is _duck-typed_, whereas TypeScript is
  _structurally typed_.

- As a concrete exmaple, consider two type aliases, each with one property.  An
  object with both properties is assignable to either type:

    ```typescript
    type WithFirstName = {
      firstName: string;
    }

    type WithLastName = {
      lastName: string;
    }

    const hasBoth = {
      firstName: "Lucille",
      lastName: "Clifton"
    }

    // Both these assignments are OK
    let withFirstName: WithFirstName = hasBoth;
    let withLastName: WithLastName = hasBoth;
    ```

- For objects to be assignable in this way, they must have all the object type's
  required properties, _and_ the types of the properties must match.

- It is also an error if a variable is declared with an object type and its
  initial value has _more_ fields than its type describes:

    ```typescript
    type Poet = {
      born: number;
      name: string;
    }

    // Error: Type `{ activity: string; born: number; name: string; }'
    // is not assignable to type 'Poet'
    const extraProperty: Poet = {
      activity: "walking",
      born: 1935,
      name: "Mary Oliver"
    };
    ```

- These _excess property checks_ only trigger for object literals being created
  in locations that are declared to be an object type - providing an existing
  object literal bypasses excess property checks.

- Object types can be nested:

    ```typescript
    type Poem = {
      author: {
        firstName: string;
        lastName: string;
      };
      name: string;
    };

    // Alternatively:
    type Author = {
      firstName: string;
      lastName: string;
    };

    type Poem = {
      author: Author;
      name: string;
    };
    ```

## Optional Properties

- Object type properties don't all have to be required in the object - optional
  properties are denoted by `?`:

    ```typescript
    type Book = {
      author?: string;
      pages: number;
    };

    // OK, since `author` is optional:
    const missingAuthor: Book = {
      pages: 42;
    };
    ```

- Note that optional properties aren't the same as properties that include
  `undefined` in a type union:
    - Optional properties are allowed to not exist
    - Properties not declared as optional but of type `| undefined` must exist,
      even if the value is `undefined`.


## Unions of Object Types

- If a variable is given an initial value that could be one of multiple object
  types, TypeScript will infer its type to be a union of object types.

- Alternatively, unions of object types can be declared explicitly.  In this
  case, TypeScript will only allow access to properties that exist on all the
  union types:

    ```typescript
    type PoemWithPages = {
      name: string;
      pages: number;
    };

    type PoemWithRhymes = {
      name: string;
      rhymes: boolean;
    };

    type Poem = PoemWithPages | PoemWithRhymes;

    const poem: Poem = Math.random() > 0.5
      ? { name: "The Double Image", pages: 7 }
      : { name: "Her Kind", rhymes: true };

    // OK - both `PoemWithPages` and `PoemWithRhymes` have `name`
    poem.name;

    // Error: Property 'pages' does not exist on type 'Poem'
    //            Property 'pages' does not exist on type 'PoemWithRhymes'
    poem.pages;
    ```

- If the type checker sees that an area of code can only be run if a union typed
  value contains a certain property, then the type is _narrowed_ to only the
  constituents that contain the property:

    ```typescript
    if ("pages" in poem) {
      poem.pages;           // OK - poem is narrowed to PoemWithPages
    } else {
      poem.rhymes;          // OK - poem is narrowed to PoemWithRhymes
    }
    ```


## Discriminated Unions

- Discriminated unions have a property on the object that indcates what shape
  the object is - the property is called a _discriminant_.

- The discriminant property has a literal type, and can be used to assist
  narrowing the type using a conditional check:

    ```typescript
    type PoemWithPages = {
      type: 'pages';
      name: string;
      pages: number;
    };

    type PoemWithRhymes = {
      type: 'rhymes';
      name: string;
      rhymes: boolean;
    };

    type Poem = PoemWithPages | PoemWithRhymes;

    const poem: Poem = Math.random() > 0.5
      ? { name: "The Double Image", pages: 7, type: "pages" }
      : { name: "Her Kind", rhymes: true, type: "rhymes" };

    if (poem.type === "pages") {
        console.log(`It's got pages: ${poem.pages}`); // Ok
    } else {
        console.log(`It rhymes: ${poem.rhymes}`);
    }
    ```

- It's possible to define a 'default' discriminated type, by declaring the
  discriminator to be optional, e.g.:

    ```typescript
    // This is the default type
    type Circle = {
        kind?: "circle";
        radius: number;
    }

    type Square = {
        kind: "square",
        sideLength: number;
    }

    type Shape = Circle | Square

    function calculateArea(shape: Shape) {
        if (shape.kind === "square") {
            return shape.sideLength * shape.sideLength;
        } else {
            return Math.PI * shape.radius * shape.radius;
        }
    }

    // we can now call `calculateArea` with an object that doesn't have a
    // `kind` property, and it'll behave as if it's a `Circle`:
    calculateArea({ radius: 5 });
    ```


## Discriminated Tuples

- As well as definiting discriminated unions as objects, it's possible to do
  something similar with tuples, e.g.:

    ```typescript
    type ApiResponse = ["success", User[]] | ["error", string];

    async function fetchData(): Promise<ApiResponse> {
        // implementation omitted
    }
    ```

- Discriminated tuples can be destructured and we can match on the discriminator
  in a `switch` statement:

    ```typescript
    async function example() {
        // the tuple can be destructured
        const [status, value] = await fetchData();

        switch (status) {
            case "success":
                type successTypeTest = Expect<Equal<typeof value, User[]>>;
                break;
        case "error":
                type errorTypeTest = Expect<Equal<typeof value, string>>;
                break;
        }
    }
    ```


## Intersection Types

- Intersection types are the dual of union types, and represent a type that is
  multiple types at the same time.

- Intersection types are typically used with aliased object types to create a
  new type that combines multiple existing object types using the `&` operator:

    ```typescript
    type Artwork = {
      genre: string;
      name: string;
    };

    type Writing = {
      pages: number;
      name: string;
    };

    // This is equivalent to `{ genre: string; name: string; pages: number; }`
    type WrittenArt = Artwork & Writing
    ```

- Be aware that assignability error messages from TypeScript get harder to read
  with complex intersection types (especially ones combined with a union type).

- It's also possible to create a type that cannot be inhabited - the so-called
  `never` type:

    ```typescript
    // Type: never
    type NotPossible = number & string;
    ```

- It's possible to use intersection types to extract common properties into
  a 'base entity'.  However, it's more common to use [Interfaces](Interfaces.md)
  for this:

    ```typescript
    type BaseEntity = {
        id: string;
        createdAt: Date;
    }

    type User = {
        name: string;
        email: string;
    } & BaseEntity;

    type Product = {
        description: string;
        price: number;
    } & BaseEntity;
    ```



<!-- References -->
