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
    const songTitle = req.query.songTitle;

    try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
            params: {
                q: songTitle,
                type: "track",
            },
            headers: {
                Authorization: `Bearer ${SPOTIFY_API_ACCESS_TOKEN}`
            }
        });

        res.status(200).send(response.data);
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
        res.status(200).send(response.data);
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
