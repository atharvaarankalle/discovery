// Current route: /api
import express, { Router } from "express";

const router: Router = express.Router();

// TEST Endpoint for /api
router.get("/", (req, res) => {
  res.send("Hello from API :)");
});

import cors from "cors";
router.use(cors());

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
