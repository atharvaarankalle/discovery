import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";

// will contain the MUI ThemeProvider and any other relevant components to wrap around the app contents.
const AppBase = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default AppBase;
