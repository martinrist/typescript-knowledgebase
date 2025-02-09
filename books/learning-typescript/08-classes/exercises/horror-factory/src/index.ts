// Write your class and functions here! ✨
// You'll need to export the class and functions so the tests can run it.
interface HorrorSettings {
  name: string;
  getPowerFrom: (consumed: Consumed) => number;
  isEvil: () => boolean;
}

export class Horror {
  readonly name: string;
  readonly isEvil: () => boolean;
  readonly #getPowerFrom: (consumed: Consumed) => number;

  #consumed: Consumed[] = [];

  constructor({name, getPowerFrom, isEvil}: HorrorSettings) {
    this.isEvil = isEvil;
    this.name = name;
    this.#getPowerFrom = getPowerFrom;
  }

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
      (previous, consumed) => previous + this.#getPowerFrom(consumed),
        this.#consumed.length
    );
  }

}


interface Consumed {
  evil: boolean;
  name: string;
  power: number;
}

const demonSettings: HorrorSettings = {
  name: "Demon",
  getPowerFrom: (consumed: Consumed) => {
    return consumed.evil ? consumed.power / 2 : consumed.power * 2;
  },
  isEvil: () => true,
}

export function createDemon() {
  return new Horror(demonSettings);
}

export function createSorcerer(name: string, evil: boolean) {
  return new Horror({
    name,
    getPowerFrom: (consumed: Consumed) =>
      consumed.evil === evil ? consumed.power * 2 : consumed.power,
    isEvil: () => evil,
  });
}
