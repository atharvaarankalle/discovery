import { Button, styled } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors } from "../theme";

// Styling for underlined button with a fixed position at the bottom left
const UnderlinedButton = styled(Button)({
    position: 'fixed', 
    bottom: 20, 
    left: 20,
    color: colors.lightPeach,
    fontSize: "1.25rem",
    fontWeight: 400,
    fontFamily: "Sora",
    textTransform: 'none', 
    ':hover': { textDecoration: 'underline' }
});

interface SkipButtonProps {
    onOpen: () => void; // Function type for event handling
}

/**
 * This button opens up the 'ConfirmDialog' for skipping.
 * @param param0 Takes input for the event handling on clicking the button
 * @returns The 'Skip' button with the skip icon.
 */
export const SkipButton: React.FC<SkipButtonProps> = ({ onOpen }) => {
    return (
        <UnderlinedButton onClick={onOpen}>
            Skip <SkipNextIcon />
        </UnderlinedButton>
    );
};
