import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  TextField,
  styled,
} from "@mui/material";
import CustomTypography from "./CustomTypography";
import SongCard from "./SongCard";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useState } from "react";
import { SongData } from "../utils/interfaces";
import axios from "axios";
import { AppContext } from "../AppContextProvider";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* Custom styles applied to MUI Drawer */
const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    background: "#22224480",
  },
}));

/* Custom styles applied to MUI Box to be the main wrapper for the content in PromptSideDrawer */
const StyledBox = styled(Box)(() => ({
  width: "25rem",
  display: "flex",
  flexDirection: "column",
  padding: "4rem 2rem",
  gap: "0.5rem",
}));

/* Custom styles applied to MUI TextField */
const StyledTextField = styled(TextField)(({ theme }) => ({
  background: `${theme.palette.secondary.main}0F`,
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
  "& .MuiFilledInput-root": {
    backgroundColor: `${theme.palette.secondary.main}0F`,
    color: theme.palette.lightPeach.main,
    "&:hover:not(.Mui-focused)": {
      backgroundColor: `${theme.palette.secondary.main}1F`,
      "&:before": {
        borderColor: theme.palette.peach.main,
      },
    },
  },
  "& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after": {
    borderColor: theme.palette.peach.main,
  },
  "& label.Mui-focused": {
    color: theme.palette.peach.main,
  },
}));

/* Custom styles applied to MUI Button */
const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  padding: "0.3rem 1.5rem",
}));

/* Prop types declaration for PromptSideDrawer */
interface PromptSideDrawerPropTypes extends DrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  songData: SongData;
}

/**
 * PromptSideDrawer Component
 *
 * @prop drawerOpen: boolean to determine if the drawer is open or not
 * @prop toggleDrawer: function to toggle the drawer open and close
 * @prop songData: object containing song data such as song title, artist, album, and album art source
 */


const PromptSideDrawer = ({
  drawerOpen,
  toggleDrawer,
  songData,
}: PromptSideDrawerPropTypes) => {
  const [caption, setCaption] = useState("");
  const { currentUserId, promptIdOfTheDay } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // If the input is empty, set caption to undefined
    if (event.target.value === "") {
      setCaption("");
    } else {
      setCaption(event.target.value);
    }
  };

  const handleSuggestionSubmit = () => {
    axios.put(`${API_BASE_URL}/user/${currentUserId}/suggested`, {
      spotifySongId: songData.id,
      caption: caption,
      prompt: promptIdOfTheDay,
    });
    setCaption("");
      window.location.href = "/user/discover"; // Force a full page reload
  };

  return (
    <StyledDrawer
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      variant="persistent"
      anchor="right"
    >
      <StyledBox>
        <CustomTypography variant="h4" textAlign="left">
          SELECTED TRACK:
        </CustomTypography>
        <SongCard songData={songData} type="small" />
        <StyledTextField
          variant="filled"
          label="Comment"
          value={caption}
          multiline
          onChange={(event) => handleCaptionChange(event)}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <StyledButton
            variant="outlined"
            color="lightPeach"
            endIcon={<SendIcon />}
            onClick={handleSuggestionSubmit}
          >
            Post
          </StyledButton>
        </Box>
      </StyledBox>
    </StyledDrawer>
  );
};

export default PromptSideDrawer;
