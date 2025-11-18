// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.
export type Cipher = (text: string) => string;

export function createCipher(cipher: Cipher) {
  return (text: string) => {
    let result = "";
    for (const char of text) {
      result += cipher(char);
    }
    return result;
  }
}
