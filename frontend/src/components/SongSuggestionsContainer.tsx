import { Box, Typography } from "@mui/material";
import SongSuggestionCard from "./SongSuggestionCard";
import Masonry from "@mui/lab/Masonry";
import { SongSuggestionData } from "../utils/interfaces";
import { useState } from "react";

/* Prop types for this component */
interface SuggestionContainerPropTypes {
  songSuggestionList: Array<SongSuggestionData>;
  onSongSuggestionCardClick?: (
    songSuggestionData: SongSuggestionData | null,
  ) => void;
}

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
      songSuggestionData.id === selectedCardId ? null : songSuggestionData.id,
    );
  };

  const songSuggestionsCount = songSuggestionList.length;

  return (
    <>
      {songSuggestionsCount > 0 ? (
        <Box pb={10}>
          {/* Note that the MUI Masonry component is a part of MUI Labs, not MUI core */}
          <Masonry columns={2} spacing={1} sequential sx={{ margin: 0 }}>
            {songSuggestionList.map((songSuggestionData) => (
              <Box key={songSuggestionData.id}>
                <SongSuggestionCard
                  songSuggestionData={songSuggestionData}
                  isSelected={songSuggestionData.id === selectedCardId}
                  onCardClick={() => handleCardClick(songSuggestionData)}
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
