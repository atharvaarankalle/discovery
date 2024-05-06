import { Box } from "@mui/material";
import SongSuggestionCard from "./SongSuggestionCard";
import Masonry from "@mui/lab/Masonry";
import { SongSuggestionData } from "../utils/interfaces";

/* Prop types for this component */
interface SuggestionContainerPropTypes {
  songSuggestionList: Array<SongSuggestionData>;
}

/**
 * SONG SUGGESTIONS CONTAINER:
 *
 * Takes in a list of song suggestions ({@link SongSuggestionData}) and renders them in a
 * scrollable container of a fixed height, using the MUI Masonry component.
 *
 */
const SongSuggestionsContainer = ({
  songSuggestionList,
}: SuggestionContainerPropTypes) => (
  <Box
    sx={{
      height: "90vh",
      overflow: "scroll",
      width: "100%",
      overflowX: "hidden",
    }}
  >
    {/* Note that the MUI Masonry component is a part of MUI Labs, not MUI core */}
    <Masonry columns={2} spacing={2} sequential>
      {songSuggestionList.map(
        ({ id, songData, username, caption, profilePictureSrc }) => (
          <Box key={id}>
            <SongSuggestionCard
              songData={{
                songTitle: songData.songTitle,
                album: songData.album,
                artists: songData.artists,
                albumArtSrc: songData.albumArtSrc,
              }}
              username={username}
              caption={caption}
              profilePictureSrc={profilePictureSrc}
            />
          </Box>
        )
      )}
    </Masonry>
  </Box>
);

export default SongSuggestionsContainer;
