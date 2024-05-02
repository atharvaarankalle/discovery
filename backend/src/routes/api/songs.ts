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
 * - 400 Bad Request: No song title was provided
 * - 401 Unauthorized: The Spotify API access token is invalid
 * - 404 Not Found: No songs were found matching the search query
 */
let currentSearchOffset: number = 0;
let savedSongSearch: string | undefined = undefined;
let previousPage: number = 1;
let currentLimit: number = 6;

router.get("/search", tokenMiddleware, async (req: Request, res: Response) => {
    // Get values from query parameters passed from the frontend
    const searchQuery: string | undefined = req.query.searchQuery ? String(req.query.searchQuery) : undefined;
    const numSongs: number = Number(req.query.numSongs) || 6;
    const page: number | undefined = req.query.page ? Number(req.query.page) : undefined;
    const responseData: any = [];

    // If no song title or page number is provided, send a 400 Bad Request response
    if (searchQuery === undefined || page === undefined) {
        res.status(400).send("Please provide a song title and page number");
        currentSearchOffset = 0;
        return;
    }

    // Search for songs from the Spotify API until the number of songs requested is reached
    while (responseData.length < numSongs) {
        currentSearchOffset = Math.max((page * numSongs) - numSongs, currentSearchOffset);

        // If the search query has changed, the page has changed, or the number of songs requested has changed, reset the current search offset
        if (savedSongSearch !== searchQuery || previousPage > page || currentLimit !== numSongs) {
            currentSearchOffset = 0;
        }
        savedSongSearch = searchQuery;
        previousPage = page;
        currentLimit = numSongs;

        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    q: searchQuery,
                    type: "track",
                    limit: numSongs,
                    offset: currentSearchOffset,
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

            response.data.tracks.items.map((track: any) => {
                currentSearchOffset++;
                // Only add the song to the response data if the title and artist of the song do not match any songs already in the response data 
                if (!responseData.some((song: any) => song.title === track.name && song.artist === track.artists.map((artist: any) => artist.name).join(", "))) {
                    if (responseData.length === numSongs) {
                        return;
                    }

                    responseData.push({
                        id: track.id,
                        title: track.name,
                        artist: track.artists.map((artist: any) => artist.name).join(", "),
                        album: track.album.name || "",
                        albumArt: track.album.images.find((image: any) => image.height === 300)?.url || "",
                        previewUrl: track.preview_url ? track.preview_url : undefined,
                        openInSpotifyUrl: !track.preview_url ? track.external_urls.spotify : undefined
                    });
                }
            });
        } catch (error: any) {
            switch (error.response.data.error.status) {
                case 401:
                    res.status(401).send("Unauthorized");
                    return;
                default:
                    res.status(error.response.data.error.status).send(error.message);
            }
        }
    }

    res.status(200).send(responseData);
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

        const responseData = {
            id: response.data.id,
            title: response.data.name,
            artist: response.data.artists.map((artist: any) => artist.name).join(", "),
            album: response.data.album.name || "",
            albumArt: response.data.album.images.find((image: any) => image.height === 300)?.url || "",
            previewUrl: response.data.preview_url ? response.data.preview_url : undefined,
            openInSpotifyUrl: !response.data.preview_url ? response.data.external_urls.spotify : undefined
        };

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
