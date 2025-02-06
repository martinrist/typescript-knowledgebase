console.log("Hello world");

const elements = [true, null, undefined, 42];

const warriors = ["Artemisia", "Boudica"];


// Type is either a string or an array of numbers
let stringOrArrayOfNumbers: string | number[];
stringOrArrayOfNumbers = "forty two";
stringOrArrayOfNumbers = [1, 2, 3, 4];

// Type is an array of elements, each of which is either a number or
// a string
let arrayOfStringOrNumber: (string | number)[];
arrayOfStringOrNumber = ["one", 2, "three"];

let foo = warriors[200];
console.log(typeof(foo));

const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];
const soldierAges = [90, 19, 45];

const conjoined = [...soldiers, ...soldierAges]
console.log(conjoined);


function logWarriors(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

logWarriors("Hello", ...warriors);

let yearAndWarrior: [number, string];

yearAndWarrior = [530, "Tomyris"];
// yearAndWarrior = [530]

