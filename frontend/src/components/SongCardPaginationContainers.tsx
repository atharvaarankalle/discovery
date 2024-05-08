import { Box, Grid, styled, Typography } from "@mui/material";
import SongCard from "./SongCard.tsx";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { SongData } from "../utils/interfaces.ts";

// Custom styling for the MUI pagination component
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

/* Prop types for SavedSongsContainer and SongSelectionContainer */
interface SongContainerProps {
  songs?: SongData[];
}

/**
 * SavedSongsContainer Component
 *
 * @param songs: list of the user's saved songs
 */
export const SavedSongsContainer = ({ songs }: SongContainerProps) => {
  return (
    <SongCardContainer
      songs={songs}
      songsPerPage={4}
      songCardType="medium"
      height="20rem"
      noDataMessage="Like a song from your discovery feed to add it to your discovered songs!"
    />
  );
};

/**
 * SongSelectionContainer Component
 *
 * @param songs: list of songs based on the user's search term
 */
export const SongSelectionContainer = ({ songs }: SongContainerProps) => {

  return (
    <SongCardContainer
      songs={songs}
      songsPerPage={6}
      songCardType="large"
      height="35rem"
      noDataMessage="Search for a track that best describes the prompt above!"
    />
  );
};

/* Prop types for SongCardContainerProps */
interface SongCardContainerProps {
  songs?: SongData[];
  songsPerPage: number;
  songCardType: "small" | "medium" | "large";
  height: string | number;
  noDataMessage: string;
}

/**
 * SongCardContainer Component
 *
 * @param songs: list of all the songs to display in pagination
 * @param songsPerPage: number of songs to display per page
 * @param songCardType: type of song card to display songs in
 * @param height: height of the song card pagination container
 * @param noDataMessage: message to display if there is no data to show
 */
const SongCardContainer = ({
  songs,
  songsPerPage,
  songCardType,
  height,
  noDataMessage,
}: SongCardContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = songs ? Math.ceil(songs.length / songsPerPage) : 0;

  useEffect(()=>{
    setPageContents(getSongsToDisplay(currentPage))},[songs]);

  /**
   * Gets a subset of the songs in the list to display in the current page
   *
   * @param currentPage: the number of the page to display
   */
  const getSongsToDisplay = (currentPage: number) => {
    return songs
      ? songs.slice(
          (currentPage - 1) * songsPerPage,
          currentPage * songsPerPage
        )
      : undefined;
  };

  const [pageContents, setPageContents] = useState(
    songs ? getSongsToDisplay(currentPage) : undefined
  );

  /**
   * Setting the current page to the page the user selects and displaying the correct data corresponding to the page
   * number
   *
   * @param e: pagination button click event
   * @param pageNumber: number of the page selected by the click event
   */
  const handleChangePage = (e: ChangeEvent<unknown>, pageNumber: number) => {
    console.log(e.type); // event must be used or else error
    setPageContents(getSongsToDisplay(pageNumber));
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
      {songs && ( // Show pagination if there is data to display
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
            showLastButton
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

/* Prop types for SongCardGrid */
interface SongCardGridProps {
  pageContents?: SongData[];
  songCardType: "small" | "medium" | "large";
  noDataMessage: string;
}

/**
 * SongCardGrid Component
 *
 * @param pageContents: list of songs to display in the page
 * @param songCardType: type of song card to display songs in
 * @param noDataMessage: message to display if there is no data to show
 */
const SongCardGrid = ({
  pageContents,
  songCardType,
  noDataMessage,
}: SongCardGridProps) => {
  // Display no data message if there is no data to display
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
      {pageContents.map((songData) => (
        <Grid item xs={12} md={6} key={songData.id}>
          <SongCard songData={songData} isLiked={true} type={songCardType} />
        </Grid>
      ))}
    </Grid>
  );
};
