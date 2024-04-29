// Current route: /api
import express from "express";

const router = express.Router();

// TODO: Add different routes here

// TEST
router.get("/", (req, res) => {
  res.send("Hello from API :)");
});

export default router;
