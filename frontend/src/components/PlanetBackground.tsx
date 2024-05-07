import { styled } from "@mui/material";
import { ReactNode } from "react";
import { landingBackground } from "../theme";
import {
  Planet1,
  Planet2,
  Planet3,
  Planet4,
  ForegroundPlanet,
} from "./Planets";
import starsBackground from "../assets/stars_background.jpg";

// Background container for the whole landing page
const LandingPageBackground = styled("div")(({ theme }) => ({
  background: landingBackground,
  backgroundColor: theme.palette.primary.main,
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

type PlanetBackgroundProps = {
  children?: ReactNode;
};
const PlanetBackground = ({ children }: PlanetBackgroundProps) => {
  return (
    <LandingPageBackground>
      {children}
      <StarsBackground />
      <Planet1 width="400px" height="400px" top="60vh" right="80vw" />
      <Planet2 width="1200px" height="1200px" top="5vh" left="50vw" />
      <Planet3 width="300px" height="300px" top="-25vh" left="75vw" />
      <Planet4 width="50px" height="50px" top="50vh" right="75vw" />
      <ForegroundPlanet />
    </LandingPageBackground>
  );
};

export default PlanetBackground;
