import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SongCard from "../SongCard";
import { SongData } from "../../utils/interfaces";
import { theme } from "../../theme.ts";
import { ThemeProvider } from "@emotion/react";

const mockSongData: SongData = {
  id: "1",
  songTitle: "Test Song",
  artists: "Test Artist",
  album: "Test Album",
  albumArtSrc: "test_image.jpg",
};

describe("SongCard Component", () => {
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

  it("renders LikeButton when type is medium", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SongCard songData={mockSongData} type="medium" />
      </ThemeProvider>
    );
    expect(getByText("Like")).toBeInTheDocument();
  });

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

  // Add more tests as needed...
});
