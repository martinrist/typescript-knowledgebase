console.log('Chapter 7 - Interfaces');
console.log('----------------------');

type PoetTypeAlias = {
  born: number;
  name: string;
};

interface PoetInterface {
  born: number;
  name: string;
}

let valueLater: PoetInterface;

valueLater = {
  born: 1935,
  name: 'Sara Teasdale'
}

// Error: Property 'name' is missing in type '{ born: number; }' but required in type 'PoetInterface'
// valueLater = {
//   born: 1935
// }

interface Page {
  readonly text: string;
}

function read(page: Page) {
  // OK - reading
  console.log(page.text);

  // Error - cannot assign to 'text' because it is a read-only property
  // page.text += "!";
}

const pageOne: Page = {
  text: "This is the first page"
};

read(pageOne);

interface CallSignature {
  (input: string): number;
}

const typedCallSignature: CallSignature = (input) => input.length;

interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

// OK
counts.apple = 0;
counts.banana = 1;

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
