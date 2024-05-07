import NavBar from "../components/NavBar";
import { Typography, ThemeProvider, Grid, Button } from "@mui/material";
import { theme } from "../theme";
import SongCard from "../components/SongCard";
import { useState } from "react";

const ProfilePage = () => {
  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    profilePic: "url_to_profile_pic",
    discoveryDate: "29th April 2024",
  };

  // Dummy data for songs
  const dummySongs = [
    {
      songTitle: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      albumArtSrc: "url_to_album_1",
    },
    {
      songTitle: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      albumArtSrc: "url_to_album_2",
    },
    {
      songTitle: "Song 3",
      artist: "Artist 3",
      album: "Album 3",
      albumArtSrc: "url_to_album_3",
    },
    {
      songTitle: "Song 4",
      artist: "Artist 4",
      album: "Album 4",
      albumArtSrc: "url_to_album_4",
    },
    {
      songTitle: "Song 5",
      artist: "Artist 5",
      album: "Album 5",
      albumArtSrc: "url_to_album_5",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const songsPerPage = 4;
  const startIndex = currentPage * songsPerPage;
  const endIndex = Math.min(startIndex + songsPerPage, dummySongs.length);
  const totalPages = Math.ceil(dummySongs.length / 4);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Typography variant="h3" style={{ marginBottom: "20px" }}>
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
              borderRadius: "50%",
              marginRight: "60px",
            }}
          ></img>
          <div>
            <Typography variant="h1">{dummyUser.name}</Typography>
            <Typography variant="subtitle1">
              Discovering since {dummyUser.discoveryDate}
            </Typography>
          </div>
        </div>

        <Typography variant="h3" style={{ marginBottom: "20px" }}>
          DISCOVERED SONGS
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {dummySongs.slice(startIndex, endIndex).map((song, index) => (
            <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
              <SongCard songData={song} isLiked={true} type="large" />
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default ProfilePage;
