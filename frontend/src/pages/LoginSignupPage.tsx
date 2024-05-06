import { Box, styled } from "@mui/material";
import LoginSignupTabs, { TabsTypes } from "../components/LoginSignupTabs";
import PlanetBackground from "../components/PlanetBackground";
import { DiscoveryLogoWithtext } from "../components/Logos";

const LoginPageContent = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100vh",
  zIndex: 5,
});

const StyledLogo = styled(Box)({
  position: "absolute",
  left: "60px", // to match landing page
  top: "30px", // to match landing page
});

type LoginSignupPageProps = {
  activeTab: TabsTypes;
};

const LoginSignupPage = ({ activeTab }: LoginSignupPageProps) => {
  return (
    <PlanetBackground>
      <LoginPageContent>
        <StyledLogo>
          <DiscoveryLogoWithtext width="200px" />
        </StyledLogo>
        <LoginSignupTabs initialTab={activeTab} />
      </LoginPageContent>
    </PlanetBackground>
  );
};

export default LoginSignupPage;
