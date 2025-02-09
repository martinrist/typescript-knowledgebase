// Write your Parrot class here! ✨
// You'll need to export it so the tests can run it.
export class Parrot {
  #name: string;
  #phrases: string[] = []

  constructor(name: string) {
    this.#name = name;
    this.#phrases = [`${this.#name} wants a cracker!`];
  }

  announce(): string {
    return `Squawk! I'm ${this.#name}!`;
  }

  learn(newPhrase: string) {
    this.#phrases.push(newPhrase);
  }

  speak(): string {
    const index = Math.floor(Math.random() * this.#phrases.length);
    return this.#phrases[index];
  }
}
