// Write your createAdvancedCipher function here! ✨
// You'll need to export it so the tests can run it.
export type Cipher = (text: string) => string;

export function createAdvancedCipher(
  onVowel: Cipher,
  onConsonant: Cipher,
  onPunctuation: Cipher,
): Cipher {
  return (text: string) => {
    let result = "";
    for (const char of text) {
      const cipher = char.match(/[aeiou]/i)
        ? onVowel
        : char.match(/[bcdfghjklmnpqrstvwxyz]/i)
          ? onConsonant
          : onPunctuation;
      result += cipher(char);
    }
    return result;
  };
}
