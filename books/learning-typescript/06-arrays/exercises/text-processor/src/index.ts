// Write your alignTexts function here! ✨
// You'll need to export it so the tests can run it.
type AlignmentOptions = {
  align?: "left" | "middle" | "right";
  width: number;
};

export function alignTexts(texts: string[], options: AlignmentOptions): string[][] {
  const alignedTextsLines: string[][] = [];

  for (const text of texts) {
    const lines = splitLines(text, options.width);
    const aligned = alignLines(lines, options);

    alignedTextsLines.push(aligned);
  }

  return alignedTextsLines;
}

function splitLines(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";

  for (const word of text.split(" ")) {
    if (line === "") {
      line = word;
    } else if (line.length + word.length < width) {
      line += ` ${word}`;
    } else {
      lines.push(line);
      line = word;
    }
  }

  lines.push(line);

  return lines;
}

function alignLines(lines: string[],
                    { align = "left", width }: AlignmentOptions
): string[] {
  const aligned: string[] = [];

  for (const line of lines) {
    const remainingSpaces = width - line.length;
    let newLine = line;

    if (remainingSpaces) {
      switch (align) {
        case "left":
          for (let i = 0; i < remainingSpaces; i++) {
            newLine += " ";
          }
          break;

        case "middle":
          for (let i = 0; i < Math.ceil(remainingSpaces / 2); i++) {
            newLine += " ";
          }
          for (let i = 0; i < Math.floor(remainingSpaces / 2); i++) {
            newLine = " " + newLine;
          }
          break;

        case "right":
          for (let i = 0; i < remainingSpaces; i++) {
            newLine = " " + newLine;
          }
          break;
      }
    }

    aligned.push(newLine);
  }

  return aligned;
}
