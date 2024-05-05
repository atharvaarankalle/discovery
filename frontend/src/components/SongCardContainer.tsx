import { Grid } from "@mui/material";
import SongCard from "./SongCard.tsx";
import testAlbum from "../assets/It's_About_Time_(SWV_album).jpeg";

const testSongData = [
  {
    songTitle: "Weak 1",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 2",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 3",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 4",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 5",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
];

const SongCardContainer = () => {
  return (
    <Grid container spacing={3}>
      {testSongData.map((songData, index) => (
        <SongCardItem key={index} songData={songData} />
      ))}
    </Grid>
  );
};

const SongCardItem = ({ songData }) => {
  return (
    <Grid item xs={12} md={6}>
      <SongCard songData={songData} type="medium" />
    </Grid>
  );
};

export default SongCardContainer;
