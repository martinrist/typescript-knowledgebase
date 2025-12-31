type Animals = 'alligator' | 'baboon' | 'cat';

type AnimalCounts = {
  [K in Animals]: number;
};

const animalCounts: AnimalCounts = {
  alligator: 1,
  baboon: 2,
  cat: 3,
};

console.log(animalCounts);

// @ts-expect-error: Property 'dog' does not exist in type 'AnimalCounts'
animalCounts.dog = 4;

interface AnimalVariants {
  alligator: boolean;
  baboon: number;
  cat: string;
}

type AnimalCounts2 = {
  [K in keyof AnimalVariants]: number;
};

const animalCounts2: AnimalCounts2 = {
  alligator: 1,
  baboon: 2,
  cat: 3,
};

console.log(animalCounts2);

interface BirdVariants {
  dove: string;
  eagle: boolean;
}

type NullableBirdVariants = {
  [K in keyof BirdVariants]: BirdVariants[K] | null;
};

interface Researcher {
  researchMethod(): void;
  researchProperty: () => string;
}

type ResearcherProperties = {
  [K in keyof Researcher]: Researcher[K];
};

interface Environmentalist {
  area: string;
  name: string;
}

type ReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]: Environmentalist[K];
};

type OptionalEnvironmentalist = {
  [K in keyof Environmentalist]?: Environmentalist[K];
};

interface Conservationist {
  name: string;
  catchphrase?: string;
  readonly born: number;
  readonly died?: number;
}

type WriteableConservationist = {
  -readonly [K in keyof Conservationist]: Conservationist[K];
};

type AllRequiredConservationist = {
  [K in keyof Conservationist]-?: Conservationist[K];
};

type CheckStringAgainstNumber = string extends number ? true : false;

type CheckAgainstNumber<T> = T extends number ? true : false;

type CheckString = CheckAgainstNumber<string>;
type CheckNumber = CheckAgainstNumber<number>;

type CallableSetting<T> =
  T extends () => any
    ? T
    : () => T;

type GetNumbersSetting = CallableSetting<() => number[]>;
type StringSetting = CallableSetting<string>;


type ArrayItems<T> =
  T extends (infer Item)[]
    ? Item
    : T;

type ArrayItemsRecursive<T> =
  T extends (infer Item)[]
    ? ArrayItemsRecursive<Item>
    : T;


type NeverIntersection = never & string;

type NeverUnion = never | string;


type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;


type FirstParameter<T extends (...args: any[]) => any> =
  T extends (arg: infer Arg) => any
    ? Arg
    : never;

type GetsString = FirstParameter<(arg: string) => string>;
type GetsString2 = FirstParameter<(arg: string, arg2: number) => string>;


type OnlyStringProperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
  participants: string[];
  location: string;
  name: string;
  year: number;
}

type OnlyStringEventData = OnlyStringProperties<AllEventData>;
