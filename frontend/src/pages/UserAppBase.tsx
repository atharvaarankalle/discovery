import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import styled from "@emotion/styled";
import { loggedInBackground } from "../theme";
import { Box } from "@mui/material";
import { AppContextProvider } from "../AppContextProvider";

// Background container for the whole logged in user experience
const LoggedInBackground = styled("div")({
  background: loggedInBackground,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

const UserAppBase = () => {
  return (
    <AppContextProvider>
      <LoggedInBackground>
        {/* TODO in future issue: NavBar */}
        <NavBar />
        {/* adding spacing around all child elements */}
        <Box m={"3rem"}>
          <Outlet />
        </Box>
      </LoggedInBackground>
    </AppContextProvider>
  );
};

export default UserAppBase;
