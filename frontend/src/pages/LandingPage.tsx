import { AppBar, Box, Button, styled, Typography } from "@mui/material";
import starsBackground from "../assets/stars_background.jpg";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";

const LandingPage = () => {
  return (
    <LandingPageBackground>
      <LandingPageContent>
        <TopBar />
        <Box sx={{ padding: "100px" }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            button text
          </Typography>
        </Box>
      </LandingPageContent>
      <StarsBackground />
    </LandingPageBackground>
  );
};

const LandingPageBackground = styled("div")({
  background: "linear-gradient(116.82deg, #272747 0%, #7E4DCD 100%)",
  backgroundColor: "#272747",
  height: "100vh",
  width: "100%",
  position: "relative",
});

const StarsBackground = styled("div")({
  backgroundImage: `url(${starsBackground})`,
  mixBlendMode: "color-dodge",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundSize: "cover",
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
});

const LandingPageContent = styled("div")({
  position: "relative",
  zIndex: 1,
});

const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        boxShadow: "none",
        paddingY: "30px",
        paddingX: "60px",
        flexDirection: "row",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <DiscoveryLogoWithtext width="200px" />
      </Box>
      <StyledButton
        variant="contained"
        sx={{
          backgroundColor: "#FFE7DD",
          color: "#3B3B58",
        }}
      >
        LOG IN
      </StyledButton>
      <StyledButton
        variant="contained"
        sx={{
          backgroundColor: "#3B3B58",
          color: "#FFE7DD",
        }}
      >
        SIGN UP
      </StyledButton>
    </AppBar>
  );
};

const StyledButton = styled(Button)({
  borderRadius: "45px",
  // paddingY: "10px",
  paddingX: "20px",
  fontFamily: "Sora",
  fontWeight: 600,
  fontSize: "1rem",
  minHeight: 0,
  minWidth: 0,
  boxShadow: "0px 0px 15px 5px rgba(215, 130, 207, 0.38)",
  marginLeft: "20px",
});

export default LandingPage;
