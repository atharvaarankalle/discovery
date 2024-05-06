import { AppBar, Box, Button, Slide, styled, Typography } from "@mui/material";
import starsBackground from "../assets/stars_background.jpg";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { baseGlow, landingBackground } from "../theme.ts";
import { useEffect, useRef, useState } from "react";
import {
  ForegroundPlanet,
  Planet1,
  Planet2,
  Planet3,
  Planet4,
} from "../components/Planets.tsx";
import { useNavigate } from "react-router-dom";

// Example prompts to loop through in the AnimatedPrompt component
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

// Background container for the whole landing page
const LandingPageBackground = styled("div")(({ theme }) => ({
  background: landingBackground,
  backgroundColor: `${theme.palette.primary.main}`,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
}));

// Custom style to add transparent stars background through blend modes
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

// Custom style for the LOG IN and SIGN IN buttons
const StyledButton = styled(Button)({
  boxShadow: baseGlow,
  marginLeft: "20px",
  padding: "0 30px",
});

// Container for content in landing page so that they lay on top of the background
const LandingPageContent = styled("div")({
  position: "relative",
  zIndex: 2,
  height: "100vh",
});

/**
 * LandingPage to contain all components within the landing page
 */
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

/**
 * TopBar Component to display logo and LOG IN and SIGN IN buttons
 */
const TopBar = () => {
  const navigate = useNavigate();
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
      <StyledButton
        variant="contained"
        color="lightPeach"
        onClick={() => navigate("/login")}
      >
        LOG IN
      </StyledButton>
      <StyledButton variant="contained" color="greyBlue">
        SIGN UP
      </StyledButton>
    </AppBar>
  );
};

/**
 * AnimatedPrompt Component to change the example prompt in intervals and animate each change
 */
const AnimatedPrompt = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex(
          (prevIndex) => (prevIndex + 1) % homePrompts.length
        );
        setIsVisible(true);
      }, 200); // Allow for 0.2 seconds between each transition
    }, 4000); // Change the prompt every 4 seconds

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
