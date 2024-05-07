import { Box, Button, Stack, styled } from "@mui/material";
import discoverPageHeader from "../assets/discover_page_header.png";

import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";
import { SongData } from "../utils/interfaces";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useNavigate } from "react-router-dom";

/* Custom styles applied to MUI Box to be the main wrapper of this component */
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.dark}75`, // 75 at the end adds 46% opacity to colour hexcode
  backgroundImage: `url(${discoverPageHeader})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  borderRadius: "1.25rem",
}));

/* Prop types for the DiscoverPageHeader component for clarity */
interface DiscoverPageHeaderPropTypes {
  songData?: SongData;
}

/**
 * DISCOVER PAGE HEADER:
 *
 * @prop `songData`: optional {@link SongData} - If provided will render user's submission in a {@link SongCard} type="small".
 * If no songData object prop is provided, a button will be rendered that navigates to the prompt page once clicked,
 * so users can submit a song suggestion.
 *
 */
const DiscoverPageHeader = ({
  songData = undefined,
}: DiscoverPageHeaderPropTypes) => {
  const navigate = useNavigate();

  return (
    <StyledBox>
      <Stack
        spacing={3}
        p="1.25rem"
        alignItems="center"
        justifyContent="center"
      >
        <CustomTypography
          variant="h3"
          sx={{
            textTransform: songData ? "uppercase" : "none", // uppercase header text if user has submitted
            textAlign: "center",
          }}
        >
          {/* toggling state of header text based on if user has submitted a song */}
          {songData
            ? "Your Submission"
            : "Ready to share your song with the world?"}
        </CustomTypography>

        {/* conditional render of SongCard if user has submitted, else render the submit button */}
        {songData ? (
          <Box sx={{ width: "50%" }}>
            <SongCard type="small" songData={songData} />
          </Box>
        ) : (
          <Button
            variant="contained"
            color="lightPeach"
            sx={{ textTransform: "uppercase" }}
            onClick={() => navigate("/user/prompt")}
          >
            Submit a track
            <MusicNoteIcon sx={{ pl: 1 }} />
          </Button>
        )}
      </Stack>
    </StyledBox>
  );
};

export default DiscoverPageHeader;
