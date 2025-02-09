// Write your type and classes here! ✨
// You'll need to export the classes so the tests can run them.

export type SmallPetFood =
  | "bugs"
  | "fruits"
  | "insects"
  | "plants"
  | "seeds"
  | "vegetables"

export abstract class SmallFurryPet {
  readonly species: string;
  protected happiness = 0;

  constructor(species: string) {
    this.species = species;
  }

  abstract eats(food: SmallPetFood): boolean;

  isHappy(): boolean {
    return this.happiness > 0;
  }
}

export class Gerbil extends SmallFurryPet {
  constructor() {
    super("Gerbil");
  }

  dig() {
    this.happiness += 1;
  }

  eats(food: SmallPetFood): boolean {
    return ["insects", "plants", "seeds", "vegetables"].includes(food);
  }

}

export class Hamster extends SmallFurryPet {
  constructor() {
    super("Hamster");
  }

  run() {
    this.happiness += 1;
  }

  eats(_: SmallPetFood): boolean {
    return true;
  }
}

