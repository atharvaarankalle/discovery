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
const tokenMiddleware = async (req: Request, res: Response, next: any) => {
    if (!SPOTIFY_API_ACCESS_TOKEN || Date.now() >= TOKEN_EXPIRATION_TIME) {
        try {
            const { data } = await axios.post("https://accounts.spotify.com/api/token", null, {
                params: {
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                    grant_type: "client_credentials"
                }
            });
            SPOTIFY_API_ACCESS_TOKEN = data.access_token;
            TOKEN_EXPIRATION_TIME = Date.now() + (data.expires_in * 1000);
        } catch (error) {
            console.error("Error fetching Spotify API access token: ", error);
            res.status(500).send('Internal Server Error');
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
        title: trackData.name,
        artist: trackData.artists.map((artist: any) => artist.name).join(", "),
        album: trackData.album.name || "",
        albumArt: trackData.album.images.find((image: any) => image.height === 300)?.url || "",
        previewUrl: trackData.preview_url ? trackData.preview_url : undefined,
        openInSpotifyUrl: !trackData.preview_url ? trackData.external_urls.spotify : undefined
    };
}

/**
 * GET /api/songs/search
 * 
 * Searches for a certain number of songs from the Spotify API based on a search query provided in the query parameters.
 * 
 * Query Parameters:
 * - searchQuery: The query to search for songs (required)
 * - numSongs: The number of songs to search for (default: 6)
 * - page: The page number of the search results (default: 1)
 * 
 * Response:
 * An array of objects, each containing the following information about a song:
 * - id: The Spotify ID of the song
 * - title: The title of the song
 * - artist: The artist(s) of the song
 * - album: The album of the song
 * - albumArt: The URL of the album art for the song
 * - previewUrl: The URL of the song preview on Spotify (if available)
 * - openInSpotifyUrl: The URL to open the song in the Spotify app (if no preview URL is available)
 * 
 * Response Codes:
 * - 200 OK: Successful request
 * - 400 Bad Request: No search query or page number was provided
 * - 401 Unauthorized: The Spotify API access token is invalid
 * - 404 Not Found: No songs were found matching the search query
 */

router.get("/search", tokenMiddleware, async (req: Request, res: Response) => {
    // Get values from query parameters passed from the frontend
    const searchQuery: string | undefined = req.query.searchQuery && String(req.query.searchQuery);
    const numSongs: number = Number(req.query.numSongs) || 6;
    const page: number | undefined = req.query.page ? Number(req.query.page) : undefined;

    // If no song title or page number is provided, send a 400 Bad Request response
    if (!searchQuery || !page) {
        res.status(400).send("Please provide a song title and page number");
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
                Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`
            }
        });

        // If no songs are found matching the search query, send a 404 Not Found response
        if (response.data.tracks.items.length === 0) {
            res.status(404).send("No songs found matching the search query");
            return;
        }

        // Extract the relevant information from the Spotify API response and send it back to the frontend
        const responseData = response.data.tracks.items.map((track: any) => {
            return formatResponseData(track);
        });

        res.status(200).send(responseData);
    } catch (error: any) {
        switch (error.response.data.error.status) {
            case 401:
                res.status(401).send("Unauthorized");
                return;
            default:
                res.status(error.response.data.error.status).send(error.message);
        }
    }
});

/**
 * GET /api/songs/:id
 * 
 * Retrieves information about a song from the Spotify API based on the Spotify ID provided in the path parameters.
 * 
 * Path Parameters:
 * - id: The Spotify ID of the song
 * 
 * Response:
 * An object containing the following information about the song:
 * - id: The Spotify ID of the song
 * - title: The title of the song
 * - artist: The artist(s) of the song
 * - album: The album of the song
 * - albumArt: The URL of the album art for the song
 * - previewUrl: The URL of the song preview on Spotify (if available)
 * - openInSpotifyUrl: The URL to open the song in the Spotify app (if no preview URL is available)
 * 
 * Response Codes:
 * - 200 OK: Successful request
 * - 400 Bad Request: Invalid Spotify ID
 * - 401 Unauthorized: The Spotify API access token is invalid
 * - 404 Not Found: The song with the specified ID was not found
 */
router.get("/:id", tokenMiddleware, async (req: Request, res: Response) => {
    const spotifySongId = req.params.id;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${spotifySongId}`, {
            headers: {
                Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`
            }
        });

        const responseData = formatResponseData(response.data);

        res.status(200).send(responseData);
    } catch (error: any) {
        switch (error.response.data.error.status) {
            case 400:
                res.status(400).send("Invalid Spotify ID");
                break;
            case 401:
                res.status(401).send("Unauthorized");
                break;
            case 404:
                res.status(404).send("Song with the specified ID not found");
                break;
            default:
                res.status(error.response.data.error.status).send(error.message);
        }
    }
});

export default router;
