import { Box } from "@mui/material";
import foregroundBase from "../assets/foreground_base.svg";
import foregroundLayer from "../assets/foreground_layer.svg";
import planet1 from "../assets/planet_1.svg";
import planet2 from "../assets/planet_2.svg";
import planet3 from "../assets/planet_3.svg";
import planet4 from "../assets/planet_4.svg";
import { FC, useEffect, useState } from "react";

/**
 * ForegroundPlanet Component
 */
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
          transform: "translate(-50%,0 )",
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
          transform: "translate(-50%,0 )",
          zIndex: 1,
          mixBlendMode: "hard-light",
        }}
      />
    </>
  );
};

/* Prop types for Planet1, Planet2, Planet3, Planet4 */
interface PlanetProps {
  width: string | number;
  height: string | number;
  top: string | number;
  right?: string | number;
  left?: string | number;
}

/**
 * Planet1 Component
 *
 * @param width: width of the planet
 * @param height: height of the planet
 * @param top: position of the planet relative to parent's top boundary
 * @param right: position of the planet relative to parent's right boundary
 * @param left: position of the planet relative to parent's left boundary
 */
export const Planet1 = ({ width, height, top, right, left }: PlanetProps) => {
  const [isGlow, setIsGlow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlow((prevIsGlow) => !prevIsGlow);
    }, 3000); // Change the prompt every second

    return () => clearInterval(interval);
  }, [setIsGlow]);

  return (
    <Box
      sx={{
        width: width,
        height: height,
        top: top,
        left: left,
        right: right,
        position: "absolute",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          mixBlendMode: "hard-light",
          opacity: isGlow ? 1 : 0.3,
          transition: "3s",
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

/**
 * Planet2 Component
 *
 * @param width: width of the planet
 * @param height: height of the planet
 * @param top: position of the planet relative to parent's top boundary
 * @param right: position of the planet relative to parent's right boundary
 * @param left: position of the planet relative to parent's left boundary
 */
export const Planet2: FC<PlanetProps> = ({
  width,
  height,
  top,
  right,
  left,
}) => {
  const [isGlow, setIsGlow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlow((prevIsGlow) => !prevIsGlow);
    }, 3000); // Change the prompt every second

    return () => clearInterval(interval);
  }, [setIsGlow]);

  return (
    <Box
      sx={{
        width: width,
        height: height,
        top: top,
        left: left,
        right: right,
        position: "absolute",
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
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          mixBlendMode: "hard-light",
          opacity: isGlow ? 1 : 0.5,
          transition: "3s",
          top: "50%",
          left: "47%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(50% 50% at 50% 50%, #E79DC3 49.8%, #D782CF 68.8%, #9C5AA6 90.3%, rgba(128, 128, 135, 0) 100%)",
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
          opacity: isGlow ? 1 : 0.7,
          transition: "3s",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};

/**
 * Planet3 Component
 *
 * @param width: width of the planet
 * @param height: height of the planet
 * @param top: position of the planet relative to parent's top boundary
 * @param right: position of the planet relative to parent's right boundary
 * @param left: position of the planet relative to parent's left boundary
 */
export const Planet3: FC<PlanetProps> = ({
  width,
  height,
  top,
  right,
  left,
}) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        top: top,
        left: left,
        right: right,
        position: "absolute",
      }}
    >
      <Box
        sx={{
          width: "95%",
          height: "95%",
          position: "absolute",
          backgroundColor: "#4D4078",
          borderRadius: "500px",
          filter: "blur(5px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Box
        component="img"
        src={planet3}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          mixBlendMode: "plus-lighter",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};

/**
 * Planet1+4 Component
 *
 * @param width: width of the planet
 * @param height: height of the planet
 * @param top: position of the planet relative to parent's top boundary
 * @param right: position of the planet relative to parent's right boundary
 * @param left: position of the planet relative to parent's left boundary
 */
export const Planet4: FC<PlanetProps> = ({
  width,
  height,
  top,
  right,
  left,
}) => {
  return (
    <Box
      component="img"
      src={planet4}
      sx={{
        width: width,
        height: height,
        top: top,
        left: left,
        right: right,
        position: "absolute",
        mixBlendMode: "plus-lighter",
      }}
    />
  );
};
