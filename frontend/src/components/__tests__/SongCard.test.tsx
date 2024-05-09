import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import SongCard from "../SongCard";
import { SongData } from "../../utils/interfaces";

/* Import colours used in the theme */
const colors = {
  lightPeach: "#FFE7DD",
  peach: "#F3BFBA",
  pink: "#E79DC3",
  purplePink: "#D782CF",
  purple: "#9C5AA6",
  greyBlue: "#3B3B58",
  navyBlue: "#272747",
  darkestBlue: "#121229",
  white: "#FFFFFF",
  darkGrey: "#272727",
};

/* Create a custom theme for testing */
const theme = createTheme({
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
    darkGrey: {
      main: colors.darkGrey,
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
        {
          props: {
            // ONLY FOR this button of this colour e.g. <StyledButton variant="contained" color="lightPeach">
            variant: "contained",
            color: "peach",
          },
          style: {
            borderRadius: "40px",
            fontSize: "1rem",
            fontFamily: "Familjen Grotesk",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: colors.peach,
            },
          },
        },
      ],
    },
  },
});

/* Mock song data */
const mockSongData: SongData = {
  id: "1",
  songTitle: "Test Song",
  artists: "Test Artist",
  album: "Test Album",
  albumArtSrc: "test_image.jpg",
};

/**
 * SongCard Component tests
 */
describe("SongCard Component", () => {
  /**
   * Test that the SongCard renders correctly with default props
   */
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="small" />
      </ThemeProvider>
    );
    expect(getByText("Test Song")).toBeInTheDocument();
    expect(getByText("Test Artist")).toBeInTheDocument();
    expect(getByText("Test Album")).toBeInTheDocument();
  });

  /**
   * Test that the SongCard renders correctly with large variant
   */
  it("renders large variant correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="large" />
      </ThemeProvider>
    );
    expect(getByText("Test Song")).toBeInTheDocument();
    expect(getByText("Test Artist")).toBeInTheDocument();
    expect(getByText("Test Album")).toBeInTheDocument();
  });

  /**
   * Test that the SongCard renders correctly with medium variant
   */
  it("renders medium variant correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="medium" />
      </ThemeProvider>
    );
    expect(getByText("Test Song")).toBeInTheDocument();
    expect(getByText("Test Artist")).toBeInTheDocument();
    expect(getByText("Test Album")).toBeInTheDocument();
  });

  /**
   * Test that the SongCard triggers onCardClick callback when clicked
   */
  it("triggers onCardClick callback when clicked", () => {
    const handleCardClick = vi.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard
          songData={mockSongData}
          type="medium"
          onCardClick={handleCardClick}
        />
      </ThemeProvider>
    );
    fireEvent.click(getByText("Test Song"));
    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test that the SongCard does not trigger onCardClick callback if not provided
   */
  it("does not trigger onCardClick callback if not provided", () => {
    const handleCardClick = vi.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="medium" />
      </ThemeProvider>
    );
    fireEvent.click(getByText("Test Song"));
    expect(handleCardClick).not.toHaveBeenCalled();
  });

  /**
   * Test that the LikeButton is rendered if the type is medium
   */
  it("LikeButton is rendered if the type is medium", () => {
    render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="medium" />
      </ThemeProvider>
    );
    const elementsByClassName = document.getElementsByClassName("like-button");
    expect(elementsByClassName.length).toBe(1);
  });

  /**
   * Test that the LikeButton is not rendered if the type is small
   */
  it("LikeButton is not rendered if the type is small", () => {
    render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="small" />
      </ThemeProvider>
    );
    const elementsByClassName = document.getElementsByClassName("like-button");
    expect(elementsByClassName.length).toBe(0);
  });

  /**
   * Test that the LikeButton is not rendered if the type is large
   */
  it("LikeButton is not rendered if the type is large", () => {
    render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="large" />
      </ThemeProvider>
    );
    const elementsByClassName = document.getElementsByClassName("like-button");
    expect(elementsByClassName.length).toBe(0);
  });
});
