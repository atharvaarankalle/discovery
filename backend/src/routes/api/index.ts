// Current route: /api
import express, { Router } from "express";

const router: Router = express.Router();

// TEST Endpoint for /api
router.get("/", (req, res) => {
  res.send("Hello from API :)");
});

const corsOptions = {
  origin: "http://localhost:5173", // only requests from this origin can access backend endpoints
  credentials: true, // allows cookies to be sent with cross-origin requests
};

import cors from "cors";
router.use(cors(corsOptions));

import cookieParser from "cookie-parser";
router.use(cookieParser());

import { authenticateToken } from "./auth";
router.use(authenticateToken);

// Nested routes
import auth from "./auth";
router.use("/auth", auth);

import user from "./user";
router.use("/user", user);

import prompt from "./prompt";
router.use("/prompt", prompt);

import songs from "./songs";
router.use("/songs", songs);

import feed from "./feed";
router.use("/feed", feed);

export default router;
