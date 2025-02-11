import { characters } from "./characters";

// Write your announceCharacter function here! ✨
// You'll need to export it so the tests can run it.

interface Character {
  name: string;
  powers: string[];
  side: 'good' | 'evil';
}

export function announceCharacter(rawText: string) {
  const character = JSON.parse(rawText) as Character;

  console.log(`I am ${character.name}.`);
  console.log(`My powers are: ${character.powers.join(", ")}.`);
  console.log(`I am ${character.side}.`);

  return character;
}
