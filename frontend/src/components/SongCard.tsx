import {
  Card,
  CardProps,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  CardMediaProps,
} from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CustomTypography from "./CustomTypography";
import CdImage from "../assets/cd-image.png";
import IconTextLabel from "./IconTextLabel";

const AlbumArt = styled(CardMedia)<CardMediaProps>({
  height: "100%",
  width: "auto",
  zIndex: "1",
  transition: "transform 0.3s ease",
});

const Cd = styled(CardMedia)<CardMediaProps>({
  height: "100%",
  width: "auto",
  zIndex: "0",
  position: "absolute",
  top: 0,
  left: 0,
  objectFit: "cover",
  transform: "translateX(-100%)",
  transition: "transform 0.3s ease",
});

const StyledCard = styled(Card)({
  display: "flex",
  position: "relative",
  backgroundColor: "#27274780",
  width: "auto",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "#272747",
    " .secondImage ": {
      transform: "translateX(0%)",
    },
    ".firstImage ": {
      transform: "translateX(-50%)",
    },
  },
});

interface SongCardPropTypes extends CardProps {
  songTitle: string;
  artist: string;
  album: string;
  albumArtSrc: string;
}
const SongCard = ({
  songTitle,
  artist,
  album,
  albumArtSrc,
}: SongCardPropTypes) => {
  /* REFACTOR TO USE LIKE BUTTON COMPONENT WHEN MADE */
  const [isLiked, setIsLiked] = useState(false);

  return (
    <StyledCard square elevation={5}>
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "7rem",
        }}
      >
        <AlbumArt
          className="firstImage"
          title="Album cover art"
          component="img"
          image={albumArtSrc}
        />

        <Cd
          className="secondImage"
          title="CD"
          component="img"
          image={CdImage}
        />

        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <CustomTypography
            sx={{ fontWeight: "bold", color: "#FFE7DD", mb: 0.5 }}
            tooltip={songTitle}
            numLines={2}
            variant="body1"
          >
            {songTitle}
          </CustomTypography>

          <IconTextLabel
            tooltip={artist}
            variant="body2"
            numLines={1}
            icon={<PersonIcon sx={{ color: "#FFE7DD" }} fontSize="small" />}
          >
            {artist}
          </IconTextLabel>

          <IconTextLabel
            tooltip={album}
            variant="body2"
            numLines={1}
            icon={<AlbumIcon sx={{ color: "#FFE7DD" }} fontSize="small" />}
          >
            {album}
          </IconTextLabel>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {/* REFACTOR TO USE LIKE BUTTON COMPONENT WHEN MADE */}
        <IconButton sx={{ color: "#FFF" }} onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

export default SongCard;
