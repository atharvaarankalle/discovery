// current route: /api/user
import express, { Router, Request, Response } from "express";
import { User, IUser } from "../../schemas/UserSchema";
import {
  ISuggestedSong,
  SuggestedSong,
} from "../../schemas/SuggestedSongSchema";
import { Schema } from "mongoose";
import { Prompt } from "../../schemas/PromptSchema";
import { compareDates, getTodaysDate } from "../../utils/DateUtils";

import { getTrackBySpotifyId, spotifyTokenMiddleware } from "./songs";

const router: Router = express.Router();

/**
 * POST a new user's profile info.
 *
 * @returns JSON object of the saved user profile.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const newUser = new User(userData);

    const savedUser = await newUser.save();
    return res.status(201).json(userDetailResponseData(savedUser));
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating new user: ${error}` });
  }
});

/**
 * GET user's profile info.
 *
 * @returns JSON object of the found user's profile.
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user: IUser | null = await User.findById(userId).populate(
      "likedSongs"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userDetailResponseData(user));
  } catch (error) {
    return res.status(500).json({ message: `Error fetching user: ${error}` });
  }
});

/**
 * PATCH Update user's profile info
 *
 * @returns JSON object of the updated user's profile data
 */
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUserData: Partial<IUser> = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userDetailResponseData(updatedUser));
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating user profile: ${error}` });
  }
});

/**
 * GET list of user's liked songs
 *
 * @returns List of liked songs as JSON object
 */
router.get(
  "/:id/liked",
  spotifyTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const user: IUser | null = await User.findById(userId).populate(
        "likedSongs"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const likedSongs: Array<ISuggestedSong> = await SuggestedSong.find({
        _id: user.likedSongs,
      });

      if (!likedSongs || likedSongs.length === 0) {
        return res.status(404).json({ message: "No liked songs found" });
      }

      const likedSongPromises = likedSongs.map(async (song) => {
        const { spotifySongId } = song;

        try {
          const songData = await getTrackBySpotifyId(spotifySongId);

          return songData;
        } catch (error) {
          res.status(500).json();
        }
      });

      const likedSongsData = await Promise.all(likedSongPromises);

      return res.json(likedSongsData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error fetching user's liked songs: ${error}` });
    }
  }
);

/**
 * PUT add a song to a user's list of liked songs
 *
 * @returns JSON object of the updated user's profile data
 */
router.put("/:id/liked", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { songId } = req.body;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the song is already liked
    if (user.likedSongs.includes(songId)) {
      return res.status(400).json({ message: "Song is already liked" });
    }

    user.likedSongs.push(songId);
    const updatedUser = await user.save();

    return res.json(userDetailResponseData(updatedUser));
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error adding song to user's liked songs: ${error}` });
  }
});

/**
 * DELETE a song from a user's list of liked songs
 *
 * @returns JSON object of the updated user's profile data
 */
router.delete("/:id/liked/:songId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const songId = req.params.songId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedSongs: songId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userDetailResponseData(updatedUser));
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting song from user's liked songs: ${error}`,
    });
  }
});

/**
 * GET today's suggested song from a user
 *
 * @returns JSON object for the suggested song entry
 */
router.get(
  "/:id/suggested/today",
  spotifyTokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user: IUser | null = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the date of the last suggested song
      if (user.suggestedSongs.length == 0) {
        return res.status(404).json({ message: "User has no suggested songs" });
      }
      const lastSuggestedSongId =
        user.suggestedSongs[user.suggestedSongs.length - 1];

      const lastSuggestedSongEntry = await SuggestedSong.findById(
        lastSuggestedSongId
      );
      if (!lastSuggestedSongEntry) {
        return res
          .status(404)
          .json({ message: "Last suggested song is not found" });
      }
      // Get the date for the prompt
      const lastPrompt = await Prompt.findById(lastSuggestedSongEntry.prompt);
      const lastSuggestedSongDate = lastPrompt?.date as
        | Date
        | Schema.Types.Date;

      if (
        compareDates({ date1: lastSuggestedSongDate, date2: getTodaysDate() })
      ) {
        const { spotifySongId } = lastSuggestedSongEntry;

        try {
          const songData = await getTrackBySpotifyId(spotifySongId);
          return res.json(songData);
        } catch (error) {
          res.status(500).json();
        }
      } else {
        return res
          .status(404)
          .json({ message: "Last suggested song is not from today" });
      }
    } catch (error) {
      return res.status(500).json({
        message: `Error fetching user's today's suggested song: ${error}`,
      });
    }
  }
);

/**
 * PUT add a song to a user's suggested songs, and add new suggested song entry
 *
 * @returns JSON object of the updated user's profile data
 */
router.put("/:id/suggested", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const {
      spotifySongId,
      caption,
      prompt,
    }: {
      spotifySongId: string;
      caption: string;
      prompt: Schema.Types.ObjectId;
    } = req.body;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new suggested song entry
    const suggestedSong: ISuggestedSong = new SuggestedSong({
      user: userId,
      spotifySongId: spotifySongId,
      caption: caption,
      prompt: prompt,
    });
    await suggestedSong.save();

    await updateStreaks(user);

    // Append the new suggested song to the user's suggested songs
    user.suggestedSongs.push(suggestedSong._id);
    const updatedUser = await user.save();

    return res.json(userDetailResponseData(updatedUser));
  } catch (error) {
    return res.status(500).json({
      message: `Error adding song to suggested songs: ${error}`,
    });
  }
});

export default router;

/**
 * Updates the streak count if the last suggested song date is yesterday
 * @param user User object
 */
async function updateStreaks(user: IUser) {
  // User has never suggested a song
  if (user.suggestedSongs.length == 0) {
    user.streakCount = 1;
    return;
  }

  const lastSuggestedSongId =
    user.suggestedSongs[user.suggestedSongs.length - 1];

  const lastSuggestedSong = await SuggestedSong.findById(lastSuggestedSongId);
  if (!lastSuggestedSong) {
    throw new Error("Last suggested song not found");
  }

  // Get the date for the prompt
  const lastPrompt = await Prompt.findById(lastSuggestedSong.prompt);
  const lastSuggestedSongDate = lastPrompt?.date as Date | Schema.Types.Date;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date of the last suggested song is yesterday
  if (compareDates({ date1: lastSuggestedSongDate, date2: yesterday })) {
    user.streakCount++;
  } else {
    user.streakCount = 0;
  }
  await user.save();
  return;
}

export const userDetailResponseData = (user: IUser) => {
  const {
    _id,
    email,
    displayName,
    accountCreationDate,
    streakCount,
    likedSongs,
    suggestedSongs,
    profilePic,
  } = user;
  return {
    _id,
    email,
    displayName,
    accountCreationDate,
    streakCount,
    likedSongs,
    suggestedSongs,
    profilePic,
  };
};
