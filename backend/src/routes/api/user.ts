// current route: /api/user
import express, { Router, Request, Response } from "express";
import { User, IUser } from "../../schemas/UserSchema";

const router: Router = express.Router();

// TODO: Add endpoints here

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

    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user", error);
    return res.status(500);
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

    return res.json({ updatedUser });
  } catch (error) {
    console.error("Error updating user profile", error);
    return res.status(500);
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
    return res.json({ likedSongs });
  } catch (error) {
    console.error("Error fetching user's liked songs:", error);
    return res.status(500);
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
    console.error("Error deleting song from user's liked songs:", error);
    return res.status(500);
  }
});

export default router;
