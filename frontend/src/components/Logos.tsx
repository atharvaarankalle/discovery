import discovery_logo_with_text from "../assets/discovery_logo_with_text.svg";
import discovery_logo from "../assets/discovery_logo.svg";
import { Box } from "@mui/material";

/* Prop types for DiscoveryLogoWithText and DiscoveryLogo */
interface LogoPropTypes extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string | number;
  height?: string | number;
}

/**
 * DiscoveryLogoWithText Component which refreshes the page when clicked
 *
 * @param width: width of the logo
 * @param height: height of the logo
 */
export const DiscoveryLogoWithtext = ({ width, height }: LogoPropTypes) => {
  return (
    <Box
      sx={{ "&:hover": { cursor: "pointer" } }}
      component="img"
      src={discovery_logo_with_text}
      alt="Discovery Logo with Text"
      width={width}
      height={height}
      onClick={() => window.location.reload()}
    />
  );
};

/**
 * DiscoveryLogo Component
 *
 * @param width: width of the logo
 * @param height: height of the logo
 */
export const DiscoveryLogo = ({ width, height, ...props }: LogoPropTypes) => {
  return (
    <img
      src={discovery_logo}
      alt="Discovery Logo"
      width={width}
      height={height}
      {...props}
    />
  );
};
