import { useState } from "react";
import { styled, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors, landingBackground  } from "../theme";
import { Searchbar } from "../components/Searchbar"

const PageBackground = styled('div')({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

const DialogBackground = styled('div')({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
});

const SkipButton = styled(Button)({
  position: 'fixed', 
  bottom: 20, 
  left: 20,
  color: colors.lightPeach,
  fontSize: "1.25rem",
  fontWeight: 400,
  fontFamily: "Sora",
  textTransform: 'none', 
  ':hover': { textDecoration: 'underline' }
});

export const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [open, setOpen] = useState(false);
  
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmQuit = () => {
    console.log("User confirmed to quit");
    handleClose();
    // Additional actions to quit goes here
  };

  return (
    <PageBackground>
      <Box sx={{ p: 3, m: 2}}>
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
        <SkipButton onClick={handleOpen}>
          Skip <SkipNextIcon/>
        </SkipButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backdropFilter: "blur(3px)",
          '& .MuiPaper-root': {
            borderRadius: 4,
          }
        }} 
      >
        <DialogBackground>
          <Box sx={{p: 2}}>
          <DialogTitle id="alert-dialog-title">
              <Typography variant="body1" gutterBottom>
                Are you sure you want to skip?
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" id="alert-dialog-description" sx={{color: colors.peach}}>
                This prompt expires at night.<br/>You can still post a song recommendation if you skip.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="lightPeach" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="lightPeach" onClick={handleConfirmQuit} autoFocus>
                Skip <SkipNextIcon/>
              </Button>
            </DialogActions>
          </Box>
        </DialogBackground>
      </Dialog>
    </PageBackground>
  );
};

export default PromptPage;
