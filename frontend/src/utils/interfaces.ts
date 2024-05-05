/*
 * Commonly used interfaces for proptypes
 */

/**
 * SongData object prop types
 *    songTitle: title of the song
 *    artists: artist/s of the song
 *    album: album the song is from
 *    albumArtSrc: url link to the album art image url
 *    songAudioSrc: url link to the song preview audio (OPTIONAL)
 *    openInSpotifyUrl: url link to the song on spotify (REQUIRED FOR SONGS WITHOUT PREVIEW)
 */
export interface SongData {
  songTitle: string;
  artists: string;
  album: string;
  albumArtSrc: string;
  songAudioSrc?: string;
  openInSpotifyUrl?: string;
}
