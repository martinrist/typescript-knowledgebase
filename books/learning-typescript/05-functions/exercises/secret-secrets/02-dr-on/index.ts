// Write your createAdvancedCipher function here! ✨
// You'll need to export it so the tests can run it.

type Cipher = (character: string) => string;

export function createAdvancedCipher(
  onVowel: Cipher,
  onConsonant: Cipher,
  onPunctuation: Cipher
) {

  return (text: string) => {
    let result = '';

    for (const char of text) {
      result +=
        /[aeiou]/i.test(char)
          ? onVowel(char)
          : /[bcdfghjklmnpqrstvwxyz]/i.test(char)
            ? onConsonant(char)
            : onPunctuation(char);
    }

    return result;

  };

}
