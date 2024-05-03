import { useState } from "react";
import { Box, Button, InputAdornment, styled, TextField, } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { colors } from "../theme";

//Styling for searchbar
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: 'transparent' },
      '&.Mui-focused fieldset': { borderColor: 'transparent' }
    },
    background: 'rgba(255, 229, 180, 0.05)',
    borderRadius: '4px'
  });

//Styling for clear search button
const ClearSearchButton = styled(Button)({
color: colors.peach,
fontSize: '0.75rem', 
fontWeight: 400, 
fontFamily: 'Sora', 
textTransform: 'none',
':hover': {
    textDecoration: 'underline'
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
                style: { color: colors.lightPeach }
                }}
            />
            <Box
                sx={{
                width: '100%', 
                height: '2px', 
                backgroundColor: colors.peach, 
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ClearSearchButton onClick={clearInput}>
                Clear Search
                </ClearSearchButton>
            </Box>
        </Box>
    );
}
