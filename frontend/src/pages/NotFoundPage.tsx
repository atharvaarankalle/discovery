import { LoggedInBackground } from "./UserAppBase.tsx";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { StyledLogo } from "./LoginSignupPage.tsx";
import musicNotAvailableCharacter from "../assets/music_not_available.png";

/**
 * NotFoundPage to be displayed when the user tries to access a page that doesn't exist while not logged in
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <LoggedInBackground>
      <StyledLogo>
        <DiscoveryLogoWithtext
          width="200px"
          handleClick={() => navigate("/")}
        />
      </StyledLogo>
      <NotFoundPageContents />
    </LoggedInBackground>
  );
};

/**
 * NotFoundPageContents Component containing user-friendly messages to the user the page they are looking for doesn't exist
 */
export const NotFoundPageContents = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "35rem",
        }}
      >
        <Typography variant="h1">OOPS!</Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          404 NOT FOUND
        </Typography>

        <Box
          component="img"
          src={musicNotAvailableCharacter}
          height="15rem"
          sx={{ imageRendering: "pixelated", marginBottom: "2rem" }}
        />
        <Typography
          variant="h2"
          sx={{ color: "peach.main", textAlign: "center" }}
        >
          Looks like the page you’re looking for has gone solo :(
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
