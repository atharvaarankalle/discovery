import DiscoverPageHeader from "../components/DiscoverPageHeader";
import SongSuggestionsContainer from "../components/SongSuggestionsContainer";
import albumart from "../assets/TheCompleteConfectionCover.png";
import song from "../assets/spongebob-boowomp.mp3";
import { styled } from "@mui/material";

const StyledDiscoverContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 50,
});

const DiscoverPage = () => {
  // TEMPORARY!!!
  const songs = [
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
    },
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
    },
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
    },
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
      caption: "This is a caption. A caption? A caption.",
    },
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
    },
    {
      id: "id",
      songData: {
        id: "song-id",
        songTitle: "Song title bruh",
        artists: "me, myself, i",
        album: "dis album",
        albumArtSrc: albumart,
        songAudioSrc: song,
      },
      username: "username",
    },
  ];

  return (
    <StyledDiscoverContainer>
      <DiscoverPageHeader />
      <SongSuggestionsContainer songSuggestionList={songs} />
    </StyledDiscoverContainer>
  );
};

export default DiscoverPage;
