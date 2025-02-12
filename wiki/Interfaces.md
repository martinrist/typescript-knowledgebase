# Interfaces

## Type Aliases vs Interfaces

- Type aliases for object types are a way to describe object types.  Interfaces
  are an alternative, with very similar syntax:

    ```typescript
    type PoetTypeAlias = {
      born: number;
      name: string;
    };

    interface PoetInterface {
      born: number;
      name: string;
    }
    ```

- Note that people who prefer semicolons generally put them after type aliases,
  but not after interfaces.

- Key differences between type aliases & interfaces:
    - Interfaces can be 'merged' together to be augmented.
    - Interfaces can be used to type check the structure of class declarations,
      while type aliases cannot.
    - Interfaces are generally faster for the type checker to evaluate
      because they declare a named type that can be more easily cached.
    - Because interfaces are considered named objects, rather than aliases,
      their error messages are typically more readable in complex cases.


## Types of Properties

- As with object types, interface properties can be optional, indicated with `?`
  before the type annotation:

    ```typescript
    interface Book {
      author?: string;
      pages: number;
    };

    // Ok
    const ok: Book = {
      pages: 123
    };
    ```

- The `readonly` modifier can be used to indicate that, once set, the property
  cannot be set to a different value:

    ```typescript
    interface Page {
      readonly text: string;
    }

    function read(page: Page) {
      // OK - reading
      console.log(page.text);

      // Error - cannot assign to 'text' because it is a read-only property
      // page.text += "!";
    }
    ```

- Note that `readonly` modifiers only apply where objects are used in a location
  that declare them to be of that interface.

- Object members in JavaScript are often functions.  TypeScript provides two
  ways of declaring interface members as functions:
    - _Method syntax_ - declaring as a function like `member(): void`
    - _Property syntax_ - declaring as a property that is equal to a standalone
      function, like `member: () => void`

    ```typescript
    interface HasBothFunctionTypes {
      property: () => string;
      method(): string;
    }

    const hasBoth: HasBothFunctionTypes = {
      property: () => "",
      method() {
        return "";
      };

    hasBoth.property();         // OK
    hasBoth.method();           // Also OK
    ```

- Interfaces can also be used to define function types, by providing a _call
  signature_, which looks similar to a method signature, but has no name:

    ```typescript
    interface CallSignature {
      (input: string): number;
    }

    const typedCallSignature: CallSignature = (input) => input.length;
    ```

- It's also possible to declare _index signatures_, which allow objects to store
  values under arbitrary keys, without having to specify those keys explicitly
  in an interface.

- Index signatures look like regular property definitions, but with a type after
  the key, and array brackets surrounding the key - e.g. `{ [i: string}: ... }`:

    ```typescript
    interface WordCounts {
      [i: string]: number;
    }

    const counts: WordCounts = {};

    // OK
    counts.apple = 0;
    counts.banana = 1;
    ```


## Nested Interfaces

- Just as object types can be nested as properties of other object types,
  interface types can also be nested:

    ```typescript
    interface Novel {
      author: {
        name: string;
      };
      setting: Setting;
    }

    interface Setting {
      place: string;
      year: number;
    }

    let myNovel: Novel = {
      author: {
        name: "Me"
      },
      setting: {
        place: "England",
        year: 2025
      }
    }
    ```


## Interface Extensions

- TypeScript allows interfaces to _extend_ each other - enabling common
  members to be extracted to a base interface.

    ```typescript
    interface Writing {
      title: string;
    }

    interface Novella extends Writing {
      pages: number;
    }

    // OK
    let myNovella: Novella = {
      pages: 185,
      title: "My Novella",
    };

    // @ts-expect-error Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
    let missingPages: Novella = {
      title: "The Awakening",
    };

    let extraProperty: Novella = {
      pages: 300,
      // @ts-expect-error Object literal may only specify known properties, and 'strategy' does not exist in type 'Novella'.
      strategy: "baeline",
      title: "Properties"
    };
    ```

- Derived interfaces may _override_ or replace properties from their base
  interface by redeclaring the property with a different type (provided that
  overridden type is assignable to the base type:

    ```typescript
    interface WithNullableName {
      name: string | null;
    }

    interface WithNonNullableName extends WithNullableName {
      name: string;
    }
    ```

- Interfaces can extend multiple other interfaces (with names separated by
  commas after the `extends` keyword:

    ```typescript
    interface GivesNumber {
      giveNumber(): number;
    }

    interface GivesString {
      giveString() : string;
    }

    interface GivesBothAndEither extends GivesNumber, GivesString {
      giveEither(): number | string;
    }
    ```


## Interface Merging

- Interfaces can be _merged_ - two (or more) interfaces declared in the same
  scope with the same name will join into one bigger interface under that name
  with all declared fields:

    ```typescript
    interface Merged {
      firstProperty: string;
      firstMethod(): number;
    }

    interface Merged {
      secondProperty: number;
      secondMethod(): string;
    }

    let merged: Merged = {
      firstProperty: "first",
      firstMethod: () => 1,
      secondProperty: 2,
      secondMethod() {
        return "two";
      }
    }
    ```

- Merged interfaces may not declare the same property name multiple times with
  different types - all types must be the same.



<!-- References -->
