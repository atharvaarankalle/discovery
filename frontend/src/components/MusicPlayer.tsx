import { Box, Card, CardProps, styled, Typography } from "@mui/material";
import musicNotPlayingCharacter from "../assets/music_not_playing.png";

const MusicPlayerCard = styled(Card)(({ theme }) => ({
  width: "550px",
  height: "120px",
  backgroundColor: `${theme.palette.primary.dark}99`,
  zIndex: 3,
  position: "absolute",
  bottom: 10,
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  backgroundBlendMode: "hard-light",
  backdropFilter: "blur(10px)",
  padding: "15px 25px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

interface MusicPlayerPropTypes extends CardProps {
  songTitle: string;
  artist: string;
  album: string;
  albumArtSrc: string;
}

export const MusicPlayer = ({
  songTitle,
  artist,
  album,
  albumArtSrc,
}: MusicPlayerPropTypes) => {
  return (
    <MusicPlayerCard elevation={4}>
      <Typography variant="smSongTitle" color="peach.main">
        Click a track to play a snippet
      </Typography>
      {/*<Box component="img" src={test} width={100} />*/}
      <Box
        component="img"
        src={musicNotPlayingCharacter}
        width={100}
        sx={{ imageRendering: "pixelated" }}
      />
    </MusicPlayerCard>
  );
};
