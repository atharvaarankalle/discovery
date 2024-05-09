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
import { userDetailResponseData } from "./user";

dotenv.config();
const AUTH_SECRET_KEY: string = process.env.AUTH_SECRET_KEY || "";
const router: Router = express.Router();

const TOKEN_EXPIRY_IN_HOURS: number = 1;

/* This function creates and return a JWT token for authentication */
const getJWTAuthToken = (userId: string) =>
  jwt.sign({ userId }, AUTH_SECRET_KEY, {
    expiresIn: `${TOKEN_EXPIRY_IN_HOURS}h`, // how long the auth token is valid for
  });

/**
 * AUTHENTICATE TOKEN MIDDLEWARE
 *
 * This middleware runs on every endpoint apart from the login and signup.
 * It verifies the user is authenticated to interact with the application's API routes using the stored cookie in each request.
 *
 */
export const authenticateToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if req is made to login or signup endpoints, skip auth token verification
  if (
    req.path === "/auth/login" ||
    req.path === "/auth/signup" ||
    req.path === "/auth/logout"
  ) {
    return next();
  }

  // obtain auth token from authorization header of request
  if (!req.cookies?.authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = req.cookies.authToken;

  // verifying the auth token using secret key
  jwt.verify(token, AUTH_SECRET_KEY, (err: any) => {
    if (err) {
      return res.status(403).json({ error: "Authentication token is invalid" });
    }
    next();
  });
};

/**
 * SIGNUP ENDPOINT [POST]
 *
 * Request Body Content:
 * @param displayName Optional string, will be email if not provided.
 * @param email Required string
 * @param password Required String
 * @param profilePic Optional string, will be empty string ("") if not provided.
 *
 * @returns
 * - 201 Created: Successful creation of User, returns user data and auth cookie in response
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
    const savedUser: IUser = await newUser.save(); // save user to DB
    const token = getJWTAuthToken(savedUser._id); // get authToken and set as response cookie for client
    // get expiry time in milliseconds to add to cookie
    const expiryDate = new Date();
    expiryDate.setTime(
      expiryDate.getTime() + TOKEN_EXPIRY_IN_HOURS * 60 * 60 * 1000
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      expires: expiryDate,
      secure: true,
    });
    res.status(201).json({
      message: "Successful sign up!",
      user: userDetailResponseData(savedUser),
    });
  } catch (error) {
    res.status(500).json({ error: "Signup has failed" });
  }
});

/**
 * LOGIN ENDPOINT [POST]
 *
 * Request Body Content:
 * @param email Required string
 * @param password Required String
 *
 * @returns
 * - 200 OK: Successful login, user data and auth cookie returned in response
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

    // get authToken and set as response cookie for client
    const token = getJWTAuthToken(user._id);
    // get expiry time in milliseconds to add to cookie
    const expiryDate = new Date();
    expiryDate.setTime(
      expiryDate.getTime() + TOKEN_EXPIRY_IN_HOURS * 60 * 60 * 1000
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      expires: expiryDate,
      secure: true,
    });

    res.status(200).json({
      message: "Successful login!",
      user: userDetailResponseData(user),
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * LOGOUT ENDPOINT [POST]
 *
 * No request body, this endpoint simply clears auth cookie from client on logout
 * if it hasn't expired already
 *
 * @returns
 * - 200 OK: Successful logout, JWT auth token cleared
 *
 */
router.post("/logout", (req, res) => {
  res.clearCookie("authToken"); // clear authToken cookie if it exists
  res.status(200).json({ message: "Logout successful!" });
});

export default router;
