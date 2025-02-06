console.log("Hello world");

function sing(song: string) {
  console.log(`Singing: ${song}`);
}

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("Greensleeves");
announceSong("Chandelier", "Sia");

function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph");
rateSong("Set Fire to the Rain", 5);

function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");

function getStringOrNumber() {
  const random = Math.random();
  if (random) {
    return random.toString();
  } else {
    return random;
  }
}

getStringOrNumber()

function singsongsrecursive(songs: string[], count = 0): number {
  return songs.length ? singsongsrecursive(songs.slice(1), count + 1): count;
}

function returnsVoid(): void {
  return;
}

function returnsUndefined(): undefined {
  return;
}

// const notDefined: undefined = returnsVoid();
const notDefined: undefined = returnsUndefined();

function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

console.log(createDate(554356800));
console.log(createDate(7, 27, 1987));
