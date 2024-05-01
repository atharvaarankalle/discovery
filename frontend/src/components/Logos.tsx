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

export const DiscoveryLogo = ({ width }: { width: string }) => {
  return <img src={discovery_logo} alt="Discovery Logo" width={width} />;
};
