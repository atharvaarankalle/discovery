import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const LikeButton = ({
  isLikedInitial,
  onLikeClick,
}: {
  isLikedInitial: boolean;
  onLikeClick: () => void;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLikeClick && onLikeClick();
  };

  return (
    <IconButton
      onClick={() => handleLikeClick()}
      color="lightPeach"
      disabled={isLikedInitial}
       className="like-button"
    >

      {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default LikeButton;
