
// Write your announceCharacter function here! ✨
// You'll need to export it so the tests can run it.

export interface Character {
	name: string;
	powers: string[];
	side: "good" | "evil";
}

export function announceCharacter(rawInput: string) {
  const anyCharacter = JSON.parse(rawInput) as Character;

  console.log(`I am ${anyCharacter.name}.`);
  console.log(`My powers are: ${anyCharacter.powers.join(", ")}.`);
  console.log(`I am ${anyCharacter.side}.`);

  return anyCharacter;
}
