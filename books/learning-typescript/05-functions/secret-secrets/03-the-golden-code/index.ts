// Write your createCodeCracker function here! ✨
// You'll need to export it so the tests can run it.
export type CodeCrackerOptions = {
  attempts: number;
  makeGuess: (text: string, attempt: number) => string;
  validateGuess: (guess: string) => boolean;
}

export function createCodeCracker(options: CodeCrackerOptions): (text: string) => string | undefined {
  return (text: string) => {

    for (let i = 0; i < options.attempts; i++) {
      const guess = options.makeGuess(text, i);
      if (options.validateGuess(guess)) {
        return guess;
      }
    }

    return undefined;
  }
};
