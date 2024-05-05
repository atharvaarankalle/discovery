import express, { Router, Request, Response } from "express";
import { User, IUser } from "../../schemas/UserSchema";
import bcrypt from "bcryptjs";
import { getTodaysDate } from "../../utils/DateUtils";

const router: Router = express.Router();

/* SIGNUP ENDPOINT */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { displayName, email, password, profilePic } = req.body;
    // ensure all required user data is provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide a display name, email, and password" });
    }
    // check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists" });
    }

    // create new user object with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      displayName: displayName || email,
      email,
      password: hashedPassword,
      profilePic: profilePic || "",
      accountCreationDate: getTodaysDate(),
      streakCount: 0,
      likedSongs: [],
      suggestedSongs: [],
    });
    // save the user to the database
    await newUser.save();

    // respond with success message
    res.status(201).json({ message: "Successful sign up!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Signup has failed" });
  }
});
export default router;
