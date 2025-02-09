console.log('Chapter 8 - Classes');
console.log('-------------------');

class Greeter {
  constructor() {
    console.log("Creating a new Greeter");
  }

  greet(name: string) {
    console.log(`${name}, do your stuff!`);
  }
}

new Greeter().greet("Miss Frizzle");

class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;
    console.log(`We're going to ${this.destination}!`);
  }
}

const fieldTrip = new FieldTrip('Hereford');
console.log(fieldTrip.destination);

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

class WithValue {
  immediate = 0;
  later: number;
  mayBeUndefined: number | undefined;

  // @ts-expect-error: Property 'unused' has no initializer and is not definitely assigned in the constructor.
  unused: number;

  constructor() {
    this.later = 1;
  }
}

class MyClass {
  property!: string
}

const myClass = new MyClass();
console.log(`The value of myClass.property is ${myClass.property}`);
console.log(myClass.property === undefined);

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

