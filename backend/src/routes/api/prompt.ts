// current route: /api/prompt

import express, { Router } from "express";
import generate from "./openAI";

const router: Router = express.Router();

router.get("/", async (req, res) => {
    
    try {
        const prompt  = await generate();

        if (prompt) {
            res.send(prompt)
        } else {
            res.status(500).json({error: 'Error generating prompt'})
        }

    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Error getting prompt'})
    }

  });

export default router;
