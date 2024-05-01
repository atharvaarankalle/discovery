import { AppBar, Box, Button, Slide, styled, Typography } from "@mui/material";
import starsBackground from "../assets/stars_background.jpg";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { baseGlow, colors, landingBackground } from "../theme.ts";
import { useEffect, useRef, useState } from "react";
import foregroundPlanet from "../assets/foreground_planet.svg";

const homePrompts = [
  "song that helps you poop",
  "daydreaming scenario song",
  "song to lock in to",
  "academic weapon song",
  "song stuck in your head",
  "afternoon nap song",
  "song to cry to",
  "late night gaming song",
];

const LandingPageBackground = styled("div")({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
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

const StyledButton = styled(Button)({
  boxShadow: baseGlow,
  marginLeft: "20px",
  padding: "0 30px",
});

const LandingPageContent = styled("div")({
  position: "relative",
  zIndex: 1,
  height: "100vh",
});

const ForegroundPlanet = styled("img")({
  position: "absolute",
  minWidth: "100%",
  left: "50%",
  bottom: -50,
  transform: "translate(-50%,0 )", // This centers the element
});

const LandingPage = () => {
  return (
    <LandingPageBackground>
      <LandingPageContent>
        <TopBar />
        <Box
          sx={{
            padding: "150px 60px 0px 60px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Typography variant="h4">DISCOVER the next </Typography>
          <AnimatedPrompt promptsList={homePrompts} />
        </Box>
        {/*<TEMP />*/}
        <ForegroundPlanet src={foregroundPlanet} />
      </LandingPageContent>
      <StarsBackground />
    </LandingPageBackground>
  );
};

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
      <Box flexGrow={1}>
        <DiscoveryLogoWithtext width="200px" />
      </Box>
      <StyledButton variant="contained" color="lightPeach">
        LOG IN
      </StyledButton>
      <StyledButton variant="contained" color="greyBlue">
        SIGN UP
      </StyledButton>
    </AppBar>
  );
};

const AnimatedPrompt = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex(
          (prevIndex) => (prevIndex + 1) % homePrompts.length,
        );
        setIsVisible(true);
      }, 200); // Adjust the timeout duration as needed
    }, 4000); // Change the interval duration to 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ overflow: "hidden" }} ref={boxRef}>
      <Slide in={isVisible} container={boxRef.current}>
        <Typography variant="h1">{homePrompts[currentTextIndex]}</Typography>
      </Slide>
      <Box
        sx={{
          maxWidth: "950px",
          paddingTop: "15px",
          borderBottom: "3px solid",
          borderColor: "peach.main",
        }}
      />
    </Box>
  );
};

const TEMP = () => {
  return (
    <>
      <Box sx={{ padding: "50px 100px" }}>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="mdSongTitle">Song title</Typography>
        <Typography variant="mdSongSubtitle">Song artist and album</Typography>
        <Typography variant="smSongTitle">Song title</Typography>
        <Typography variant="smSongSubtitle">Song artist and album</Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          button text
        </Typography>
        <StyledButton variant="contained" color="lightPeach">
          LOG IN
        </StyledButton>
        <StyledButton variant="contained" color="greyBlue">
          SIGN UP
        </StyledButton>
        <Button variant="outlined" color="lightPeach">
          SIGN UP
        </Button>
        <Button variant="underlined" color="pink">
          SIGN UP
        </Button>
      </Box>
    </>
  );
};

export default LandingPage;
