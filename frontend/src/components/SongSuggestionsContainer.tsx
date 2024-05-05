import { Box } from "@mui/material";
import SongSuggestionCard from "./SongSuggestionCard";
import Masonry from "@mui/lab/Masonry";

/* Prop types for this component */
interface SuggestionContainerPropTypes {
  songSuggestionList: Array<{
    id: number;
    songData: {
      songTitle: string;
      album: string;
      artist: string;
      albumArtSrc: string;
    };
    username: string;
    caption: string;
    profilePictureSrc: string;
  }>;
}

/**
 * SONG SUGGESTIONS CONTAINER
 *
 * Takes in a list of song suggestions as a list, with the following fields:
 * id: unique suggestion identifier (number)
 * songData: consisting of songTitle, album, artist/s and albumArtSrc (all required strings)
 * caption: caption from the associated user (optional string)
 * username: username of the associated user (string)
 * profilePictureSrc: src of the associated user's profile picture (optional string)
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
                artist: songData.artist,
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
