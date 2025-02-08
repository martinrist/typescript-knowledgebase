// Write your unrollPlaylist function and types here! ✨
// You'll need to export the function so the tests can run it.


export interface Song {
  type: 'song';
  artist: string | string[];
  length: number;
  name: string;
}

export interface Album {
  type: 'album';
  songs: Song[];
}

export interface Playlist {
  type: 'playlist';
  resolve(): [Song];
}

export type PlaylistItem = Album | Song | Playlist;

export interface Artists {
  [i: string]: string[];
}

export interface UnrolledPlaylist {
  artists: Artists;
  songs: string[];
  time: number;
}

export function unrollPlaylist(items: PlaylistItem[]): UnrolledPlaylist {

  let artists: Artists = {};
  let songs: string[] = [];
  let time = 0;

  function addSong(song: Song) {
    songs.push(song.name);
    time += song.length;
    const songArtists = typeof song.artist === "string"
      ? [song.artist]
      : song.artist;

    for (const songArtist of songArtists) {
      if (artists[songArtist]) {
        artists[songArtist].push(song.name);
      } else {
        artists[songArtist] = [song.name];
      }
    }
  }

  for (const item of items) {
    switch (item.type) {
      case 'song':
        addSong(item);
        break;
      case 'album':
        item.songs.forEach(addSong);
        break;
      case 'playlist':
        item.resolve().forEach(addSong);
        break;
    }
  }

  return {
    artists: artists,
    songs: songs,
    time: time
  }
}
