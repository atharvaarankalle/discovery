import { useEffect, useState } from "react";
import { Box, Typography} from "@mui/material";
import { Searchbar } from "../components/Searchbar"
import { SkipButton } from "../components/SkipButton";
import { ConfirmationDialog } from "../components/ConfirmDialog";
import PromptSideDrawer from "../components/PromptSideDrawer";
import { SongSelectionContainer } from "../components/SongCardPaginationContainers";
import axios from "axios";
import { colors } from "../theme";
import { SongData } from "../utils/interfaces";

/**
 * This function searches the Spotify library for songs that matches the string given.
 * @param query The search string for Spotify API search
 * @param numSongs The number of songs to return
 * @param page The page number to display
 * @returns A list of song objects
 */
async function searchSongs(query: string, numSongs: number, page: number): Promise<any> {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const response = await axios.get(`${baseURL}/songs/search`, {
        params: {
              searchQuery: query,
              numSongs: numSongs,
              page: page
          }
      });
      // If the response is successful, return the data
      return response.data; 
  } catch (error) {
      console.error('Failed to fetch songs with axios:', error);
      // Return a default value in case of an error to keep the function's return type consistent
      return [];
  }
}


/**
 * This function takes in a string and optionally a date to save the prompt to the database.
 * Id no date is given, it will be saved under today's date.
 * @param promptText The prompt to be saved
 * @param date A date or null for today's date
 */
async function savePrompt(promptText: String, date: Date | null) {
  try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/prompt/save`, {
          prompt: promptText,
          date: date
      });

      console.log('Prompt saved successfully:', response.data);
  } catch (error) {
      console.error('Failed to save prompt');
  }
}


/**
 * This prompt page ultilises the GPT API and the Spotify API to give a prompt
 * to the user. The user then answer with a song by searching through the Spotify
 * library. A song can then be choosen and added to their personal list along with a comment.
 * The side drawer will pop in and out and shows the currently selected song.
 * @returns The prompt page to be rendered
 */
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
  

  const [prompt, setPrompt] = useState("   ");
  const [currentInput, setCurrentInput] = useState('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [songs, setSongs] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [displayedSong, setDisplayedSong] = useState<SongData>(mockTrackData);

  useEffect(()=> {
    handlePrompt();
  }, []);

  //Using debounce to limit the amount of API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentInput);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [currentInput]);

  //Uses the debounced value to search for results in the Spotify library
  useEffect(() => {
    if (debouncedValue) {
      const fetchSongs = async () => {
        try {
          const fetchedSongs = await searchSongs(debouncedValue, 50, 1);
          setSongs(fetchedSongs);
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

  //Data type handling between song cards and drawer
  const handleSongCardClick = (songData: SongData | null) => {
    if (songData !== null) {
      setDisplayedSong(songData);
      setOpenDrawer(true);
    } else {
      setOpenDrawer(false);
    }
  };

  //Confirm quit and takees the user to another page
  const handleConfirmQuit = () => {
      handleCloseDialog();
      // Additional actions to quit goes here
  };
  

  
  //Retrieve the prompt using axios
  const handlePrompt = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const existingResponse = await axios.get(`${baseURL}/prompt/latest`);
      
      if(existingResponse.data) {
        setPrompt(existingResponse.data);
      } else {
        const response = await axios.get(`${baseURL}/prompt`);
          if (response.status !== 200) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setPrompt(response.data);
          savePrompt(response.data, null);
      }

    } catch (error) {
        console.error('There was a problem fetching the message:', error);
    }
  };

  return (
    <div>
      <Typography variant="h2" sx={{width: `calc(100vw - 37rem)`}}>{prompt}</Typography>
      <Box>
        <Box sx={{marginY: 1, width: `calc(100vw - 38rem)`, height: '80%', overflowY: 'auto'}}>
          <Searchbar onInputChange={setCurrentInput}/>
          {/* this switches between two boxes depending if there's anything in the search bar*/}
          {(debouncedValue === '')? 
            <Box sx={{display: 'flex', justifyContent: 'center', height: '35rem'}}>
              <Typography variant="body2" sx={{color: colors.peach}}>
                Search for a track that best describes the prompt above
              </Typography>
            </Box>:
              <SongSelectionContainer
                songs={songs}
                onSongCardClick={handleSongCardClick}
                />}
        </Box>
      </Box>
      <SkipButton onOpen={handleOpenDialog}/>
      <ConfirmationDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmQuit}
            />
      <PromptSideDrawer drawerOpen={openDrawer} toggleDrawer={handleDrawer} songData={displayedSong}/>
    </div>
  );
};

export default PromptPage;
