import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <IconButton onClick={handleLikeClick}>
      {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default LikeButton;
