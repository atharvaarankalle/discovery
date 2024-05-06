/*
 * Commonly used interfaces for proptypes
 */

/**
 * @interface SongData
 * * `id`: required string, uniquely identifies the song
 * * `songTitle`: required string, the title of the song
 * * `artists`: required string, the name/s of the artist/s of the song
 * * `album`: required string, the names of the album the song is from
 * * `albumArtSrc`: required string, the url link to the album art image url
 * * `songAudioSrc`: optional string, containing the url link to the song's preview audio
 * * `openInSpotifyUrl`: optional string, containing the url link to the song on spotify web
 *
 */
export interface SongData {
  id: string;
  songTitle: string;
  artists: string;
  album: string;
  albumArtSrc: string;
  songAudioSrc?: string;
  openInSpotifyUrl?: string;
}
