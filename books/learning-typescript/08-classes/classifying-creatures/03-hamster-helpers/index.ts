// Write your type and classes here! ✨
// You'll need to export the classes so the tests can run them.

export type SmallPetFood = "bugs" | "fruits" | "insects" | "plants" | "seeds" | "vegetables";

export abstract class SmallFurryPet {
  readonly species: string;
  protected happiness: number = 0;
  abstract eats(food: SmallPetFood): boolean;
  isHappy(): boolean {
    return this.happiness > 0;
  }

  constructor(species: string) {
    this.species = species;
  }
}

export class Gerbil extends SmallFurryPet {
  constructor() {
    super("Gerbil");
  }

  dig() {
    this.happiness++;
  }

  eats(food: SmallPetFood): boolean {
    switch (food) {
      case "insects":
      case "plants":
      case "seeds":
      case "vegetables":
        return true;
      default:
        return false;
    }
  }
}

export class Hamster extends SmallFurryPet {
  constructor() {
    super("Hamster");
  }

  run() {
    this.happiness++;
  }

  eats(): boolean {
    return true;
  }
}
