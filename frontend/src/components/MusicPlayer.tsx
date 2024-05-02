import { Box, Card, IconButton, styled, Typography } from "@mui/material";
import musicNotPlayingCharacter from "../assets/music_not_playing.png";
import musicPlayingCharacter from "../assets/music_playing.gif";
import CustomTypography from "./CustomTypography.tsx";
import IconTextLabel from "./IconTextLabel.tsx";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import { baseGlow } from "../theme.ts";
import { useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

// Custom styling for the Music Player Card component
const MusicPlayerCard = styled(Card)(({ theme }) => ({
  width: "550px",
  height: "75px",
  backgroundColor: `${theme.palette.primary.dark}B3`,
  zIndex: 3,
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
  padding: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
}));

/* Prop types for the MusicPlayer component */
interface MusicPlayerProps {
  songData?: {
    songTitle: string;
    artists: string;
    album: string;
    albumArtSrc: string;
    songAudioSrc: string;
  };
}

/**
 * MusicPlayer Component
 *
 * @param songData: Object containing data of the selected song (song title, artists, album, album cover, and song audio)
 */
export const MusicPlayer = ({ songData }: MusicPlayerProps) => {
  return (
    <MusicPlayerCard elevation={5}>
      {songData !== undefined ? (
        <ActiveMusicPlayerContent songData={songData} />
      ) : (
        <IdleMusicPlayerContent />
      )}
    </MusicPlayerCard>
  );
};

/**
 * IdleMusicPlayerContent Component
 */
const IdleMusicPlayerContent = () => {
  return (
    <>
      <Typography variant="smSongTitle" color="peach.main">
        Click a track to play a snippet
      </Typography>
      <Box
        component="img"
        src={musicNotPlayingCharacter}
        height="100%"
        sx={{ imageRendering: "pixelated" }}
      />
    </>
  );
};

// Custom styling for the SongInformation Box component
const SongInformation = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

// Custom styling for the Play/Pause button
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: `${theme.palette.primary.main}`,
  backgroundColor: `${theme.palette.peach.main}`,
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.lightPeach.main,
    boxShadow: baseGlow,
  },
}));

/* Prop type for the ActiveMusicPlayer Component */
interface ActiveMusicPlayerProps {
  songData: {
    songTitle: string;
    artists: string;
    album: string;
    albumArtSrc: string;
    songAudioSrc: string;
  };
}

/**
 * ActiveMusicPlayerContent Component
 *
 * @param songData: Object containing data of the selected song (song title, artists, album, album cover, and song audio)
 */
const ActiveMusicPlayerContent = ({ songData }: ActiveMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const songAudioRef = useRef(new Audio(songData.songAudioSrc));

  // handle switching playing and pausing the song audio
  const handleTogglePlaying = () => {
    if (!isPlaying) {
      const audioPlayPromise = songAudioRef.current.play();

      if (audioPlayPromise) {
        audioPlayPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Failed to play the selected track", error);
          });
      }
    } else {
      songAudioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // handle pause and play state when the song audio ends
  useEffect(() => {
    const currentSong = songAudioRef.current;

    const handleSongEnd = () => {
      setIsPlaying(false);
    };

    currentSong.addEventListener("ended", handleSongEnd);

    return () => {
      currentSong.removeEventListener("ended", handleSongEnd);
    };
  }, []);

  return (
    <>
      <Box component="img" src={songData.albumArtSrc} height="100%" />
      <SongInformation flexGrow={1}>
        <CustomTypography
          tooltip={songData.songTitle}
          variant="smSongTitle"
          color="peach.main"
          num_lines={2}
          mb={0.5}
        >
          {songData.songTitle}
        </CustomTypography>
        <IconTextLabel
          variant="smSongSubtitle"
          color="pink.main"
          icon={<PersonIcon sx={{ color: "peach.main" }} fontSize="small" />}
        >
          {songData.artists}
        </IconTextLabel>
        <IconTextLabel
          variant="smSongSubtitle"
          color="pink.main"
          icon={<AlbumIcon sx={{ color: "peach.main" }} fontSize="small" />}
        >
          {songData.album}
        </IconTextLabel>
      </SongInformation>
      <Box
        component="img"
        src={isPlaying ? musicPlayingCharacter : musicNotPlayingCharacter}
        height="100%"
        sx={{ imageRendering: "pixelated" }}
      />
      <StyledIconButton
        aria-label="play/pause snippet"
        onClick={handleTogglePlaying}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </StyledIconButton>
    </>
  );
};
