import { AppBar, Avatar, IconButton, Stack, Theme, Toolbar, Typography, styled, useTheme } from "@mui/material";
import { DiscoveryLogo } from "./Logos";
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: "2rem 4rem"
});

const NavBar = () => {
  const location = useLocation();
  const { currentUser } = useContext(AppContext);
  const theme: Theme = useTheme();

  let currentPage;
  switch (location.pathname) {
    case "/user/discover":
      currentPage = "Discover";
      break;
    case "/user/prompt":
      currentPage = "Prompt";
      break;
    default:
      currentPage = "Profile";
  }
  
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton sx={{ mr: 8 }}>
          <DiscoveryLogo width={75} height={75} />
        </IconButton>
        <Stack direction="column" sx={{ flexGrow: 1, visibility: currentPage === "Discover" ? "visible" : "hidden" }}>
          <Typography variant="h4">TODAY'S DISCO:</Typography>
          <Typography variant="h2">prompt yay woohoo awesome</Typography>
        </Stack>
        <Stack direction="row" gap={6} alignItems="center">
          <Stack direction="row" alignItems="center">
            {currentUser?.hasSubmitted ? (
              <LocalFireDepartmentIcon fontSize="large" sx={{ color: theme.palette.peach.main, fontSize: "3.5rem" }} />
            ) : (
              <Stack direction="row" alignItems="center">
                <PriorityHighTwoToneIcon fontSize="medium" sx={{ color: theme.palette.peach.main, fontSize: "2rem" }} />
                <LocalFireDepartmentTwoToneIcon sx={{ color: theme.palette.peach.main, fontSize: "3.5rem" }} />
              </Stack>
            )}
            <Typography variant="h3">{currentUser?.streakCount}</Typography>
          </Stack>
          {/* TODO: Implementation of Navbar Dropdown Menu goes here! */}
          <Avatar sx={{ width: 60, height: 60 }} />
        </Stack>
      </Toolbar>
      {currentPage === "Prompt" &&
        <Stack direction="column" sx={{ padding: "1.5rem 0 0 2.5rem" }}>
          <Typography variant="h4">TODAY'S DISCO:</Typography>
          <Typography variant="h1">prompt yay woohoo awesome</Typography>
        </Stack>
      }
    </StyledAppBar>
  );
};

export default NavBar;
