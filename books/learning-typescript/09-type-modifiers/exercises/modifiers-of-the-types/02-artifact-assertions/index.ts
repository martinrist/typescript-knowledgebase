// Write your types and function below! ✨
// You'll need to export them so the tests can run it.

const artifacts = {
  "Black Garnet": {
    type: "magic",
  },
  "Castle TypeScript": {
    type: "fortress",
  },
  "Cosmic Key": {
    type: "device",
  },
  "Power Sword": {
    type: "sword",
  },
  Starseed: {
    type: "magic",
  },
  "Sword of the Ancients": {
    type: "sword",
  },
};

export type ArtifactName = keyof typeof artifacts;

export function getArtifactType(name: ArtifactName) {
  return artifacts[name].type;
}
