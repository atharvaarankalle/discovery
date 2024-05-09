import { Box, Typography } from "@mui/material";
import SongSuggestionCard from "./SongSuggestionCard";
import Masonry from "@mui/lab/Masonry";
import { SongSuggestionData } from "../utils/interfaces";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../AppContextProvider";

/* Prop types for this component */
interface SuggestionContainerPropTypes {
  songSuggestionList: Array<SongSuggestionData>;
  onSongSuggestionCardClick?: (
    songSuggestionData: SongSuggestionData | null
  ) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * SONG SUGGESTIONS CONTAINER:
 *
 * Takes in a list of song suggestions ({@link SongSuggestionData}) and renders them in a
 * scrollable masonry style container that fills the height of its wrapper/parent component.
 * If provided an empty list, will render a message instead
 *
 * Also takes in an optional onClick function to pass down to the rendered SongSuggestionCards,
 * which takes the songSuggestionData as a parameter
 *
 */
const SongSuggestionsContainer = ({
  songSuggestionList,
  onSongSuggestionCardClick,
}: SuggestionContainerPropTypes) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { currentUserId } = useContext(AppContext);

  const handleCardClick = (songSuggestionData: SongSuggestionData) => {
    // call onClick function IF provided by higher level component
    if (onSongSuggestionCardClick) {
      /* check if the selected card is different to this newly clicked one and set the new data if true, 
      or clear data if they are toggling the same card (i.e. unselection) */
      selectedCardId !== songSuggestionData.id
        ? onSongSuggestionCardClick(songSuggestionData)
        : onSongSuggestionCardClick(null);
    }
    // set selected status for this newly clicked card
    setSelectedCardId(
      songSuggestionData.id === selectedCardId ? null : songSuggestionData.id
    );
  };

  const handleLikeClick = async (songSuggestionData: SongSuggestionData) => {
    const songSuggestionId = songSuggestionData.id;
    try {
      await axios.put(`${API_BASE_URL}/user/${currentUserId}/liked`, {
        songSuggestionId,
      });
    } catch (error: unknown) {
      // catching error
    }
  };

  const songSuggestionsCount = songSuggestionList.length;

  return (
    <>
      {songSuggestionsCount > 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "53vh",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.5rem",
          }}
        >
          {/* Note that the MUI Masonry component is a part of MUI Labs, not MUI core */}
          <Masonry columns={2} spacing={2} sequential sx={{ margin: 0 }}>
            {songSuggestionList.map((songSuggestionData) => (
              <Box key={songSuggestionData.id}>
                <SongSuggestionCard
                  songSuggestionData={songSuggestionData}
                  isSelected={songSuggestionData.id === selectedCardId}
                  onCardClick={() => handleCardClick(songSuggestionData)}
                  onLikeClick={() => handleLikeClick(songSuggestionData)}
                />
              </Box>
            ))}
          </Masonry>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">No songs suggested yet!</Typography>
        </Box>
      )}
    </>
  );
};

export default SongSuggestionsContainer;
