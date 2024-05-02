// current route: /api/feed
import express, { Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { IPrompt, Prompt } from "../../schemas/PromptSchema";
import {
  ISuggestedSong,
  SuggestedSong,
} from "../../schemas/SuggestedSongSchema";

const router: Router = express.Router();

// TODO: Add endpoints here
router.get("/", async (req: Request, res: Response) => {
  try {
    const date: Date = req.body.date;
    const prompt: IPrompt | null = await Prompt.findOne({ date });
    if (prompt) {
      const promptId: Schema.Types.ObjectId = prompt._id;
      const suggestedSongs: Array<ISuggestedSong> = await SuggestedSong.find({
        prompt: promptId,
      });

      res.status(200).json(suggestedSongs);
    } else {
      res.status(404).json({ message: "Prompt for date not found." });
    }
  } catch (err) {
    res.status(500).json();
  }
});

export default router;
