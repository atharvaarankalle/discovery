import { useEffect, useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import { Searchbar } from "../components/Searchbar"
import { SkipButton } from "../components/SkipButton";
import { ConfirmationDialog } from "../components/ConfirmDialog";
import PromptSideDrawer from "../components/PromptSideDrawer";
import { SongSelectionContainer } from "../components/SongCardPaginationContainers";
import axios from "axios";
import { colors } from "../theme";

async function searchSongs(query: string, numSongs: number, page: number): Promise<any> {
  try {
      const response = await axios.get("http://localhost:3000/api/songs/search", {
          params: {
              searchQuery: query,
              numSongs: numSongs,
              page: page
          }
      });
      // If the response is successful, return the data
      return response.data; // Make sure to return the actual data property if that's what you're interested in
  } catch (error) {
      console.error('Failed to fetch songs with axios:', error);
      // Return a default value in case of an error to keep the function's return type consistent
      return [];
  }
}

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
  const [currentInput, setCurrentInput] = useState('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [songs, setSongs] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");

  //Using debounce to limit the amount of API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentInput);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [currentInput]);

  useEffect(() => {
    if (debouncedValue) {
      const fetchSongs = async () => {
        try {
          const fetchedSongs = await searchSongs(debouncedValue, 50, 1);
          setSongs(fetchedSongs);
          console.log(songs[0])
        } catch (error) {
          console.error('Error fetching songs:', error);
          setSongs([]);
        }
      };

      fetchSongs();
    } else {
      setSongs([]);
    }
  }, [debouncedValue]);


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
      <Typography variant="h2" sx={{width: `calc(100vw - 37rem)`}}>{prompt}</Typography>
      <Button variant="contained" sx={{marginY: 3}} onClick={handlePrompt}>Generate</Button>
      <Box>
        <Box sx={{marginY: 5, width: `calc(100vw - 37rem)`, height: '80%', overflowY: 'auto'}}>
          <Searchbar onInputChange={setCurrentInput}/>
          {(debouncedValue === '')? 
            <Box sx={{display: 'flex', justifyContent: 'center', height: '35rem'}}>
              <Typography variant="body2" sx={{color: colors.peach}}>
                Search for a track that best describes the prompt above
              </Typography>
            </Box>: 
            <Box sx={{marginX: 3}}>
              <SongSelectionContainer
                songs={songs}
                />
            </Box>}
        </Box>
      </Box>
      <SkipButton onOpen={handleOpenDialog}/>
      <Button onClick={handleDrawer}>drawer</Button>
      <ConfirmationDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmQuit}
            />
      <PromptSideDrawer drawerOpen={openDrawer} toggleDrawer={handleDrawer} songData={mockTrackData}/>
    </Box>
  );
};

export default PromptPage;
