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

/**
* @interface User
* * `displayName`: required string, the user's username
* * `steakCount`: required number, the user's current streak count
* * `likedSongs`: required array of strings, the songs (referenced by Spotify song ID) that the user has liked
* * `suggestedSongs`: required array of strings, the songs (referenced by Spotify song ID) that the user has suggested
* * `profilePic`: optional string, the url link to the user's profile picture
* * `hasSubmitted`: required boolean, representing if the user has submitted a song suggestion today, or not
*
* */
export interface User {
  displayName: string;
  streakCount: number;
  likedSongs: string[];
  suggestedSongs: string[];
  profilePic?: string;
  hasSubmitted: boolean;

/**
 * @interface SongSuggestionData
 * * `id`: required string, uniquely identifies the song suggestion
 * * `songData`: required {@link SongData} object, containing songTitle, artist/s, album name, album art, preview audio or open in spotify url if no preview audio
 * * `username`: required string, the display name of the user who posted the suggestion
 * * `caption`: optional string, contains the suggestion caption
 * * `profilePictureSrc`: optional string, contains the user's profile picture src
 *
 * */
export interface SongSuggestionData {
  id: string;
  songData: SongData;
  username: string;
  caption?: string;
  profilePictureSrc?: string;
}
