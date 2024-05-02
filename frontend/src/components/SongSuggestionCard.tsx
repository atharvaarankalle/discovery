import { Avatar, Box, BoxProps, styled } from "@mui/material";
import IconTextLabel from "./IconTextLabel";
import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";

/* Custom styles applied to MUI Box to be the main wrapper of SongSuggestionCard */
const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: `#12122975`, // TODO: replace '#121229 with the value from the theme (the 75 at the end adds 46% opacity to colour hexcode)
    padding: "1.25rem",
    borderRadius: "1.25rem",
}));

/* Prop types declaration for SongSuggestionCard */
interface SongSuggestionCardPropTypes extends BoxProps {
    username: string;
    profilePictureSrc: string;
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
const SongSuggestionCard = ({ username, profilePictureSrc, comment, songData }: SongSuggestionCardPropTypes) => {
    return (
        <StyledBox>
            <IconTextLabel icon={ <Avatar alt={username} src={profilePictureSrc} sx={{ mr: 1 }} /> } children={username} variant="h5" />
            {comment && <CustomTypography fontStyle="italic">{comment}</CustomTypography>}
            <SongCard songTitle={songData.songTitle} artist={songData.artist} album={songData.album} albumArtSrc={songData.albumArtSrc} hasLikeButton />
        </StyledBox>
    );
};

export default SongSuggestionCard;
