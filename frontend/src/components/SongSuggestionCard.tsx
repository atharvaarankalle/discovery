import { Avatar, Box, styled } from "@mui/material";
import IconTextLabel from "./IconTextLabel";
import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";
import { SongSuggestionData } from "../utils/interfaces";

/* Custom styles applied to MUI Box to be the main wrapper of SongSuggestionCard */
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  backgroundColor: `${theme.palette.primary.dark}75`,
  padding: "1.25rem",
  borderRadius: "1.25rem",
}));

/* Prop types declaration for SongSuggestionCard */
interface SongSuggestionCardPropTypes {
  songSuggestionData: SongSuggestionData;
  onCardClick?: () => void;
  isLiked?: boolean;
  isSelected?: boolean;
}

/**
 * SongSuggestionCard Component
 *
 * @prop songSuggestionData: an object containing song data ({@link SongSuggestionData})
 * @prop onCardClick: the onClick function for the SongCard area. optional prop if type='small'
 * @prop isLiked: boolean value to set the initial state of the like button, false by default unless specified true
 * @prop isSelected: boolean value to set the selected state of the card, false by default
 * **/

const SongSuggestionCard = ({
  songSuggestionData,
  isLiked,
  isSelected,
  onCardClick,
}: SongSuggestionCardPropTypes) => {
  const { username, caption, profilePictureSrc, songData } = songSuggestionData;
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
      <SongCard
        songData={songData}
        isLiked={isLiked}
        isSelected={isSelected}
        onCardClick={onCardClick}
        type="medium"
      />
    </StyledBox>
  );
};

export default SongSuggestionCard;
