import express from "express";

const router = express.Router();

import api from "./api/index";
router.use("/api", api);

export default router;
