import DiscoverPageHeader from "../components/DiscoverPageHeader";
import SongSuggestionsContainer from "../components/SongSuggestionsContainer";
import { styled } from "@mui/material";
import useGet from "../utils/useGet";
import LoadingSpinner from "../components/LoadingSpinner";
import { SongSuggestionData } from "../utils/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledDiscoverContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 50,
});

const DiscoverPage = () => {
  const { isLoading, data } = useGet<SongSuggestionData[]>({
    url: `${API_BASE_URL}/feed`,
  });

  const songs = data === null ? [] : data;

  return (
    <StyledDiscoverContainer>
      <DiscoverPageHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SongSuggestionsContainer songSuggestionList={songs} />
      )}
    </StyledDiscoverContainer>
  );
};

export default DiscoverPage;
