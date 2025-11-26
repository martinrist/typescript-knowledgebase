// Write your describeLandmark function here! ✨
// You'll need to export it so the tests can run it.
export interface BaseLandmark {
  name: string;
}

export interface Mountain extends BaseLandmark {
  type: "mountain";
  height: number;
}

export interface Park extends BaseLandmark {
  type: "park";
  acres: number;
}

export interface Lighthouse extends BaseLandmark {
  type: "lighthouse";
  height: number;
  lit: number;
}

export interface Lake extends BaseLandmark {
  type: "lake";
  miles: number;
}

export interface Waterfall extends BaseLandmark {
  type: "waterfall";
  height: number;
}

export interface River extends BaseLandmark {
  type: "river";
  depth: number;
  length: number;
}

export interface Fort extends BaseLandmark {
  type: "fort";
}

export type Landmark =
  | Mountain
  | Park
  | Lighthouse
  | Lake
  | Waterfall
  | River
  | Fort;

export function describeLandmark(landmark: Landmark): string {
  const lines: string[] = [];

  lines.push(`${landmark.name} is a ${landmark.type} in Upstate New York.`);

  switch (landmark.type) {
    case "fort":
      break;
    case "lake":
      lines.push(`It covers ${landmark.miles} square miles of water.`);
      break;
    case "lighthouse":
      lines.push(`It was first lit in ${landmark.lit} and is ${landmark.height} feet high.`);
      break;
    case "mountain":
      lines.push(`Its peak is ${landmark.height} feet high.`);
      break;
    case "park":
      lines.push(`It covers ${landmark.acres} square acres.`);
      break;
    case "river":
      lines.push(
        `It flows for ${landmark.length} miles and is ${landmark.depth} feet deep at its deepest.`,
      );
      break;
    case "waterfall":
      lines.push(`It is ${landmark.height} feet high.`);
      break;
  }

  return lines.join("\n");
}
