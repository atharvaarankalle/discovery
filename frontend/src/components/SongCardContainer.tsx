import { Grid } from "@mui/material";
import SongCard from "./SongCard.tsx";
import testAlbum from "../assets/It's_About_Time_(SWV_album).jpeg";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent, useState } from "react";

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

const getSongsToDisplay = (songList, currentPage, itemsPerPage) => {
  return songList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
};

const SongCardContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(testSongData.length / itemsPerPage);
  const [pageContents, setPageContents] = useState(
    getSongsToDisplay(testSongData, currentPage, itemsPerPage),
  );

  const handleChangePage = (e: ChangeEvent<unknown>, pageNumber: number) => {
    setPageContents(getSongsToDisplay(testSongData, pageNumber, itemsPerPage));
    setCurrentPage(pageNumber);
  };

  return (
    <Grid container spacing={3}>
      {pageContents.map((songData, index) => (
        <SongCardItem key={index} songData={songData} />
      ))}
      <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="secondary"
          size="large"
          onChange={handleChangePage}
        />
      </Grid>
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
