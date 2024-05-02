import { Box, Card, IconButton, styled, Typography } from "@mui/material";
import musicNotPlayingCharacter from "../assets/music_not_playing.png";
import musicPlayingCharacter from "../assets/music_playing.gif";
import CustomTypography from "./CustomTypography.tsx";
import IconTextLabel from "./IconTextLabel.tsx";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { baseGlow } from "../theme.ts";

const MusicPlayerCard = styled(Card)(({ theme }) => ({
  width: "550px",
  height: "75px",
  backgroundColor: `${theme.palette.primary.dark}99`,
  zIndex: 3,
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  padding: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
}));

interface MusicPlayerProps {
  songTitle?: string;
  artist?: string;
  album?: string;
  albumArtSrc?: string;
}

export const MusicPlayer = ({
  songTitle,
  artist,
  album,
  albumArtSrc,
}: MusicPlayerProps) => {
  return (
    <MusicPlayerCard elevation={4}>
      {songTitle ? (
        <ActiveMusicPlayerContent
          songTitle={songTitle}
          album={album}
          artist={artist}
          albumArtSrc={albumArtSrc}
        />
      ) : (
        <IdleMusicPlayerContent />
      )}
      {/*<IdleMusicPlayerContent />*/}
    </MusicPlayerCard>
  );
};

const IdleMusicPlayerContent = () => {
  return (
    <>
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
    </>
  );
};

const SongInformation = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "5px",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: `${theme.palette.primary.main}`,
  backgroundColor: `${theme.palette.peach.main}`,
  "&:hover": {
    backgroundColor: theme.palette.lightPeach.main,
    transition: "0.2s",
    boxShadow: baseGlow,
  },
}));

interface ActiveMusicPlayerProps {
  songTitle: string;
  artist: string;
  album: string;
  albumArtSrc: string;
}

const ActiveMusicPlayerContent = ({
  songTitle,
  artist,
  album,
  albumArtSrc,
}: ActiveMusicPlayerProps) => {
  return (
    <>
      <Box component="img" src={albumArtSrc} height="100%" />
      <SongInformation flexGrow={1}>
        <CustomTypography
          tooltip={songTitle}
          variant="smSongTitle"
          color="peach.main"
          num_lines={2}
        >
          {songTitle}
        </CustomTypography>
        <IconTextLabel
          variant="smSongSubtitle"
          color="pink.main"
          icon={<PersonIcon sx={{ color: "peach.main" }} fontSize="small" />}
        >
          {artist}
        </IconTextLabel>
        <IconTextLabel
          variant="smSongSubtitle"
          color="pink.main"
          icon={<AlbumIcon sx={{ color: "peach.main" }} fontSize="small" />}
        >
          {album}
        </IconTextLabel>
      </SongInformation>
      <Box
        component="img"
        src={musicPlayingCharacter}
        height="100%"
        sx={{ imageRendering: "pixelated" }}
      />
      <StyledIconButton aria-label="play/pause snippet">
        <PlayArrowIcon />
      </StyledIconButton>
    </>
  );
};
