import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, styled } from "@mui/material";
import { colors, landingBackground } from "../theme";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useState } from "react";

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

const DialogBackground = styled('div')({
    background: landingBackground,
    backgroundColor: colors.navyBlue,
  });

export const SkipButton = () => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleConfirmQuit = () => {
        console.log("User confirmed to quit");
        handleClose();
        // Additional actions to quit goes here
      };

    return (
        <div>
            <UnderlinedButton onClick={handleOpen}>
                Skip <SkipNextIcon/>
            </UnderlinedButton>
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Box sx={{m: 2}}>
                        <DialogTitle id="alert-dialog-title">
                            <Typography variant="body1" gutterBottom>
                                Are you sure you want to skip?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                        <Typography variant="body2" id="alert-dialog-description" sx={{color: colors.peach}}>
                            This prompt expires at night.<br/>You can still post a song recommendation if you skip.
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button variant="outlined" color="lightPeach" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="lightPeach" onClick={handleConfirmQuit} autoFocus>
                            Skip <SkipNextIcon/>
                        </Button>
                        </DialogActions>
                    </Box>
                </DialogBackground>
            </Dialog>
        </div>
    );

}