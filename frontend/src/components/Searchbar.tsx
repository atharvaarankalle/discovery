import { useEffect, useState } from "react";
import { Box, Link, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../theme";
import CustomTextField from "./CustomTextField";
import axios from "axios";
import { SongSelectionContainer } from "./SongCardPaginationContainers";

interface SearchbarProps {
  onInputChange: (input: string) => void;  // Define the callback type
}

//Styling for clear search button
const ClearSearchLink = styled(Link)({
  component: "button",
  variant: "body1",
  color: colors.peach,
  fontSize: "1rem",
  fontWeight: 400,
  fontFamily: "Familjen Grotesk",
  textTransform: "none",
  ":hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
});

async function searchSongs(query: string, numSongs: number, page: number): Promise<any> {
  try {
      const response = await axios.get("http://localhost:3000/api/songs/search", {
          params: {
              searchQuery: query,
              numSongs: numSongs,
              page: page
          }
      });
      // If the response is successful, return the data
      return response.data; // Make sure to return the actual data property if that's what you're interested in
  } catch (error) {
      console.error('Failed to fetch songs with axios:', error);
      // Return a default value in case of an error to keep the function's return type consistent
      return [];
  }
}

/**
 * Search bar component. No set width, therefore width should be set upon call.
 * The search is done as the user type and not upon confirm.
 * Clear search button gets
 * @returns Searchbar
 */

export const Searchbar = ( { onInputChange }: SearchbarProps ) => {
  const [inputValue, setInputValue] = useState("");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (onInputChange) { 
      onInputChange(value);
    }
  };

  const clearInput = () => {
    setInputValue("");
    if (onInputChange) {
      onInputChange(""); 
    }
  };

  return (
    <Box sx={{m:3}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          mb: "0.5rem",
        }}
      >
        <SearchIcon sx={{ color: colors.peach, fontSize: "2.5rem" }} />
        <CustomTextField
          label="Search"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", paddingY:3}}>
        <ClearSearchLink
          onClick={clearInput}
          underline="always"
          color="secondary"
        >
          Clear search
        </ClearSearchLink>
      </Box>
    </Box>
  );
};
