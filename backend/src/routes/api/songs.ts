import express, { Request, Response, Router } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();
let SPOTIFY_API_ACCESS_TOKEN: string = "";
let TOKEN_EXPIRATION_TIME: number = -1;

/**
 * This middleware function is used to fetch a new Spotify API access token if the current token is invalid or has expired.
 *
 * @param req The request object
 * @param res The response object
 * @param next The next middleware function to call
 */
export const spotifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: any
) => {
  if (!SPOTIFY_API_ACCESS_TOKEN || Date.now() >= TOKEN_EXPIRATION_TIME) {
    try {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        }
      );
      SPOTIFY_API_ACCESS_TOKEN = data.access_token;
      TOKEN_EXPIRATION_TIME = Date.now() + data.expires_in * 1000;
    } catch (error) {
      console.error("Error fetching Spotify API access token: ", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
  next();
};

/**
 * Given a track object from the Spotify API, this function extracts the relevant information and returns it in a new object.
 *
 * @param trackData The track object from the Spotify API
 * @returns An object containing the relevant information about the track
 */
const formatResponseData = (trackData: any) => {
  return {
    id: trackData.id,
    songTitle: trackData.name,
    artists: trackData.artists.map((artist: any) => artist.name).join(", "),
    album: trackData.album.name || "",
    albumArtSrc: trackData.album.images.find(
      (image: any) => image.height === 300
    )?.url,
    songAudioSrc: trackData.preview_url ? trackData.preview_url : undefined,
    openInSpotifyUrl: !trackData.preview_url
      ? trackData.external_urls.spotify
      : undefined,
  };
};

/**
 * @function getTrackBySpotifyId
 *
 * Retrieves information about a song from the Spotify API based on the Spotify ID provided in the path parameters.
 *
 * Parameters:
 * - spotifySongId: The Spotify ID of the song (required string)
 *
 * Response:
 * A songData object containing the following information about the song:
 * - id: The Spotify ID of the song
 * - title: The title of the song
 * - artist: The artist(s) of the song
 * - album: The album of the song
 * - albumArt: The URL of the album art for the song
 * - previewUrl: The URL of the song preview on Spotify (if available)
 * - openInSpotifyUrl: The URL to open the song in the Spotify app (if no preview URL is available)
 *
 */
export const getTrackBySpotifyId = async (spotifySongId: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${spotifySongId}`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`,
        },
      }
    );
    return formatResponseData(response.data);
  } catch (error: any) {
    return error;
  }
};

/**
 * GET /api/songs/search
 *
 * Searches for a certain number of songs from the Spotify API based on a search query provided in the query parameters.
 *
 * Query Parameters:
 * - searchQuery: The query to search for songs (required)
 * - numSongs: The number of songs to search for, with the default being 6
 * - page: The page number of the search results, with the default being 1 (required)
 *
 * Response:
 * An array of objects, each containing the following information about a song:
 * - id: The Spotify ID of the song
 * - songTitle: The title of the song
 * - artists: The artist(s) of the song
 * - album: The album of the song
 * - albumArtSrc: The URL of the album art for the song
 * - songAudioSrc: The URL of the song preview on Spotify (if available)
 * - openInSpotifyUrl: The URL to open the song in the Spotify app (if no preview URL is available)
 *
 * Response Codes:
 * - 200 OK: Successful request
 * - 400 Bad Request: No search query or page number was provided
 * - 401 Unauthorized: The Spotify API access token is invalid
 * - 404 Not Found: No songs were found matching the search query
 */
router.get(
  "/search",
  spotifyTokenMiddleware,
  async (req: Request, res: Response) => {
    // Get values from query parameters passed from the frontend
    const searchQuery: string | undefined =
      req.query.searchQuery && String(req.query.searchQuery);
    const numSongs: number = Number(req.query.numSongs) || 6;
    const page: number | undefined = req.query.page
      ? Number(req.query.page)
      : undefined;

    // If no song title or page number is provided, send a 400 Bad Request response
    if (!searchQuery || !page) {
      res
        .status(400)
        .json({ error: "Please provide a song title and page number" });
      return;
    }

    try {
      // Calculate the offset for the search query based on the page number
      const searchOffset = (page - 1) * numSongs;

      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: searchQuery,
          type: "track",
          limit: numSongs,
          offset: searchOffset,
        },
        headers: {
          Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`,
        },
      });

      // If no songs are found matching the search query, send a 404 Not Found response
      if (response.data.tracks.items.length === 0) {
        res
          .status(404)
          .json({ error: "No songs found matching the search query" });
        return;
      }

      // Extract the relevant information from the Spotify API response and send it back to the frontend
      const responseData = response.data.tracks.items.map((track: any) => {
        return formatResponseData(track);
      });

      res.status(200).json(responseData);
    } catch (error: any) {
      switch (error.response.data.error.status) {
        case 401:
          res.status(401).json({ message: "Unauthorized" });
          return;
        default:
          res
            .status(error.response.data.error.status)
            .json({ message: error.message });
      }
    }
  }
);

export default router;
