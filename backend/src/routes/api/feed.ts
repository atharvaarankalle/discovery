// current route: /api/feed
import express, { Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { IPrompt, Prompt } from "../../schemas/PromptSchema";
import {
  ISuggestedSong,
  SuggestedSong,
} from "../../schemas/SuggestedSongSchema";
import { getTodaysDate } from "../../utils/DateUtils";
import axios from "axios";
import dotenv from "dotenv";
import { FeedEndpointResult } from "../../utils/interfaces";

dotenv.config();
const API_BASE_URL =
  process.env.VITE_API_BASE_URL ?? "https://localhost:3000/api";

const router: Router = express.Router();

type GetSuggestedSongsQueryParams = {
  date?: Date;
};

/**
 * GET /api/feed
 *
 * Endpoint for getting SuggestedSong entries for today's date, or for a specified date.
 * By default, it will take today's date, but you can also specify a date via request body.
 * Recommended input date format: "YYYY-MM-DD"
 *
 * @param date (optional) - date for the song suggestions. Default: today's date.
 */
router.get(
  "/",
  async (
    req: Request<any, any, any, GetSuggestedSongsQueryParams>,
    res: Response
  ) => {
    try {
      const date: Date = new Date(
        req.query.date ?? getTodaysDate() // Uses the date in body if specified, otherwise get's today's date.
      );
      const prompt: IPrompt | null = await Prompt.findOne({ date });

      // If there has been a prompt for the given date.
      if (prompt) {
        const promptId: Schema.Types.ObjectId = prompt._id;
        const suggestedSongs: Array<ISuggestedSong> = await SuggestedSong.find({
          prompt: promptId,
        })
          .populate({ path: "user", select: ["profilePic", "displayName"] })
          .populate({ path: "prompt", select: "prompt" });

        const songSuggestionPromises = suggestedSongs.map(async (song) => {
          const { _id, caption, spotifySongId, user } =
            song as unknown as FeedEndpointResult;

          try {
            const response = await axios.get(
              `${API_BASE_URL}/songs/${spotifySongId}`
            );

            return {
              id: _id,
              songData: response.data,
              username: user.displayName,
              caption,
              profilePictureSrc: user.profilePic,
            };
          } catch (error) {
            res.status(500).json();
          }
        });

        const songSuggestionData = await Promise.all(songSuggestionPromises);
        if (suggestedSongs.length > 0) {
          // Returning the suggested songs
          res.status(200).json(songSuggestionData);
        } else {
          // No suggestedSong entries found
          res
            .status(404)
            .json({ message: "No suggested songs for this date." });
        }
      } else {
        // No date found
        res.status(404).json({ message: "Prompt for date not found." });
      }
    } catch (err) {
      // Server error
      res.status(500).json();
    }
  }
);

export default router;
