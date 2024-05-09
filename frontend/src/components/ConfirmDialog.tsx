import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { colors, loggedInBackground } from "../theme"; // Ensure these are correctly typed and exported

//Type specification for inputs
interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * This dialog box checks if the user wants to skip.
 * If not, it closes; if so, it redirects the user.
 * @prop {boolean} open - Boolean to indicate if the dialog box is open.
 * @prop {() => void} onClose - Function to close the dialog box.
 * @prop {() => void} onConfirm - Function to confirm the dialog box.
 * @returns A dialog box, initially hidden until a button is clicked.
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 4,
          background: loggedInBackground,
          backgroundColor: colors.navyBlue,
          width: "43.75rem",
        },
      }}
    >
      <Box sx={{ m: 4 }}>
        <DialogTitle id="alert-dialog-title" variant="h5" gutterBottom>
          Are you sure you want to skip?
        </DialogTitle>
        <DialogContent>
          {/*This is written in two lines*/}
          <Typography
            variant="subtitle1"
            id="alert-dialog-description"
            sx={{ color: colors.peach }}
          >
            This prompt expires at night.
            <br />
            You can still post a song recommendation if you skip.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="lightPeach" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="lightPeach"
            onClick={onConfirm}
            autoFocus
          >
            Skip <SkipNextIcon />
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
