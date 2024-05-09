import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import axios from "axios";
import useAxiosInterceptor from "./utils/useAxiosInterceptor.ts";

// will contain the MUI ThemeProvider and any other relevant components to wrap around the app contents.
const AppBase = () => {
  axios.defaults.withCredentials = true; // ensuring all backend api requests use cookie credentials
  useAxiosInterceptor(); // intercepts any unauthorised errors, sets user as unauthenticated and redirects user back to login
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default AppBase;
