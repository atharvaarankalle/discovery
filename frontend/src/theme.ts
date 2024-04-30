import { createTheme } from "@mui/material/styles"; // adding more custom fields to the palette

// adding more custom fields to the palette
declare module "@mui/material/styles" {
  interface Palette {
    lightPeach: Palette["primary"];
    peach: Palette["primary"];
    pink: Palette["primary"];
    purplePink: Palette["primary"];
    purple: Palette["primary"];
    greyBlue: Palette["primary"];
    navyBlue: Palette["primary"];
  }

  interface PaletteOptions {
    lightPeach?: PaletteOptions["primary"];
    peach?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
    purplePink?: PaletteOptions["primary"];
    purple?: PaletteOptions["primary"];
    greyBlue?: PaletteOptions["primary"];
    navyBlue?: PaletteOptions["primary"];
  }

  export function createTheme(options?: PaletteOptions): Palette;
}

// Update the Button's color options to include other colour options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    // pink: true;
    // orange: true;
    // green: true;
  }
}

// commonly used styles
export const baseShadow = "2px 2px 10px rgba(0, 0, 0, 0.25);";
export const baseGlow = "0px 0px 15px 5px rgba(215, 130, 207, 0.38)";
export const landingBackground =
  "linear-gradient(116.82deg, #272747 0%, #7E4DCD 100%)";
export const loggedInBackground =
  "linear-gradient(125.87deg, rgba(59, 59, 88, 0.75) 20.12%, rgba(156, 90, 166, 0.75) 85.54%), #3B3B58";

const colors = {
  lightPeach: "#FFE7DD",
  peach: "#F3BFBA",
  pink: "#E79DC3",
  purplePink: "#D782CF",
  purple: "#9C5AA6",
  greyBlue: "#3B3B58",
  navyBlue: "#272747",
  white: "#FFFFFF",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.navyBlue,
      contrastText: colors.lightPeach,
    },
    secondary: {
      main: colors.lightPeach,
      contrastText: colors.greyBlue,
    },
    background: {
      default: colors.navyBlue,
    },
    lightPeach: {
      main: colors.lightPeach,
      contrastText: colors.navyBlue,
    },
    peach: {
      main: colors.peach,
      contrastText: colors.navyBlue,
    },
    pink: {
      main: colors.pink,
      contrastText: colors.navyBlue,
    },
    purplePink: {
      main: colors.purplePink,
      contrastText: colors.navyBlue,
    },
    purple: {
      main: colors.purple,
      contrastText: colors.navyBlue,
    },
    greyBlue: {
      main: colors.greyBlue,
      contrastText: colors.lightPeach,
    },
    navyBlue: {
      main: colors.navyBlue,
      contrastText: colors.lightPeach,
    },
  },
  typography: {
    fontFamily: "Familjen Grotesk",
    h1: {
      // e.g. the big prompt
      color: colors.lightPeach,
      fontSize: "3.75rem",
      fontWeight: 600,
      fontFamily: "Sora",
    },
    h2: {
      // e.g prompt in the discovery feed
      color: colors.lightPeach,
      fontSize: "2.25rem",
      fontWeight: 600,
      fontFamily: "Sora",
    },
    h3: {
      // Headings inside the profile and "your submission" text
      color: colors.peach,
      fontSize: "1.5rem",
      fontWeight: 600,
      fontFamily: "Sora",
    },
    h4: {
      // Today's disco text, selected track text
      color: colors.peach,
      fontSize: "1.25rem",
      textTransform: "capitalize",
      fontWeight: 700,
      fontFamily: "Sora",
      letterSpacing: "0.14em",
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontFamily: "Familjen Grotesk",
      color: colors.peach,
    },
    body1: {
      fontSize: "1rem",
      fontFamily: "Familjen Grotesk",
      color: colors.lightPeach,
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      textTransform: "none",
      fontSize: "1rem",
    },
  },
});
