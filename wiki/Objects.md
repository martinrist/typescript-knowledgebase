# Objects

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
  place of values:

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


## Structural Typing

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

- For objects to be assignable in this way, the ymust have all the object type's
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

- Excess property checks only trigger for object literals being created in
  locations that are declared to be an object type - providing an existing
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

- Object type properties don't all have to be reuqired in the object - optional
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
  value contains a certain property, then the type is narrowed to only the
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

- The discriminant property is of a type literal, and can be used to assist
  narrowing the type using a conditional check:

    ```typescript
    type PoemWithPages = {
      name: string;
      pages: number;
      type: 'pages';
    };

    type PoemWithRhymes = {
      name: string;
      rhymes: boolean;
      type: 'rhymes';
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


<!-- References -->
