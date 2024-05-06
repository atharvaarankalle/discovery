// current route: /api/prompt
import express, { Request, Response, Router } from "express";
import {Prompt } from "../../schemas/PromptSchema";
import { getTodaysDate } from "../../utils/DateUtils";
import generate from "./openAI";

const router: Router = express.Router();

/**
 * GET / - Call ChatGPT API to generate a new prompt.
 */
router.get("/", async (req, res) => {
    
    try {
        const prompt  = await generate();

        if (prompt) {
            //'Access-Control-Allow-Origin' is enabled to bypass CORS of certain browsers.
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
 * POST /save - Create a new prompt in the Mongol database.
 * Takes a 'prompt' from the request body and an optional 'date' from the query.
 * If no date is provided, it uses the current date.
 * @param {Request} req - The new prompt and date(?)
 * @param {Response} res -  201: Successfully saved new prompt
 *                          400: Bad request due to query issues
 *                          422: Something wrong with the parsed structured data
 *                          500: Sever error while trying to save
 */
router.post("/save", async (req: Request, res: Response) => {
    try {
        // Retrieve the 'prompt' from request body
        const { prompt } = req.body;
        
        // Check for a date in the query, use getTodaysDate() if none provided
        const dateInput = req.query.date ? new Date(req.query.date as string) : getTodaysDate();

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const newPrompt = new Prompt({
            prompt,
            date: dateInput
        });

        await newPrompt.save();
        res.status(201).json(newPrompt);
    } catch (error: any) {
        switch (error.response.data.error.status) {
            case 400:
                res.status(400).json({ message: "Bad query or invalid MongoDB URL" });
                break;
            case 401:
                res.status(422).json({ message: "Save data contain correct structure but is invalid" });
                break;
            case 404:
                res.status(500).json({ message: "Sever error while trying to save" });
                break;
            default:
                res.status(error.response.data.error.status).json({ message: error.message });
        }
    }
});

export default router;
