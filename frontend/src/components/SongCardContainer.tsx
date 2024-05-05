import { Box, Grid, styled, Typography } from "@mui/material";
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

export const SavedSongsContainer = () => {
  return (
    <SongCardContainer
      // songs={testSongData}
      itemsPerPage={4}
      songCardType="medium"
      height="20rem"
      noDataMessage="Like a song from your discovery feed to add it to your discovered songs!"
    />
  );
};

export const SongSelectionContainer = () => {
  return (
    <SongCardContainer
      itemsPerPage={6}
      songCardType="large"
      height="35rem"
      noDataMessage="Search for a track that best describes the prompt above!"
    />
  );
};

const SongCardContainer = ({
  songs = undefined,
  itemsPerPage,
  songCardType,
  height,
  noDataMessage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = songs ? Math.ceil(songs.length / itemsPerPage) : 0;
  const [pageContents, setPageContents] = useState(
    songs ? getSongsToDisplay(songs, currentPage, itemsPerPage) : null,
  );

  const handleChangePage = (e: ChangeEvent<unknown>, pageNumber: number) => {
    setPageContents(getSongsToDisplay(songs, pageNumber, itemsPerPage));
    setCurrentPage(pageNumber);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: height,
      }}
    >
      <SongCardGrid
        pageContents={pageContents}
        songCardType={songCardType}
        noDataMessage={noDataMessage}
      />
      {songs && (
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
      )}
    </Box>
  );
};

const SongCardGrid = ({ pageContents, songCardType, noDataMessage }) => {
  if (!pageContents) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1">{noDataMessage}</Typography>
      </Box>
    );
  }
  return (
    <Grid container spacing={3}>
      {pageContents.map((songData, index) => (
        <SongCardItem
          key={index}
          songData={songData}
          songCardType={songCardType}
        />
      ))}
    </Grid>
  );
};

const SongCardItem = ({ songData, songCardType }) => {
  return (
    <Grid item xs={12} md={6}>
      <SongCard songData={songData} type={songCardType} />
    </Grid>
  );
};
