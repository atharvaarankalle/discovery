import express, { Request, Response, Router } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();
let SPOTIFY_API_ACCESS_TOKEN: string = "";
let TOKEN_EXPIRATION_TIME: number = -1;

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

router.get("/search", tokenMiddleware, async (req: Request, res: Response) => {
    const songTitle = String(req.query.songTitle);
    const numSongs: number = Number(req.query.numSongs) || 6;
    const page: number = Number(req.query.page) || 1;
    const searchOffset: number = (page * numSongs) - numSongs;

    try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
            params: {
                q: songTitle,
                type: "track",
                limit: numSongs,
                offset: searchOffset,
            },
            headers: {
                Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`
            }
        });

        const responseData = response.data.tracks.items.map((track: any) => {
            return {
                id: track.id,
                title: track.name,
                artist: track.artists.map((artist: any) => artist.name).join(", "),
                album: track.album.name || "",
                albumArt: track.album.images.find((image: any) => image.height === 300)?.url || "",
                previewUrl: track.preview_url ? track.preview_url : undefined,
                openInSpotify: !track.preview_url ? track.external_urls.spotify : undefined
            };
        });

        res.status(200).send(responseData);
    } catch (error: any) {
        switch (error.response.data.error.status) {
            case 401:
                res.status(401).send("Unauthorized");
                break;
            default:
                res.status(error.response.data.error.status).send(error.message);
        }
    }
});

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
            openInSpotify: !response.data.preview_url ? response.data.external_urls.spotify : undefined
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
                res.status(404).send("Song not found");
                break;
            default:
                res.status(error.response.data.error.status).send(error.message);
        }
    }
});

export default router;
