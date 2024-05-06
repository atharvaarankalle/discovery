import { Box, Button, Stack, styled } from "@mui/material";
import starsBackground from "../assets/stars_background.jpg";
import planet3 from "../assets/planet_3.svg";
import planet4 from "../assets/planet_4.svg";

import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";
import { SongData } from "../utils/interfaces";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useNavigate } from "react-router-dom";

/* Custom styles applied to MUI Box to be the main wrapper of this component */
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.greyBlue.main,
  borderRadius: "1.25rem",
}));

/* Custom styles applied to MUI Box to be the background image of the component */
const StarsBackground = styled(Box)({
  backgroundImage: `url(${starsBackground})`,
  backgroundPosition: "top",

  mixBlendMode: "plus-lighter",
});

/* Custom styles applied to MUI Box to position/overlay the planet3 image */
const Planet3 = styled(Box)({
  backgroundImage: `url(${planet3})`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "90rem",
  backgroundPositionY: "-15rem",
  borderRadius: "1.25rem",
  backgroundSize: "25rem",
});

/* Custom styles applied to MUI Box to position/overlay the planet4 image */
const Planet4 = styled(Box)({
  backgroundImage: `url(${planet4})`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "3rem",
  backgroundPositionY: "5rem",
  borderRadius: "1.25rem",
});

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
      <StarsBackground>
        <Planet3>
          <Planet4>
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
                <Box sx={{ width: "60%" }}>
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
          </Planet4>
        </Planet3>
      </StarsBackground>
    </StyledBox>
  );
};

export default DiscoverPageHeader;
