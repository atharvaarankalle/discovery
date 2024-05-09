import DiscoverPageHeader from "../components/DiscoverPageHeader";
import SongSuggestionsContainer from "../components/SongSuggestionsContainer";
import { Box, styled } from "@mui/material";
import useGet from "../utils/useGet";
import LoadingSpinner from "../components/LoadingSpinner";
import { SongData, SongSuggestionData } from "../utils/interfaces";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledDiscoverContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 50,
});

const DiscoverPage = () => {
  const { currentUserId, setCurrentPreviewSong } = useContext(AppContext);

  // Getting Current User's Song Suggestion
  const { data: todaysSongSuggestionData } = useGet<SongData>({
    url: `${API_BASE_URL}/user/${currentUserId}/suggested/today`,
  });
  const todaysSongSuggestion =
    todaysSongSuggestionData === null ? undefined : todaysSongSuggestionData;

  // Getting Today's Discover Feed
  const { isLoading: isFeedLoading, data: feedData } = useGet<
    SongSuggestionData[]
  >({
    url: `${API_BASE_URL}/feed`,
  });
  const songs = feedData === null ? [] : feedData;

  // Updating the music player when user clicks the song card
  const handleSongSuggestionClick = (
    songSuggestionData: SongSuggestionData | null
  ) => {
    setCurrentPreviewSong(songSuggestionData?.songData ?? null);
  };

  return (
    <StyledDiscoverContainer>
      <DiscoverPageHeader songData={todaysSongSuggestion} />
      {isFeedLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : (
        <SongSuggestionsContainer
          songSuggestionList={songs}
          onSongSuggestionCardClick={handleSongSuggestionClick}
        />
      )}
    </StyledDiscoverContainer>
  );
};

export default DiscoverPage;
