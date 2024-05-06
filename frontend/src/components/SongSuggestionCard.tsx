import { Avatar, Box, BoxProps, styled } from "@mui/material";
import IconTextLabel from "./IconTextLabel";
import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";
import { SongData } from "../utils/interfaces";

/* Custom styles applied to MUI Box to be the main wrapper of SongSuggestionCard */
const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  backgroundColor: `#12122975`, // TODO: replace '#121229 with the value from the theme (the 75 at the end adds 46% opacity to colour hexcode)
  padding: "1.25rem",
  borderRadius: "1.25rem",
});

/* Prop types declaration for SongSuggestionCard */
interface SongSuggestionCardPropTypes extends BoxProps {
  username: string;
  profilePictureSrc?: string;
  caption?: string;
  songData: SongData;
}

/**
 * SongSuggestionCard Component
 *
 * @prop username: username of the user who suggested the song
 * @prop caption: optional prop for the caption the user writes to go along with their song suggestion
 * @prop songData: object containing song data such as song title, artist, album, and album art source
 */
const SongSuggestionCard = ({
  username,
  profilePictureSrc,
  caption,
  songData,
}: SongSuggestionCardPropTypes) => {
  return (
    <StyledBox>
      <IconTextLabel
        icon={<Avatar alt={username} src={profilePictureSrc} sx={{ mr: 1 }} />}
        children={username}
        variant="h5"
      />
      {caption && (
        <CustomTypography fontStyle="italic">{caption}</CustomTypography>
      )}
      <SongCard songData={songData} type="medium" />
    </StyledBox>
  );
};

export default SongSuggestionCard;
