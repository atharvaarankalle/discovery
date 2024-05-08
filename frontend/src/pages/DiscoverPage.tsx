import DiscoverPageHeader from "../components/DiscoverPageHeader";
import SongSuggestionsContainer from "../components/SongSuggestionsContainer";
import { styled } from "@mui/material";
import useGet from "../utils/useGet";
import LoadingSpinner from "../components/LoadingSpinner";
import { SongData, SongSuggestionData } from "../utils/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledDiscoverContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 50,
});

const DiscoverPage = () => {
  const { isLoading: isFeedLoading, data: feedData } = useGet<
    SongSuggestionData[]
  >({
    url: `${API_BASE_URL}/feed`,
  });
  const songs = feedData === null ? [] : feedData;

  // TODO: Replace with user ID from app context.
  const userId = "663858af99e6720bfd8f96fb";
  const { data: todaysSongSuggestionData } = useGet<SongData>({
    url: `${API_BASE_URL}/user/${userId}/suggested/today`,
  });
  const todaysSongSuggestion =
    todaysSongSuggestionData === null ? undefined : todaysSongSuggestionData;

  return (
    <StyledDiscoverContainer>
      <DiscoverPageHeader songData={todaysSongSuggestion} />
      {isFeedLoading ? (
        <LoadingSpinner />
      ) : (
        <SongSuggestionsContainer songSuggestionList={songs} />
      )}
    </StyledDiscoverContainer>
  );
};

export default DiscoverPage;
