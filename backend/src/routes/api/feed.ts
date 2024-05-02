// current route: /api/feed
import express, { Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { IPrompt, Prompt } from "../../schemas/PromptSchema";
import {
  ISuggestedSong,
  SuggestedSong,
} from "../../schemas/SuggestedSongSchema";

const router: Router = express.Router();

type GetSuggestedSongsReqBody = {
  date?: Date;
};

/**
 * GET /api/feed
 *
 * Endpoint for getting SuggestedSong entries based for a specific date.
 * By default, it will take today's date, but you can also specify a date via request body.
 * Recommended input date format: "YYYY-MM-DD"
 */
router.get(
  "/",
  async (req: Request<any, any, GetSuggestedSongsReqBody>, res: Response) => {
    try {
      const date: Date = new Date(
        req.body.date ?? new Date().setUTCHours(0, 0, 0, 0) // Uses the date in body if specified, otherwise get's today's date.
      );
      const prompt: IPrompt | null = await Prompt.findOne({ date });

      // If there has been a prompt for the given date.
      if (prompt) {
        const promptId: Schema.Types.ObjectId = prompt._id;
        const suggestedSongs: Array<ISuggestedSong> = await SuggestedSong.find({
          prompt: promptId,
        });

        if (suggestedSongs.length > 0) {
          // Returning the suggested songs
          res.status(200).json(suggestedSongs);
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
