// Current route: /api
import express, { Router } from "express";

const router: Router = express.Router();

// TEST Endpoint for /api
router.get("/", (req, res) => {
  res.send("Hello from API :)");
});

// Nested routes
import auth from "./auth";
router.use("/auth", auth);

import user from "./user";
router.use("/user", user);

import prompt from "./prompt";
router.use("/prompt", prompt);

export default router;
