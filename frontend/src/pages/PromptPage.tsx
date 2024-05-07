import { useState } from "react";
import { styled, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors, landingBackground  } from "../theme";
import { Searchbar } from "../components/Searchbar"
import { SkipButton } from "../components/SkipButton";

const DialogBackground = styled('div')({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
});

// const SkipButton = styled(Button)({
//   position: 'fixed', 
//   bottom: 20, 
//   left: 20,
//   color: colors.lightPeach,
//   fontSize: "1.25rem",
//   fontWeight: 400,
//   fontFamily: "Sora",
//   textTransform: 'none', 
//   ':hover': { textDecoration: 'underline' }
// });

export const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  
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

  return (
    <Box>
      <Typography variant="h4">TODAY'S DISCO: </Typography>
      <Typography variant="h2">{prompt}</Typography>
      <Button variant="contained" sx={{marginY: 3}} onClick={handlePrompt}>Generate</Button>
      <Box sx={{marginY: 5, width: '80%'}}>
        <Searchbar/>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="body2" sx={{color: colors.peach}}>
            Search for a track that best describes the prompt above
          </Typography>
        </Box>
      </Box>
      <SkipButton/>
    </Box>
  );
};

export default PromptPage;
