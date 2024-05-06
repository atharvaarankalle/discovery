// current route: /api/prompt
import express, { Request, Response, Router } from "express";
import {Prompt } from "../../schemas/PromptSchema";
import { getTodaysDate } from "../../utils/DateUtils";
import generate from "./openAI";

const router: Router = express.Router();

router.get("/", async (req, res) => {
    
    try {
        const prompt  = await generate();

        if (prompt) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(prompt)
        } else {
            res.status(500).json({error: 'Error generating prompt'})
        }

    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Error getting prompt'})
    }

  });

/**
 * GET /find/:id - Retrieve a prompt by its _id on the MongolDB.
 * Note that the ID only need to be on the path, this does not take in a request.
 * @param {Response} res - The Json object containing details for the prompt
 */
router.get('/find/:id', async (req: Request, res: Response) => {
    try {
        const promptId = req.params.id;

        const prompt = await Prompt.findById(promptId);

        // Check if the prompt is found before responding, otherwise the database link crashes
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found" });
        }

        res.json(prompt);

    } catch (error:any) {
        console.error('Error retrieving the prompt:', error);
        res.status(error.response.data.error.status).json({ message: error.message });
        }
    }
);

export default router;
