import { useState } from "react";
import { Box, Link, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../theme";

// Styling for searchbar
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiFilledInput-underline::before": {
    borderBottomColor: `${theme.palette.peach.main}`,
  },
  "& .MuiFilledInput-root": {
    backgroundColor: `${theme.palette.peach.main}10`,
    color: `${theme.palette.lightPeach.main}`,
    ":hover:not(.Mui-focused)": {
      "&:before": {
        borderColor: `${theme.palette.peach.main}`,
      },
    },
  },
  "& .MuiFilledInput-root:after": {
    backgroundColor: `${theme.palette.peach.main}10`,
    color: `${theme.palette.lightPeach.main}`,
  },

  "& label.Mui-focused": {
    color: `${theme.palette.peach.main}`,
  },
}));

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

/**
 * Search bar component. No set width, therefore width should be set upon call.
 * The search is done as the user type and not upon confirm.
 * Clear search button gets
 * @returns Searchbar
 */

export const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    //TO DO: Link with Spotify Search
  };
  const clearInput = () => {
    setInputValue("");
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          mb: "0.5rem",
        }}
      >
        <SearchIcon sx={{ color: colors.peach, fontSize: "2.5rem" }} />
        <StyledTextField
          variant="filled"
          label="Search"
          color="peach"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
