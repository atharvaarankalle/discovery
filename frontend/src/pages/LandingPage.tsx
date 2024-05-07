import { AppBar, Box, Button, Slide, styled, Typography } from "@mui/material";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { baseGlow } from "../theme.ts";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanetBackground from "../components/PlanetBackground.tsx";

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
    <PlanetBackground>
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
    </PlanetBackground>
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
      <StyledButton
        variant="contained"
        color="greyBlue"
        onClick={() => navigate("/signup")}
      >
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
          (prevIndex) => (prevIndex + 1) % homePrompts.length,
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
