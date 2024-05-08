import { Typography } from "@mui/material";
import { MusicPlayer } from "../components/MusicPlayer";
import useGet from "../utils/useGet";
import { SongData, User } from "../utils/interfaces";
import { formatDate } from "../utils/dateFormatter";
import { SavedSongsContainer } from "../components/SongCardPaginationContainers";
import LoadingSpinner from "../components/LoadingSpinner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const ProfilePage = () => {
  // TODO: replace with user from AppContext
  const userId = "663b83b5e21bb2bb97d23a0a";

  const { data: userData } = useGet<User>({
    url: `${API_BASE_URL}/user/${userId}`,
  });

  const user = userData === null ? null : (userData as User);
  const signupDate = user?.accountCreationDate
    ? formatDate(user.accountCreationDate)
    : "";

  const { isLoading: isLikedLoading, data: likedSongsData } = useGet<
    SongData[]
  >({
    url: `${API_BASE_URL}/user/${userId}/liked`,
  });

  const likedSongs = likedSongsData === null ? [] : likedSongsData;

  return (
    <>
      <div style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
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
          <img
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
            marginBottom: "350px",
          }}
        >
          <Typography
            variant="h3"
            style={{ marginBottom: "20px", letterSpacing: "0.14em" }}
          >
            DISCOVERED SONGS
          </Typography>
          {isLikedLoading ? (
            <LoadingSpinner />
          ) : (
            <SavedSongsContainer songs={likedSongs} />
          )}
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
