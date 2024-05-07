import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, Box, styled } from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { colors, landingBackground } from "../theme"; // Ensure these are correctly typed and exported

const DialogBackground = styled('div')({
    background: landingBackground,
    backgroundColor: colors.navyBlue,
});

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

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
