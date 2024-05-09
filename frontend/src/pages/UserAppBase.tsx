import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, styled } from "@mui/material";
import { loggedInBackground } from "../theme";
import { MusicPlayer } from "../components/MusicPlayer.tsx";

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
      {/* adding horizontal spacing around all child elements */}
      <Box marginX={"3rem"}>
        <Outlet />

        <MusicPlayer />
      </Box>
    </LoggedInBackground>
  );
};

export default UserAppBase;
