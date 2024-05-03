// current route: /api/user
import express, { Router, Request, Response } from "express";
import { User, IUser } from "../../schemas/UserSchema";

const router: Router = express.Router();

// POST a new user's profile info
router.post("/", async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const newUser = new User(userData);

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating new user: ${error}` });
  }
});

// GET user's profile info
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user: IUser | null = await User.findById(userId).populate(
      "likedSongs"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching user: ${error}` });
  }
});

// PATCH/Update user's profile info
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

    return res.json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating user profile: ${error}` });
  }
});

// GET list of user's liked songs
router.get("/:id/liked", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user: IUser | null = await User.findById(userId).populate(
      "likedSongs"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedSongs = user.likedSongs;
    return res.json(likedSongs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error fetching user's liked songs: ${error}` });
  }
});

// PUT add a song to a user's list of liked songs
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

    return res.json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error adding song to user's liked songs: ${error}` });
  }
});

// DELETE a song from a user's list of liked songs
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

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting song from user's liked songs: ${error}`,
    });
  }
});

export default router;
