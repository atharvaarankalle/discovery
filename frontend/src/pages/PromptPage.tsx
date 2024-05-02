import { useState } from "react";
import { baseGlow, colors, landingBackground } from "../theme.ts";
import { AppBar, Box, Button, Grow, styled, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputAdornment, IconButton } from "@mui/material";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [inputValue, setInputValue] = useState('');
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue('');
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
    // Additional actions to quit goes HEAAA
  };

  return (
    <PageBackground>
      <Box sx={{ p: 3, m: 2}}>
        <Typography variant="h4">TODAY'S DISCO: </Typography>
        <Typography variant="h2">{prompt}</Typography>
        <Button variant="contained" onClick={handlePrompt}>Generate</Button>
        <Box sx={{paddingY: 5, width: 800}}>
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    SearchIcon
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: inputValue && (
                <InputAdornment position="end">
                  <IconButton onClick={clearInput}>
                    X
                  </IconButton>
                </InputAdornment>
              ),
              style: { color: 'white' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                }
              },
              background: 'rgba(0, 0, 0, 0.15)', // Semi-transparent background
              borderRadius: '4px', // Rounded corners
            }}
          />
          <Box sx={{paddingY: 2}}>
            <Typography variant="body2" sx={{color: colors.peach}}>
              Search for a track that best describes the prompt above
            </Typography>
          </Box>
        </Box>
        <Button onClick={handleOpen} sx={{ 
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 4,
            backdropFilter: "blur(3px)",
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
                This prompt expires at night.<br/>
                You can still post a song recommendation if you skip.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirmQuit} autoFocus>
                Quit
              </Button>
            </DialogActions>
          </Box>
          
        </DialogBackground>
      </Dialog>
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

const DialogBackground = styled("div")({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
  height: "100%",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

export default PromptPage;
