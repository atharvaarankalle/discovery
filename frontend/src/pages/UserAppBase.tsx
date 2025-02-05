import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, styled } from "@mui/material";
import { loggedInBackground } from "../theme";
import { MusicPlayer } from "../components/MusicPlayer.tsx";
import { AppContext } from "../AppContextProvider";
import { useContext } from "react";

// Background container for the whole logged in user experience
export const LoggedInBackground = styled("div")({
  background: loggedInBackground,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

const UserAppBase = () => {
  const { currentUserId } = useContext(AppContext);

  return (
    <>
      {currentUserId ? (
        <LoggedInBackground>
          <NavBar />
          {/* adding spacing around all child elements */}
          <Box marginX={"3rem"}>
            <Outlet />
          </Box>
          <MusicPlayer />
        </LoggedInBackground>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default UserAppBase;
