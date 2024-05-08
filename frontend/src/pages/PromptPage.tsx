import { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import { Searchbar } from "../components/Searchbar"
import { SkipButton } from "../components/SkipButton";
import { colors } from "../theme";
import { ConfirmationDialog } from "../components/ConfirmDialog";
import PromptSideDrawer from "../components/PromptSideDrawer";

export const PromptPage = () => {

  const mockTrackData = {
    id: "4kiVGEOrzWmEUCxXU21rtN",
    songTitle: "John The Fisherman",
    artists: "Primus",
    album: "They Can't All Be Zingers",
    albumArtSrc: "https://i.scdn.co/image/ab67616d00001e02177b489f92c4157dd478916a",
    songAudioSrc: "https://open.spotify.com/track/4kiVGEOrzWmEUCxXU21rtN",
    openInSpotifyUrl: "https://open.spotify.com/track/4kiVGEOrzWmEUCxXU21rtN",
  }
  

  const [prompt, setPrompt] = useState("Press button for prompt");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => setOpenDialog(false);

  const handleDrawer = () => setOpenDrawer(!openDrawer);
  
  const handleConfirmQuit = () => {
      console.log("User confirmed to quit");
      handleCloseDialog();
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
      <Box>
        <Box sx={{marginY: 5, width: '70%', height: '80%'}}>
          <Searchbar/>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="body2" sx={{color: colors.peach}}>
              Search for a track that best describes the prompt above
            </Typography>
          </Box>
        </Box>

        <PromptSideDrawer sx={{width: '200px'}} drawerOpen={openDrawer} toggleDrawer={handleDrawer} songData={mockTrackData}/>

      </Box>
      <SkipButton onOpen={handleOpenDialog}/>
      <Button onClick={handleDrawer}>drawer</Button>
      <ConfirmationDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmQuit}
            />
    </Box>
  );
};

export default PromptPage;
