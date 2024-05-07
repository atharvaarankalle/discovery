import { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import { Searchbar } from "../components/Searchbar"
import { SkipButton } from "../components/SkipButton";
import { colors } from "../theme";
import { ConfirmationDialog } from "../components/ConfirmDialog";

export const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const handleConfirmQuit = () => {
      console.log("User confirmed to quit");
      handleClose();
      // Additional actions to quit goes here
  };
  
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
      <SkipButton onOpen={handleOpen}/>
      <ConfirmationDialog
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirmQuit}
            />
    </Box>
  );
};

export default PromptPage;
