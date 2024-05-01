import { Box } from "@mui/material";
import foregroundBase from "../assets/foreground_base.svg";
import foregroundLayer from "../assets/foreground_layer.svg";
import planet2 from "../assets/planet_2.svg";
import planet4 from "../assets/planet_4.svg";
import planet1 from "../assets/planet_1.svg";
import { FC } from "react";

export const ForegroundPlanet = () => {
  return (
    <>
      <Box
        component="img"
        src={foregroundBase}
        sx={{
          position: "absolute",
          minWidth: "100%",
          left: "50%",
          bottom: -70,
          transform: "translate(-50%,0 )", // This centers the element
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src={foregroundLayer}
        sx={{
          position: "absolute",
          minWidth: "100%",
          left: "50%",
          bottom: -70,
          transform: "translate(-50%,0 )", // This centers the element
          zIndex: 1,
          mixBlendMode: "hard-light",
        }}
      />
    </>
  );
};

interface PlanetProps {
  width: string;
  height: string;
  top: string;
  right: string;
}

export const Planet1: FC<PlanetProps> = ({ width, height, top, right }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        top: top,
        right: right,
        position: "absolute",
      }}
    >
      <Box
        sx={{
          // backgroundColor: "red",
          width: "100%",
          height: "100%",
          position: "absolute",
          mixBlendMode: "hard-light",
          background:
            "radial-gradient(50% 50% at 50% 50%, #E79DC3 44%, #D782CF 64%, #9C5AA6 87.5%, rgba(156, 90, 166, 0) 100%)",
        }}
      />
      <Box
        component="img"
        src={planet1}
        sx={{
          position: "absolute",
          width: "68%",
          height: "68%",
          top: "50%",
          left: "50%",
          mixBlendMode: "normal",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Box
        sx={{
          width: "68%",
          height: "68%",
          position: "absolute",
          mixBlendMode: "color-dodge",
          backgroundColor: "#4D4078",
          borderRadius: "500px",
          filter: "blur(5px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};

export const Planet2: FC<PlanetProps> = ({ width, height, top, right }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        position: "absolute",
        top: top,
        right: right,
      }}
    >
      <Box
        sx={{
          width: "55%",
          height: "55%",
          position: "absolute",
          backgroundColor: "#4D4078",
          borderRadius: "500px",
          filter: "blur(5px)",
          top: "50%",
          left: "47%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Box
        component="img"
        src={planet2}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          mixBlendMode: "hard-light",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};

export const Planet4: FC<PlanetProps> = ({ width, height, top, right }) => {
  return (
    <Box
      component="img"
      src={planet4}
      sx={{
        width: width,
        height: height,
        top: top,
        right: right,
        position: "absolute",
        mixBlendMode: "plus-lighter",
      }}
    />
  );
};
