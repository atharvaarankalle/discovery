import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardMediaProps,
  CardProps,
  styled,
  Theme,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CustomTypography from "./CustomTypography";
import CdImage from "../assets/cd_image.png";
import IconTextLabel from "./IconTextLabel";
import LikeButton from "./LikeButton";
import { SongData } from "../utils/interfaces";

// Custom styles applied to MUI CardMedia to be the Album used in  hover animation
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

/* Custom styles applied to MUI card to be the main wrapper of SongCardBase */
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
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

/* Prop types declaration for SongCardBase */
export interface SongCardBasePropTypes extends CardProps {
  songData: SongData;
  type: "small" | "medium" | "large";
  onCardClick?: () => void;
  isLiked?: boolean;
  isSelected?: boolean;
}

/**
 * SongCardBase Component
 * 
@prop songData: an object containing song data ({@link SongData})
@prop type: required prop with value of "small", "medium" or "large", indicating what SongCard type to render
@prop onCardClick: the onClick function for the card area. optional prop if type='small'
@prop isLiked: boolean value to set the initial state of the like button, false by default unless specified true
@prop isSelected: boolean value to set the selected state of the card, false by default
**/
const SongCard = ({
  songData,
  type,
  onCardClick,
  isLiked = false,
  isSelected = false,
}: SongCardBasePropTypes) => {
  const { songTitle, artists, album, albumArtSrc } = songData;
  const theme: Theme = useTheme(); // importing theme object to use in sx prop

  // Logic to handle SongCard click
  const handleSongCardClick = () => {
    onCardClick?.();
  };

  // deciding card height based on what size (variant) it is
  let cardHeight: string;
  switch (type) {
    case "small":
      cardHeight = "5rem";
      break;
    case "large":
      cardHeight = "9rem";
      break;
    default:
      cardHeight = "7rem";
  }

  return (
    <StyledCard
      square
      elevation={5}
      sx={{
        height: `${cardHeight}`,
        // adding styles to apply to overall card when selected or not selected
        backgroundColor: isSelected ? theme.palette.primary.main : "auto",
        borderRight: isSelected
          ? `0.5rem solid ${theme.palette.secondary.main}`
          : "none",
        paddingRight: !isSelected ? `0.5rem` : "none",
        transition: "border-right 0s ease",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
        }}
        disabled={type === "small"}
        onClick={handleSongCardClick}
      >
        <AlbumArt
          className="firstImage"
          title="Album cover art"
          component="img"
          image={albumArtSrc}
          sx={{ transform: isSelected ? "translateX(-50%)" : undefined }}
        />

        <Cd
          className="secondImage"
          title="CD"
          component="img"
          image={CdImage}
          sx={{ transform: isSelected ? "translateX(0%)" : undefined }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <CustomTypography
            tooltip={songTitle}
            variant={type === "small" ? "smSongTitle" : "mdSongTitle"}
            color={"secondary.main"}
            num_lines={type === "small" ? 1 : 2}
            mb={0.5}
          >
            {songTitle}
          </CustomTypography>

          <IconTextLabel
            tooltip={artists}
            variant={type === "small" ? "smSongSubtitle" : "mdSongSubtitle"}
            color={"peach.main"}
            num_lines={1}
            icon={
              <PersonIcon sx={{ color: "secondary.main" }} fontSize="small" />
            }
          >
            {artists}
          </IconTextLabel>

          <IconTextLabel
            tooltip={album}
            variant={type === "small" ? "smSongSubtitle" : "mdSongSubtitle"}
            num_lines={1}
            color={"peach.main"}
            icon={
              <AlbumIcon sx={{ color: "secondary.main" }} fontSize="small" />
            }
          >
            {album}
          </IconTextLabel>
        </CardContent>
      </CardActionArea>

      {type === "medium" && (
        <CardActions>
          <LikeButton isLikedInitial={isLiked} />
        </CardActions>
      )}
    </StyledCard>
  );
};

export default SongCard;
