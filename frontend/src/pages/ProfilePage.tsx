import { Typography } from "@mui/material";

import { SavedSongsContainer } from "../components/SongCardPaginationContainers";
import { MusicPlayer } from "../components/MusicPlayer";

const ProfilePage = () => {
  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    profilePic:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    discoveryDate: "29th April 2024",
  };

  // Dummy data for songs
  const dummySongs = [
    {
      id: "123123123",
      songTitle: "Song 1",
      artists: "Artist 1",
      album: "Album 1",
      albumArtSrc:
        "https://m.media-amazon.com/images/I/61uEKlSVzqL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "123456789",
      songTitle: "Song 2",
      artists: "Artist 2",
      album: "Album 2",
      albumArtSrc: "https://i.redd.it/17iihei3zlkc1.jpeg",
    },
    {
      id: "111222333",
      songTitle: "Song 3",
      artists: "Artist 3",
      album: "Album 3",
      albumArtSrc: "https://i.redd.it/17iihei3zlkc1.jpeg",
    },
    {
      id: "456456456",
      songTitle: "Song 4",
      artists: "Artist 4",
      album: "Album 4",
      albumArtSrc:
        "https://m.media-amazon.com/images/I/61uEKlSVzqL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "987654321",
      songTitle: "Song 5",
      artists: "Artist 5",
      album: "Album 5",
      albumArtSrc: "https://i.redd.it/17iihei3zlkc1.jpeg",
    },
  ];

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
            src={dummyUser.profilePic}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "60px",
            }}
          />
          <div>
            <Typography variant="h1">{dummyUser.name}</Typography>
            <Typography variant="subtitle1">
              Discovering since {dummyUser.discoveryDate}
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
          <SavedSongsContainer songs={dummySongs} />
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
