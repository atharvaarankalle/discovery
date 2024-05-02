import discovery_logo_with_text from "../assets/discovery_logo_with_text.svg";
import discovery_logo from "../assets/discovery_logo.svg";

export const DiscoveryLogoWithtext = ({ width }: { width: string }) => {
  return (
    <img
      src={discovery_logo_with_text}
      alt="Discovery Logo with Text"
      width={width}
    />
  );
};

interface DiscoveryLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width: string;
}
export const DiscoveryLogo = ({ width, ...props }: DiscoveryLogoProps) => {
  return (
    <img src={discovery_logo} alt="Discovery Logo" width={width} {...props} />
  );
};
