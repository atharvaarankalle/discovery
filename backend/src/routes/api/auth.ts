import express, {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { User, IUser } from "../../schemas/UserSchema";
import bcrypt from "bcryptjs";
import { getTodaysDate } from "../../utils/DateUtils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const AUTH_SECRET_KEY: string = process.env.AUTH_SECRET_KEY || "";
const router: Router = express.Router();

/**
 * AUTHENTICATE TOKEN MIDDLEWARE
 *
 * This middleware runs on every endpoint apart from the login and signup.
 * It verifies the user is authenticated to interact with the application's API routes.
 *
 */
export const authenticateToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if req is made to login or signup endpoints, skip auth token verification
  if (req.path === "/auth/login" || req.path === "/auth/signup") {
    return next();
  }

  // obtain auth token from authorization header of request
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // verifying the auth token using secret key
  jwt.verify(token, AUTH_SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ error: "Authentication token is invalid" });
    }
    next();
  });
};

/**
 * SIGNUP ENDPOINT
 *
 * Request Body Content:
 * @param displayName Optional string, will be email if not provided.
 * @param email Required string
 * @param password Required String
 * @param profilePic Optional string, will be empty string ("") if not provided.
 *
 * @returns
 * - 201 Created: Successfully created a User object, returned in response
 * - 400 Bad Request: No email and/or password provided in request body
 * - 409 Conflict: A user with this email already exists
 * - 500 Server Error: Another issue has occurred, causing signup to fail
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { displayName, email, password, profilePic } = req.body;
    // ensure all required user data is provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide an email, and password" });
    }
    // check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
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

/**
 * LOGIN ENDPOINT
 *
 * Request Body Content:
 * @param email Required string
 * @param password Required String
 *
 * @returns
 * - 200 OK: Successful login, JWT auth token returned in response body
 * - 401 Unauthorized: Invalid email and/or password provided
 * - 404 Not Found: A user with this email cannot be found
 * - 500 Server Error: Another issue has occurred, causing login to fail
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find the user
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      // checking if user exists
      return res.status(404).json({ error: "This user does not exist" });
      // checking that password / email was input correctly
    } else if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // create and send JWT token for successful login
    const token = jwt.sign({ userId: user._id }, AUTH_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
