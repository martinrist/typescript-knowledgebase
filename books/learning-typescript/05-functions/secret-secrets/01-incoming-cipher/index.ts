// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.
export function createCipher(cipher: (character: string) => string) {
  return (text: string) => {
    let result = '';

    for (const character of text) {
      result += cipher(character);
    }

    return result;
  };
}

export type Cipher = (character: string) => string;
