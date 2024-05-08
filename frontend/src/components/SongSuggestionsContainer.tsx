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
 * scrollable masonry style container that fills the height of its wrapper/parent component.
 *
 */
const SongSuggestionsContainer = ({
  songSuggestionList,
}: SuggestionContainerPropTypes) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      maxHeight: "53vh",
      overflow: "scroll",
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
                id: songData.id,
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
