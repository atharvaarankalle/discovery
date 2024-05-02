import { Box, BoxProps, styled } from "@mui/material";
import IconTextLabel from "./IconTextLabel";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SongCard from "./SongCard";
import CustomTypography from "./CustomTypography";

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "1rem",
    backgroundColor: `${theme.palette.primary.main}75`, // adds 46% opacity to colour hexcode
    padding: "1rem",
    borderRadius: "1rem",
}));

interface SongSuggestionCardPropTypes extends BoxProps {
    username: string;
    comment: string;
    songData: {
        songTitle: string;
        artist: string;
        album: string;
        albumArtSrc: string;
    }
}

const SongSuggestionCard = ({ username, comment, songData }: SongSuggestionCardPropTypes) => {
    return (
        <StyledBox>
            <IconTextLabel icon={<AccountCircleIcon color="secondary" fontSize="large" />} children={username} variant="h5" />
            <CustomTypography fontStyle="italic">{comment}</CustomTypography>
            <SongCard songTitle={songData.songTitle} artist={songData.artist} album={songData.album} albumArtSrc={songData.albumArtSrc} hasLikeButton />
        </StyledBox>
    )
}

export default SongSuggestionCard;
