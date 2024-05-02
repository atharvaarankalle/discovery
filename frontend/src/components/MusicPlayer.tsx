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
  songTitle?: string;
  artists?: string;
  album?: string;
  albumArtSrc?: string;
  songAudioSrc?: string;
}

/**
 * MusicPlayer Component
 *
 * @param songTitle: the title of the selected song (OPTIONAL)
 * @param artists: the artists of the selected song (OPTIONAL)
 * @param album: the title of the album the song is from (OPTIONAL)
 * @param albumArtSrc: the url link to the album cover (OPTIONAL)
 * @param songAudioSrc: the url link to the song audio (OPTIONAL)
 */
export const MusicPlayer = ({
  songTitle,
  artists,
  album,
  albumArtSrc,
  songAudioSrc,
}: MusicPlayerProps) => {
  // check if the user has selected a song to play
  const songSelected =
    songTitle && artists && album && albumArtSrc && songAudioSrc;

  return (
    <MusicPlayerCard elevation={5}>
      {songSelected ? (
        <ActiveMusicPlayerContent
          songTitle={songTitle}
          album={album}
          artists={artists}
          albumArtSrc={albumArtSrc}
          songAudioSrc={songAudioSrc}
        />
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
        width={100}
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
  gap: "5px",
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
  songTitle: string;
  artists: string;
  album: string;
  albumArtSrc: string;
  songAudioSrc: string;
}

/**
 * ActiveMusicPlayerContent Component
 *
 * @param songTitle: the title of the selected song
 * @param artists: the artists of the selected song
 * @param album: the title of the album the song is from
 * @param albumArtSrc: the url link to the album cover
 * @param songAudioSrc: the url link to the song audio
 */
const ActiveMusicPlayerContent = ({
  songTitle,
  artists,
  album,
  albumArtSrc,
  songAudioSrc,
}: ActiveMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const songAudioRef = useRef(new Audio(songAudioSrc));

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
          {artists}
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
