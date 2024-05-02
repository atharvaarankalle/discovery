import { useState } from "react";
import { baseGlow, colors, landingBackground } from "../theme.ts";
import { AppBar, Box, Button, Grow, styled, Typography } from "@mui/material";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [inputValue, setInputValue] = useState('');
  
  const handlePrompt = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/prompt');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrompt(data);
    } catch (error) {
      console.error('There was a problem fetching the message:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <PageBackground>
      <Box sx={{ p: 3, m: 2}}>
        <Typography variant="h4">TODAY'S DISCO: </Typography>
        <Typography variant="h2">{prompt}</Typography>
        <Button variant="contained" onClick={handlePrompt}>Generate</Button>
        <Box sx={{ paddingY: 5}}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your answer"
            />
          <p>You typed: {inputValue}</p> {/* Displaying the typed value */}
        </Box>
        <Button sx={{ 
            position: 'fixed', bottom: 20, left: 20,
            color: colors.lightPeach,
            fontSize: "1.25rem",
            fontWeight: 400,
            fontFamily: "Sora",
            textTransform: 'none', 
            ':hover': { 
              textDecoration: 'underline' // Underline on hover
            } 
          }}>
          Skip
        </Button>
      </Box>
    </PageBackground>
  );
};

const PageBackground = styled("div")({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

export default PromptPage;
