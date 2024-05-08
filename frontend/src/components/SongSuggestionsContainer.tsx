import { Box, Typography } from "@mui/material";
import SongSuggestionCard from "./SongSuggestionCard";
import Masonry from "@mui/lab/Masonry";
import { SongSuggestionData } from "../utils/interfaces";
import { useState } from "react";

/* Prop types for this component */
interface SuggestionContainerPropTypes {
  songSuggestionList: Array<SongSuggestionData>;
}

/**
 * SONG SUGGESTIONS CONTAINER:
 *
 * Takes in a list of song suggestions ({@link SongSuggestionData}) and renders them in a
 * scrollable masonry style container that fills the height of its wrapper/parent component.
 * If provided an empty list, will render a message instead
 *
 */
const SongSuggestionsContainer = ({
  songSuggestionList,
}: SuggestionContainerPropTypes) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId === selectedCardId ? null : cardId);
  };

  const songSuggestionsCount = songSuggestionList.length;

  return (
    <>
      {songSuggestionsCount > 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.5rem",
          }}
        >
          {/* Note that the MUI Masonry component is a part of MUI Labs, not MUI core */}
          <Masonry columns={2} spacing={2} sequential sx={{ margin: 0 }}>
            {songSuggestionList.map(
              ({ id, songData, username, caption, profilePictureSrc }) => (
                <Box key={id}>
                  <SongSuggestionCard
                    songData={{
                      id: songData.id,
                      songTitle: songData.songTitle,
                      album: songData.album,
                      artists: songData.artists,
                      albumArtSrc: songData.albumArtSrc,
                    }}
                    username={username}
                    caption={caption}
                    profilePictureSrc={profilePictureSrc}
                    isSelected={songData.id === selectedCardId}
                    onCardClick={() => handleCardClick(songData.id)}
                    type="medium"
                  />
                </Box>
              )
            )}
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
