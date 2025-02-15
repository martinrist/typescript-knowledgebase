# Classes

## Contents
<!-- TOC -->
* [Classes](#classes)
  * [Contents](#contents)
  * [Class Methods](#class-methods)
  * [Class Properties](#class-properties)
  * [Class Parameter Properties](#class-parameter-properties)
  * [Classes as Types](#classes-as-types)
  * [Classes & Interfaces](#classes--interfaces)
  * [Extending Classes](#extending-classes)
  * [Overriding Properties & Methods](#overriding-properties--methods)
  * [Abstract Classes](#abstract-classes)
  * [Member Visibility](#member-visibility)
<!-- TOC -->


## Class Methods

- TypeScript generally understands _class methods_ in the same way as standalone
  functions:

    ```typescript
    class Greeter {
      constructor() {
        // Constructors are like typical class methods, but with name
        // `constructor`
        console.log("Creating a new Greeter");
      }

      greet(name: string) {
        console.log(`${name}, do your stuff!`);
      }
    }

    new Greeter().greet("Miss Frizzle");
    ```


## Class Properties

- To read from or write to a property on a class, an explicit _class property_
  must be declared, using the same syntax as interfaces:

    ```typescript
    class FieldTrip {
      destination: string;

      constructor(destination: string) {
        this.destination = destination;
        console.log(`We're going to ${this.destination}!`);
      }
    }

    const fieldTrip = new FieldTrip('Hereford');
    console.log(fieldTrip.destination);
    ```

- Class members can be declared as callable functions using either _method
  syntax_ or _property syntax_:
    - _Method syntax_ - e.g. `myFunction() { }` - this syntax assigns a function
      to the class prototype, so all class instances use the same function
      definition.
    - _Property syntax_ - e.g. `myFunction = () => { }` - this syntax creates a
      new function per instance of hte class:

        ```typescript
        class WithMethod {
          myMethod() { }
        }

        // This is `true` since all instances of `WithMethod` have the same function
        // implementation
        console.log(new WithMethod().myMethod === new WithMethod().myMethod);

        class WithProperty {
          myProperty = () => { }
        }

        // This is `false` since each instances of `WithProperty` gets its own
        // implementation
        console.log(new WithProperty().myProperty === new WithProperty().myProperty);
        ```

- With strict compiler checks, TypeScript will check that each property declared
  whose type doesn't include `undefined` is assigned a value in the constructor.

- In some cases a class property is intentionally able to be unassigned after
  the constructor.  This should be avoided if possible, but if it can't, add `!`
  after the property name to disable the strict initialisation check:

    ```typescript
    class MyClass {
      property!: string;
    }
    ```

- Like interfaces, classes may declare optional properties with a type that
  includes `| undefined` by adding `?` after the property name.  They are
  allowed to not be assigned in the constructor.

- Properties can be declared as read-only by adding the `readonly` keyword
  before the declaration name:

    ```typescript
    class Quote {
      readonly text: string;

      constructor(text: string) {
        this.text = text;
      }

      emphasize() {
        // @ts-expect-error: Cannot assign to 'text' because it is a read-only property.
        this.text += "!";
      }
    }
    ```


## Class Parameter Properties

- A common idiom in JavaScript is to take a parameter in a constructor and
  immediately assign it to a class property:

    ```typescript
    class Engineer {
      readonly area: string;
      constructor(area: string) {
        this.area = area;
      }
    }
    ```

- TypeScript includes a shorthand syntax for these _class parameter
  properties_ - placing `readonly` and / or one of `public` / `protected` /
  `private` access modifiers before the constructor parameter also declares
  a property of that same name and type:

    ```typescript
    class Engineer {
      constructor(readonly area: string) { }
    }
    ```


## Classes as Types

- Class declarations create both a runtime value (the class itself) as well as a
  type that can be used in type annotations.

- TypeScript's structural typing rules apply - any object type that has the same
  members as a class is considered to be assignable to that class:

    ```typescript
    class SchoolBus {
      getAbilities() {
        return ["magic", "shapeshifting"];
      }
    }

    function withSchoolBus(bus: SchoolBus) {
      console.log(bus.getAbilities());
    }

    // OK - name of type matches
    withSchoolBus(new SchoolBus());

    // OK - the object type is assignable to `SchoolBus` because its
    // shape matches
    withSchoolBus({
      getAbilities: () => ["transmogrification"]
    });
    ```

- Note that, in reality, the above isn't typically used - we don't often pass
  object values to places that ask for class types.


## Classes & Interfaces

- Classes can declare their instances as adhering to an interface using the
  `implements` keyword.  Instances of the class are then assignable to each of
  the interfaces declared in the `implements` clause:

    ```typescript
    interface Learner {
      name: string;
      study(hours: number): void;
    }

    class Student implements Learner {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      study(hours: number) {
        for (let i = 0; i < hours; i += 1) {
          console.log("...studying...");
        }
      }
    }
    ```

- Classes may implement multiple interfaces by providing them as a
  comma-separated list in the `implements` clause.


## Extending Classes

- Types can extend (or subclass) another class by adding `extends...` after the
  derived class name:

    ```typescript
    class Teacher {
      teach() {
        console.log("Teaching TypeScript");
      }
    }

    class StudentTeacher extends Teacher {
      learn() {
        console.log("Learning Haskell");
      }
    }

    new StudentTeacher().teach();
    new StudentTeacher().learn();
    ```

- Instances of subclasses have all the members of their base class and thus are
  asssignable to the base class.

- Subclasses are not required to define their own constructor - if they don't
  they implicitly use the constructor from their base class:
    - If the derived class _does_ have a constructor, it must call its base
      class constructor using `super(...)`.
    - This must be done before accessing either `this` or `super`.


## Overriding Properties & Methods

- Subclasses may redeclare new methods with the same names as the base class as
  long as the derived method is _assignable_ to the method on the base class.

- Subclasses may also explicitly redeclare properties of their base class with
  the same name, as long as the new type is assignable to the base class
  property's type.


## Abstract Classes

- Base classes can be declared as `abstract` to denote that they cannot be
  instantiated, and must be overridden:

    ```typescript
    abstract class School {
      readonly name: string;
      constructor(name: string) {
        this.name = name;
      }
      abstract getStudentTypes(): string[];
    }

    class Preschool extends School {
      getStudentTypes(): string[] {
        return ["preschooler"];
      }
    }
    ```

- Methods can also be declared `abstract` - if a class contains any `abstract`
  methods, then the class itself must be declared `abstract`.


## Member Visibility

- Class members can have modifiers attached to denote the following levels of
  visibility:
    - `public` (default) - visible by anybody anywhere.
    - `protected` - visible only from the class itself and any subclasses.
    - `private` - visible only from within the class itself.

- These access modifiers exist purely within the type system, and are removed
  along with other type system syntax when the code is compiled to JavaScript.

- Visibility modifiers can be combined with `readonly` by putting the visibility
  modifier first - e.g. `private readonly name: string`.

- The `static` modifier can be used to denote that a member is declared on the
  class itself.  `static` can be combined with `readonly` and visibility
  modifiers in the following order: `private static readonly`.


<!-- References -->
