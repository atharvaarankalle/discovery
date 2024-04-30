import {
  Card,
  CardProps,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CustomTypography from "./CustomTypography";

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
        <CardMedia
          className="firstImage"
          sx={{
            height: "100%",
            width: "auto",
            zIndex: "1",
            transition: "transform 0.3s ease",
          }}
          title="Album cover art"
          component="img"
          image={albumArtSrc}
        />

        <CardMedia
          className="secondImage"
          sx={{
            height: "100%",
            width: "auto",
            zIndex: "0",
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            transform: "translateX(-100%)",
            transition: "transform 0.3s ease",
          }}
          title="CD"
          component="img"
          src="/images/cd-image.png"
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

          <Stack direction="row" gap={0.5}>
            <PersonIcon sx={{ color: "#FFE7DD" }} fontSize="small" />
            <CustomTypography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#F3BFBA" }}
              tooltip={artist}
              numLines={1}
            >
              {artist}
            </CustomTypography>
          </Stack>

          <Stack direction="row" gap={0.5}>
            <AlbumIcon sx={{ color: "#FFE7DD" }} fontSize="small" />
            <CustomTypography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#F3BFBA" }}
              tooltip={album}
              numLines={1}
            >
              {album}
            </CustomTypography>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {/* This should be its own component as it will make API request as well so might be too complex in this one component */}
        <IconButton sx={{ color: "#FFF" }} onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

export default SongCard;
