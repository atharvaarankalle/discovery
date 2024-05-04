/*
 * Commonly used interfaces for proptypes
 */

// SongData object prop types
export interface SongData {
  songTitle: string;
  artists: string;
  album: string;
  albumArtSrc: string;
  songAudioSrc?: string;
  openInSpotifyUrl?: string;
}
