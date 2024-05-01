import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    // TODO: Call endpoint to add song to the user's liked songs.
    // Will likely need to pass in some details from SuggestionCard / SongCard (i.e., user id, song id, etc.)
  };

  return (
    <IconButton onClick={handleLikeClick} color="lightPeach">
      {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default LikeButton;
