import {
  Card,
  CardProps,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  CardMediaProps,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CustomTypography from "./CustomTypography";
import CdImage from "../assets/cd_image.png";
import IconTextLabel from "./IconTextLabel";
import LikeButton from "./LikeButton";

// // Custom styles applied to MUI CardMedia to be the Album used in  hover animation
const AlbumArt = styled(CardMedia)<CardMediaProps>({
  height: "100%",
  width: "auto",
  zIndex: "1",
  transition: "transform 0.3s ease",
});

// Custom styles applied to MUI CardMedia to be the CD image used in hover animation
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

/* Custom styles applied to MUI card to be the main wrapper of SongCard */
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  height: "7rem",
  position: "relative",
  backgroundColor: `${theme.palette.primary.main}80`, // adds 50% opacity to colour hexcode
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    " .secondImage ": {
      transform: "translateX(0%)",
    },
    ".firstImage ": {
      transform: "translateX(-50%)",
    },
  },
}));

/* Prop types declaration for SongCard */
interface SongCardPropTypes extends CardProps {
  songTitle: string;
  artist: string;
  album: string;
  albumArtSrc: string;
  hasLikeButton?: boolean;
}

/** 
 * SongCard Component
 * 
@prop songTitle: title of the song
@prop artist: artist/s of the song
@prop album: album the song is from
@prop albumArtSrc: url link to the album art image url 
@prop hasLikeButton: false by default, if true, will render a LikeButton on the right side of the card

**/
const SongCard = ({
  songTitle,
  artist,
  album,
  albumArtSrc,
  hasLikeButton = false,
}: SongCardPropTypes) => {
  return (
    <StyledCard square elevation={5}>
      <CardActionArea
        sx={{
          display: "flex",
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
            tooltip={songTitle}
            variant="mdSongTitle"
            num_lines={2}
            mb={0.5}
          >
            {songTitle}
          </CustomTypography>

          <IconTextLabel
            tooltip={artist}
            variant="mdSongSubtitle"
            num_lines={1}
            icon={
              <PersonIcon sx={{ color: "secondary.main" }} fontSize="small" />
            }
          >
            {artist}
          </IconTextLabel>

          <IconTextLabel
            tooltip={album}
            variant="mdSongSubtitle"
            num_lines={1}
            icon={
              <AlbumIcon sx={{ color: "secondary.main" }} fontSize="small" />
            }
          >
            {album}
          </IconTextLabel>
        </CardContent>
      </CardActionArea>

      {hasLikeButton && (
        <CardActions>
          <LikeButton />
        </CardActions>
      )}
    </StyledCard>
  );
};

export default SongCard;
