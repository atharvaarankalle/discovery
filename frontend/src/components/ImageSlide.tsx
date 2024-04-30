import { Box, CardMedia, Slide } from "@mui/material";

const ImageHoverSlide = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        "&:hover $topImage": {
          transform: "translateX(100%)",
        },
      }}
    >
      <CardMedia
        sx={{
          position: "absolute",
          transition: "transform 0.3s ease",
          zIndex: 1,
        }}
        title="Top Image"
        component="img"
        image="https://media.pitchfork.com/photos/638902d2e5592afa444298b9/master/w_1600%2Cc_limit/SZA-SOS.jpg"
      />
      <CardMedia
        title="Bottom Image"
        component="img"
        sx={{ zIndex: 0 }}
        image="https://media.discordapp.net/attachments/1139105200272048148/1234811222533345342/cd-1169624_1280_1.png?ex=66321711&is=6630c591&hm=9cf95b86f9b9eb712cd62d78f80fc3868747d33ce28a6848346d5cc588ee6e70&=&format=webp&quality=lossless"
      />
    </Box>
  );
};

export default ImageHoverSlide;
