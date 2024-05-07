import { LoggedInBackground } from "./UserAppBase.tsx";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DiscoveryLogoWithtext } from "../components/Logos.tsx";
import { StyledLogo } from "./LoginSignupPage.tsx";

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1">OOPS!</Typography>
          <Typography variant="h4">404 NOT FOUND</Typography>
          <Typography variant="h2" sx={{ color: "peach.main" }}>
            Looks like the page you’re looking for has gone solo :(
          </Typography>
        </Box>
      </Box>
    </LoggedInBackground>
  );
};
export default NotFoundPage;
