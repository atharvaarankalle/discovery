import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, styled } from "@mui/material";
import { loggedInBackground } from "../theme";

// Background container for the whole logged in user experience
export const LoggedInBackground = styled("div")({
  background: loggedInBackground,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

const UserAppBase = () => {
  return (
    <LoggedInBackground>
      <NavBar />
      {/* adding spacing around all child elements */}
      <Box m={"3rem"}>
        <Outlet />
      </Box>
    </LoggedInBackground>
  );
};

export default UserAppBase;
