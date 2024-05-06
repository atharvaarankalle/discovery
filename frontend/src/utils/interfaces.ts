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

export interface User {
  displayName: string;
  streakCount: number;
  likedSongs: string[];
  suggestedSongs: string[];
  profilePic?: string;
  hasSubmitted: boolean;
}
