import { Box, Grid, styled } from "@mui/material";
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
  {
    songTitle: "Weak 6",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 6",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 7",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 8",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 9",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 10",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 11",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 12",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 13",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 10",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 11",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 12",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 13",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 10",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 11",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 12",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 13",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 10",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 11",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 12",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 13",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 10",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 11",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 12",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
  {
    songTitle: "Weak 13",
    artist: "SWV",
    album: "It's About Time",
    albumArtSrc: testAlbum,
  },
];

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: `${theme.palette.secondary.main}`,
    borderColor: `${theme.palette.peach.main}`,
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: `${theme.palette.peach.main}33`,
  },
  "& .MuiPaginationItem-previousNext, .MuiPaginationItem-firstLast": {
    backgroundColor: `${theme.palette.greyBlue.main}`,
  },
  "& .MuiPaginationItem-previousNext:hover, .MuiPaginationItem-firstLast:hover":
    {
      backgroundColor: `${theme.palette.primary.main}`,
    },
}));

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "20rem",
      }}
    >
      <SongCardGrid pageContents={pageContents} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledPagination
          count={totalPages}
          page={currentPage}
          color="secondary"
          size="large"
          onChange={handleChangePage}
          showFirstButton
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

const SongCardGrid = ({ pageContents }) => {
  return (
    <Grid container spacing={3}>
      {pageContents.map((songData, index) => (
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
