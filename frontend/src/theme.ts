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
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    underlined: true;
  }

  interface ButtonPropsColorOverrides {
    lightPeach: true;
    greyBlue: true;
    pink: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    lightPeach: true;
  }
}

// commonly used styles
export const baseShadow = "2px 2px 10px rgba(0, 0, 0, 0.25);";
export const baseGlow = "0px 0px 15px 5px rgba(215, 130, 207, 0.38)";
export const landingBackground =
  "linear-gradient(116.82deg, #272747 0%, #7E4DCD 100%)";
export const loggedInBackground =
  "linear-gradient(125.87deg, rgba(59, 59, 88, 0.75) 20.12%, rgba(156, 90, 166, 0.75) 85.54%), #3B3B58";

export const colors = {
  lightPeach: "#FFE7DD",
  peach: "#F3BFBA",
  pink: "#E79DC3",
  purplePink: "#D782CF",
  purple: "#9C5AA6",
  greyBlue: "#3B3B58",
  navyBlue: "#272747",
  darkestBlue: "#121229",
  white: "#FFFFFF",
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    mdSongTitle: React.CSSProperties;
    mdSongSubtitle: React.CSSProperties;
    smSongTitle: React.CSSProperties;
    smSongSubtitle: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    mdSongTitle?: React.CSSProperties;
    mdSongSubtitle?: React.CSSProperties;
    smSongTitle?: React.CSSProperties;
    smSongSubtitle?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mdSongTitle: true;
    mdSongSubtitle: true;
    smSongTitle: true;
    smSongSubtitle: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.navyBlue,
      dark: colors.darkestBlue,
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
      fontWeight: 700,
      fontFamily: "Sora",
      letterSpacing: "0.14em",
    },
    h5: {
      // username in the discovery feed
      color: colors.lightPeach,
      fontSize: "1.5rem",
      fontWeight: 500,
      fontFamily: "Familjen Grotesk",
    },
    subtitle1: {
      // in profile page discovering since ___ & search for a track that best describes ____
      fontSize: "1.25rem",
      fontFamily: "Familjen Grotesk",
      color: colors.peach,
    },
    body1: {
      // song suggestion caption
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
    mdSongTitle: {
      // song widget discover feed and saved songs list
      color: colors.lightPeach,
      fontSize: "1.25rem",
      fontWeight: 600,
      fontFamily: "Sora",
    },
    mdSongSubtitle: {
      // song widget discover feed and saved songs list
      color: colors.peach,
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: "Familjen Grotesk",
    },
    smSongTitle: {
      // song widget submission, song search list, selected track, music player !! set colour when using
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: "Sora",
    },
    smSongSubtitle: {
      // song widget submission, song search list, selected track, music player !! set colour when using
      fontSize: "0.875rem",
      fontWeight: 400,
      fontFamily: "Familjen Grotesk",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            // ONLY FOR this button of this colour e.g. <StyledButton variant="contained" color="lightPeach">
            variant: "contained",
            color: "lightPeach",
          },
          style: {
            borderRadius: "40px",
            fontSize: "1rem",
            fontFamily: "Sora",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: colors.peach,
            },
          },
        },
        {
          props: {
            variant: "contained",
            color: "greyBlue",
          },
          style: {
            borderRadius: "40px",
            fontSize: "1rem",
            fontFamily: "Sora",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: colors.navyBlue,
            },
          },
        },
        {
          props: {
            variant: "outlined",
          },
          style: {
            borderRadius: "40px",
            fontSize: "1rem",
            fontFamily: "Sora",
            fontWeight: 600,
            borderWidth: "3px",
            "&:hover": {
              borderWidth: "3px",
            },
          },
        },
        {
          props: {
            variant: "underlined",
            color: "pink",
          },
          style: {
            borderBottom: `${colors.pink} 3px solid `,
            color: colors.pink,
            fontFamily: "Sora",
            fontWeight: 600,
            borderRadius: 0,
            "&:hover": {
              color: colors.peach,
              background: "transparent",
              borderColor: colors.peach,
            },
          },
        },
      ],
    },
  },
});
