import { Button } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';

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
        <Button 
            variant="underlined" 
            color="pink" 
            onClick={onOpen}
            >
            Skip <SkipNextIcon/>
        </Button>
    );
};
