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

/**
 * @interface SongSuggestionData
 * * `id`: required number, uniquely identifies the song suggestion
 * * `songData`: required {@link SongData} object, containing songTitle, artist/s, album name, album art, preview audio or open in spotify url if no preview audio
 * * `username`: required string, the display name of the user who posted the suggestion
 * * `caption`: optional string, contains the suggestion caption
 * * `profilePictureSrc`: optional string, contains the user's profile picture src
 *
 * */
export interface SongSuggestionData {
  id: number;
  songData: SongData;
  username: string;
  caption?: string;
  profilePictureSrc?: string;
}
