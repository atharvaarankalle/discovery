import discovery_logo_with_text from "../assets/discovery_logo_with_text.svg";
import discovery_logo from "../assets/discovery_logo.svg";

/* Prop types for DiscoveryLogoWithText and DiscoveryLogo */
interface LogoPropTypes {
  width?: string | number;
  height?: string | number;
}

/**
 * DiscoveryLogoWithText Component
 *
 * @param width: width of the logo
 * @param height: height of the logo
 */
export const DiscoveryLogoWithtext = ({ width, height }: LogoPropTypes) => {
  return (
    <img
      src={discovery_logo_with_text}
      alt="Discovery Logo with Text"
      width={width}
      height={height}
    />
  );
};

/**
 * DiscoveryLogo Component
 *
 * @param width: width of the logo
 * @param height: height of the logo
 */
export const DiscoveryLogo = ({ width, height }: LogoPropTypes) => {
  return (
    <img
      src={discovery_logo}
      alt="Discovery Logo"
      width={width}
      height={height}
    />
  );
};
