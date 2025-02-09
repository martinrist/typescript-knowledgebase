// Write your classes here! ✨
// You'll need to export them so the tests can run them.
export abstract class Horror {
  abstract readonly name: string;

  #consumed: Consumed[] = [];

  doBattle(opponent: Horror) {
    if (this.getPower() >= opponent.getPower()) {
      this.#consume(opponent);
    }
  }

  #consume(opponent: Horror) {
    this.#consumed.push({
      evil: opponent.isEvil(),
      name: opponent.name,
      power: opponent.getPower()
    });
  }

  getPower(): number {
    return this.#consumed.reduce(
      (previous, consumed) => previous + this.getPowerFrom(consumed),
        this.#consumed.length
    );
  }

  protected abstract getPowerFrom(consumed: Consumed): number;

  protected abstract isEvil(): boolean;
}

interface Consumed {
  evil: boolean;
  name: string;
  power: number;
}

export class Demon extends Horror {
  readonly name = "Demon";

  protected getPowerFrom(consumed: Consumed): number {
    return consumed.evil ? consumed.power / 2 : consumed.power * 2;
  }

  protected isEvil(): boolean {
    return true;
  }
}

export class Sorcerer extends Horror {
  readonly name: string;
  #evil: boolean;

  constructor(name: string, evil: boolean) {
    super();
    this.name = name;
    this.#evil = evil;
  }

  getPowerFrom(consumed: Consumed): number {
    return consumed.evil === this.#evil ? consumed.power * 2 : consumed.power;
  }

  isEvil(): boolean {
    return this.#evil;
  }
}
