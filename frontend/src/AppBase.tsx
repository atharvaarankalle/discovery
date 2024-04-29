import { Outlet } from "react-router-dom";

// will contain the MUI ThemeProvider and any other relevant components to wrap around the app contents.
const AppBase = () => {
  return <Outlet />;
};

export default AppBase;
