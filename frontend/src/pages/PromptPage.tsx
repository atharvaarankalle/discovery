import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

export const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");

  const handlePrompt = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/prompt",

        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setPrompt(data);
    } catch (error) {
      console.error("There was a problem fetching the message:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">{prompt}</Typography>
      <Button variant="contained" sx={{ marginY: 3 }} onClick={handlePrompt}>
        Generate
      </Button>
    </Box>
  );
};

export default PromptPage;
