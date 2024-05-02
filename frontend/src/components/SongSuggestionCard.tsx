import { Box, BoxProps, styled } from "@mui/material";
import IconTextLabel from "./IconTextLabel";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";

/* Custom styles applied to MUI Box to be the main wrapper of SongSuggestionCard */
const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "1rem",
    backgroundColor: `${theme.palette.primary.main}75`, // adds 46% opacity to colour hexcode
    padding: "1rem",
    borderRadius: "1rem",
}));

/* Prop types declaration for SongSuggestionCard */
interface SongSuggestionCardPropTypes extends BoxProps {
    username: string;
    comment?: string;
    songData: {
        songTitle: string;
        artist: string;
        album: string;
        albumArtSrc: string;
    }
}

/**
 * SongSuggestionCard Component
 * 
 * @prop username: username of the user who suggested the song
 * @prop comment: optional prop for the comment made by the user about the song
 * @prop songData: object containing song data such as song title, artist, album, and album art source
 */
const SongSuggestionCard = ({ username, comment, songData }: SongSuggestionCardPropTypes) => {
    return (
        <StyledBox>
            <IconTextLabel icon={<AccountCircleIcon color="secondary" fontSize="large" />} children={username} variant="h5" />
            {comment && <CustomTypography fontStyle="italic">{comment}</CustomTypography>}
            <SongCard songTitle={songData.songTitle} artist={songData.artist} album={songData.album} albumArtSrc={songData.albumArtSrc} hasLikeButton />
        </StyledBox>
    );
};

export default SongSuggestionCard;
