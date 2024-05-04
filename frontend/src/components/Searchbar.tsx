import { useState } from "react";
import { Box, InputAdornment, Link, styled, TextField, } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { colors } from "../theme";

//Styling for searchbar
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: 'transparent' },
      '&.Mui-focused fieldset': { 
        borderColor: 'transparent',
        borderWidth: '0 0 0.2rem 0',
        borderBottomColor: colors.peach, 
        transition: "border-bottom 0.2s ease",  
    }},
    background: `${colors.lightPeach}0F`,
    borderRadius: "0.2rem",
    borderColor: 'transparent',
  });

//Styling for clear search button
const ClearSearchLink = styled(Link)({
component: "button",
variant: "body1",
color: colors.peach,
fontSize: '1rem', 
fontWeight: 400, 
fontFamily: 'Familjen Grotesk', 
textTransform: 'none',
':hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
}
});

/**
 * Search bar component. No set width, therefore width should be set upon call.
 * The search is done as the user type and not upon confirm.
 * Clear search button gets 
 * @returns Searchbar
 */

export const Searchbar = () => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        //TO DO: Link with Spotify Search
        };
        const clearInput = () => {
            setInputValue('');
        };
    return (
        <Box>
            <StyledTextField
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search"
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon sx={{color: colors.peach, fontSize: '2.5rem'}}/>
                    </InputAdornment>
                ),
                style: { color: colors.lightPeach },
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ClearSearchLink onClick={clearInput}>
                Clear Search
                </ClearSearchLink>
            </Box>
        </Box>
    );
}
