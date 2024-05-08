import { LoggedInBackground } from "./UserAppBase.tsx";
import { StarsBackground } from "../components/PlanetBackground.tsx";
import { Box, styled, Typography } from "@mui/material";
import musicPlayingCharacter from "../assets/music_playing.gif";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";

const StyledLogo = styled(Box)({
  position: "absolute",
  top: "30px",
  left: "30px",
});

// custom style for typography not included in the theme
const StyledTypography = styled(Typography)({
  textAlign: "center",
  fontFamily: "Sora",
  fontWeight: 500,
});

/**
 * MobileDefaultPage to be displayed when the application is accessed on small screen devices
 */
const MobileDefaultPage = () => {
  return (
    <LoggedInBackground>
      <StyledLogo>
        <DiscoveryLogoWithtext width="150px" />
      </StyledLogo>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <MobileContents />
      </Box>
      <StarsBackground />
    </LoggedInBackground>
  );
};

/**
 * MobileContents Component containing user-friendly messages to use the application on desktop
 */
const MobileContents = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        maxWidth: "20rem",
        paddingTop: "2rem",
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        hey there, musical genius!
      </Typography>
      <StyledTypography
        sx={{
          fontSize: "1.25rem",
        }}
      >
        the mobile world is not quite ready for discovery yet :(
      </StyledTypography>
      <Box
        component="img"
        src={musicPlayingCharacter}
        height="15rem"
        sx={{ imageRendering: "pixelated" }}
      />
      <StyledTypography
        sx={{
          fontSize: "1rem",
          color: "peach.main",
        }}
      >
        in the meantime, feel free to use discovery on your laptop or desktop
        and stay tuned! ^u^
      </StyledTypography>
    </Box>
  );
};

export default MobileDefaultPage;
