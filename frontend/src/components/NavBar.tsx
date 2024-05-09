import {
  AppBar,
  IconButton,
  Stack,
  styled,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { DiscoveryLogo } from "./Logos";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PriorityHighTwoToneIcon from "@mui/icons-material/PriorityHighTwoTone";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../AppContextProvider";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import StyledToolTip from "./StyledTooltip";
import CustomTypography from "./CustomTypography";
import { ConfirmationDialog } from "./ConfirmDialog.tsx";

/* Custom styles applied to MUI AppBar */
const StyledAppBar = styled(AppBar)({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: "1.5rem 0.5rem",
});

/* Custom styles applied to MUI IconButton */
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: "3rem",
  padding: "1rem 1.2rem 1.2rem 1rem",
  "&:hover": {
    backgroundColor: `${theme.palette.purple.main}5C`,
  },
}));

type LoggedInUserPages = "Discover" | "Prompt" | "Profile";

/**
 * NavBar Component
 *
 * Renders the navigation bar at the top of the user pages, using context to get the currently logged in user.
 */
const NavBar = () => {
  const location = useLocation();
  const { currentUser, promptOfTheDay } = useContext(AppContext);
  const theme: Theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Determine the current page based on the URL path
  let currentPage: LoggedInUserPages;
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

  /**
   * Handles the click event when the user clicks on the Discovery logo.
   * If the user is on the Discover page, the page will refresh.
   * If the user is on any other page, they will be navigated back to the Discover page.
   *
   * @param currentPage - the current page the user is on
   */
  const handleLogoClick = () => {
    if (currentPage === "Discover") {
      window.location.reload();
    } else if (currentPage === "Prompt") {
      // ask user if they are sure they want to skip
      setOpenDialog(true);
    } else {
      navigate("/user/discover");
    }
  };

  // close skip dialog
  const handleCloseDialog = () => setOpenDialog(false);

  // Confirm to skip prompt and takes the user to another page
  const handleConfirmQuit = () => {
    handleCloseDialog();
    navigate("/user/discover");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledToolTip
          title={currentPage === "Discover" ? "Refresh" : "Back to discovery"}
          placement="right-end"
          disableInteractive
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: `${theme.palette.primary.main}75`,
              position: "relative",
              top: "0.5rem",
              right: "2rem",
              padding: "0.7rem 1rem",
              fontSize: "1.2rem",
              borderRadius: "0.5rem",
            },
          }}
        >
          <StyledIconButton size="large" onClick={() => handleLogoClick()}>
            <DiscoveryLogo width={75} height={75} />
          </StyledIconButton>
        </StyledToolTip>
        <Stack
          direction="column"
          sx={{
            flexGrow: 1,
            visibility: currentPage === "Discover" ? "visible" : "hidden",
          }}
        >
          <Typography variant="h4">TODAY'S DISCO:</Typography>
          <CustomTypography variant="h2" num_lines={1}>
            {promptOfTheDay}
          </CustomTypography>
        </Stack>
        <Stack
          direction="row"
          gap={6}
          alignItems="center"
          sx={{ paddingRight: "0.5rem" }}
        >
          <Stack direction="row" alignItems="center">
            {currentUser?.hasSubmitted ? (
              <LocalFireDepartmentIcon
                fontSize="large"
                sx={{ color: theme.palette.peach.main, fontSize: "3.5rem" }}
              />
            ) : (
              <Stack direction="row" alignItems="center">
                <PriorityHighTwoToneIcon
                  fontSize="medium"
                  sx={{ color: theme.palette.peach.main, fontSize: "2rem" }}
                />
                <LocalFireDepartmentTwoToneIcon
                  sx={{ color: theme.palette.peach.main, fontSize: "3.5rem" }}
                />
              </Stack>
            )}
            <Typography variant="h3">{currentUser?.streakCount}</Typography>
          </Stack>
          <NavBarDropdownMenu
            profilePictureSrc="https://media.cnn.com/api/v1/images/stellar/prod/191026120622-03-black-cat.jpg?q=w_1110,c_fill"
            width={60}
            height={60}
          />
        </Stack>
      </Toolbar>
      {currentPage === "Prompt" && (
        <Stack direction="column" sx={{ padding: "1rem 0 0 2.5rem" }}>
          <Typography variant="h4">TODAY'S DISCO:</Typography>
          <CustomTypography variant="h1" num_lines={1}>
            {promptOfTheDay}
          </CustomTypography>
        </Stack>
      )}
      {currentPage === "Prompt" && (
        <ConfirmationDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmQuit}
        />
      )}
    </StyledAppBar>
  );
};

export default NavBar;
