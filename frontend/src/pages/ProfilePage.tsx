import { Avatar, Box, Typography } from "@mui/material";
import { MusicPlayer } from "../components/MusicPlayer";
import useGet from "../utils/useGet";
import { SongData, User } from "../utils/interfaces";
import { formatDate } from "../utils/dateFormatter";
import { SavedSongsContainer } from "../components/SongCardPaginationContainers";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const ProfilePage = () => {
  const { currentUserId, setCurrentPreviewSong } = useContext(AppContext);

  const { data: userData } = useGet<User>({
    url: `${API_BASE_URL}/user/${currentUserId}`,
  });

  const user = userData === null ? null : (userData as User);
  const signupDate = user?.accountCreationDate
    ? formatDate(user.accountCreationDate)
    : "";

  const { isLoading: isLikedLoading, data: likedSongsData } = useGet<
    SongData[]
  >({
    url: `${API_BASE_URL}/user/${currentUserId}/liked`,
  });

  const likedSongs = likedSongsData === null ? [] : likedSongsData;

  // Updating the music player when user clicks the song card
  const handleSongCardClick = (songData: SongData | null) => {
    setCurrentPreviewSong(songData);
  };

  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <Typography
        variant="h3"
        style={{ marginBottom: "20px", letterSpacing: "0.14em" }}
      >
        PROFILE
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Avatar
          src={user?.profilePic}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "60px",
          }}
        />
        <div>
          <Typography variant="h1">{user?.displayName}</Typography>
          <Typography variant="subtitle1">
            Discovering since {signupDate}
          </Typography>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10vh",
        }}
      >
        <Typography
          variant="h3"
          style={{ marginBottom: "20px", letterSpacing: "0.14em" }}
        >
          DISCOVERED SONGS
        </Typography>
        {isLikedLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadingSpinner />
          </Box>
        ) : (
          <SavedSongsContainer
            songs={likedSongs}
            onSongCardClick={handleSongCardClick}
          />
        )}
        <MusicPlayer />
      </div>
    </Box>
  );
};

export default ProfilePage;
