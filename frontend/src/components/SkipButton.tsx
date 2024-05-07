import { Button, styled } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors } from "../theme"; // Ensure colors is correctly typed and exported

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

export const SkipButton: React.FC<SkipButtonProps> = ({ onOpen }) => {
    return (
        <UnderlinedButton onClick={onOpen}>
            Skip <SkipNextIcon />
        </UnderlinedButton>
    );
};
