// Write your describeCity function here! ✨
// You'll need to export it so the tests can run it.
type Coordinate = [number, number, number];
type Coordinates = {
  north: Coordinate;
  west: Coordinate;
}

export interface City {
  name: string;
  catchphrase?: string;
  coordinates: Coordinates;
}

function describeCoordinates(coordinates: Coordinates): string {
  function formatNumber(n: number): string {
    return n.toString().padStart(2, '0');
  }

  function formatComponent(component: Coordinate): string {
    return `${formatNumber(component[0])}°${formatNumber(component[1])}'${formatNumber(component[2])}"`;
  }

  return `${formatComponent(coordinates.north)}N ${formatComponent(coordinates.west)}W`;
};

export function describeCity(city: City): string {
  const resultLines = [];
  resultLines.push(`${city.name}, New York`);
  if (city.catchphrase) {
    resultLines.push(`* "${city.catchphrase}"`);
  }
  resultLines.push(`* Located at ${describeCoordinates(city.coordinates)}`);

  return resultLines.join('\n');
}
