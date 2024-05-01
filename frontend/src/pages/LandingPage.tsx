import { AppBar, Box, Button, Slide, styled, Typography } from "@mui/material";
import starsBackground from "../assets/stars_background.jpg";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { baseGlow, colors, landingBackground } from "../theme.ts";
import { useEffect, useRef, useState } from "react";
import {
  ForegroundPlanet,
  Planet1,
  Planet2,
  Planet3,
  Planet4,
} from "../components/Planets.tsx";

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
  zIndex: 2,
  height: "100vh",
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
          <AnimatedPrompt />
        </Box>
      </LandingPageContent>
      <StarsBackground />
      <Planet1 width="400px" height="400px" top="60vh" right="80vw" />
      <Planet2 width="1200px" height="1200px" top="5vh" left="50vw" />
      <Planet3 width="300px" height="300px" top="-25vh" left="75vw" />
      <Planet4 width="50px" height="50px" top="50vh" right="75vw" />
      <ForegroundPlanet />
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

export default LandingPage;
