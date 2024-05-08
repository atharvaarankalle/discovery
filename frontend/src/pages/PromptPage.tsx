import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";

export const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");

  const handlePrompt = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3000/api/prompt"
      );
      const data = response.data;
      setPrompt(data);
    } catch (error) {
      // axios interceptor will log error message
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
