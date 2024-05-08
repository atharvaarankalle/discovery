// current route: /api/prompt
import express, { Request, Response, Router } from "express";
import { Prompt } from "../../schemas/PromptSchema";
import { getTodaysDate } from "../../utils/DateUtils";
import generate from "./openAI";

const router: Router = express.Router();

/**
 * GET / - Call ChatGPT API to generate a new prompt.
 */
router.get("/", async (req, res) => {
  try {
    const prompt = await generate();

    if (prompt) {
      res.json(prompt);
    } else {
      res.status(500).json({ error: "Error generating prompt" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting prompt" });
  }
});

/**
 * POST /save - Create a new prompt in the Mongol database.
 * Takes a 'prompt' from the request body and an optional 'date' from the query.
 * If no date is provided, it uses the current date.
 * @param {Request} req - The new prompt and date(?)
 * @param {Response} res -  201: Successfully saved new prompt
 *                          500: Sever error while trying to save
 */
router.post("/save", async (req: Request, res: Response) => {
  try {
    // Retrieve the 'prompt' from request body
    const { prompt, date } = req.body;

    // Check for a date in the body, use getTodaysDate() if none provided
    const dateInput = date ? new Date(date) : getTodaysDate();

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const newPrompt = new Prompt({
      prompt,
      date: dateInput,
    });

    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (error: any) {
    console.error("Error saving the prompt");
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /find/:id - Retrieve a prompt by its _id on the MongolDB.
 * Note that the ID only need to be on the path, this does not take in a request.
 * @param {Response} res - The Json object containing details for the prompt
 */
router.get("/find/:id", async (req: Request, res: Response) => {
  try {
    const promptId = req.params.id;

    const prompt = await Prompt.findById(promptId);

    // Check if the prompt is found before responding, otherwise the database link crashes
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.json(prompt);
  } catch (error: any) {
    console.error("Error retrieving the prompt:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
