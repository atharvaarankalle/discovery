import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, Box, styled } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors, landingBackground } from "../theme"; // Ensure these are correctly typed and exported

//Background styling for confirm dialog box
const DialogBackground = styled('div')({
    background: landingBackground,
    backgroundColor: colors.navyBlue,
});

//Type specification for inputs
interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

/**
 * This dialog box checks if the user wants to skip. 
 * If not, it closes, if so, it redirects the user.
 * @param param0    Boolean to indicate if the dialog box is open. 
 *                  Function to close the dialog box.
 *                  Function to confirm the dialog box.
 * @returns A dialog box, inintially hidden until a button is clicked.
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                backdropFilter: "blur(3px)",
                '& .MuiPaper-root': {
                    borderRadius: 4,
                }
            }}
        >
            <DialogBackground>
                <Box sx={{ m: 2 }}>
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="body1" gutterBottom>
                            Are you sure you want to skip?
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        {/*This is written in two lines*/}
                        <Typography variant="body2" id="alert-dialog-description" sx={{ color: colors.peach }}>
                            This prompt expires at night.<br />You can still post a song recommendation if you skip.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="lightPeach" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="lightPeach" onClick={onConfirm} autoFocus>
                            Skip <SkipNextIcon/>
                        </Button>
                    </DialogActions>
                </Box>
            </DialogBackground>
        </Dialog>
    );
};
