import { Box, Button, Drawer, DrawerProps, TextField, styled } from "@mui/material";
import CustomTypography from "./CustomTypography";
import SongCard from "./SongCard";
import SendIcon from '@mui/icons-material/Send';

const StyledDrawer = styled(Drawer)(() => ({
    "& .MuiDrawer-paper": {
        background: "#22224480"
    }
}));

const StyledBox = styled(Box)(() => ({
    display: "flex",
    height: "100%",
    width: "30rem",
    flexDirection: "column",
    paddingTop: "7rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    gap: "0.5rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    background: `${theme.palette.secondary.main}0F`,
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    '& .MuiFilledInput-root': {
        backgroundColor: `${theme.palette.secondary.main}0F`,
        color: theme.palette.lightPeach.main,
    },
    '& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after': {
        borderBottomColor: theme.palette.peach.main,
    },
    // "& .MuiInputLabel-root": {
    //     color: theme.palette.peach.main,
    // },
    // "& .MuiFilledInput-underline:before": {
    //     borderBottomColor: theme.palette.peach.main,
    // },
    // "& .MuiFilledInput-underline:after": {
    //     borderBottomColor: theme.palette.peach.main,
    // },
    // "& .MuiFormLabel-root": {
    //     color: theme.palette.peach.main,
    // },
    // "& .MuiFormLabel-root.Mui-focused": {
    //     color: theme.palette.peach.main,
    // },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    padding: "0.3rem 1.5rem",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.navyBlue.main,
        "& .MuiButton-endIcon": {
            color: theme.palette.navyBlue.main,
        },
    },
    "& .MuiButton-label:hover": {
        color: theme.palette.navyBlue.main,
    },
    "& .MuiButton-endIcon": {
        color: theme.palette.secondary.main,
    },
}));

interface PromptSideDrawerPropTypes extends DrawerProps {
    drawerOpen: boolean;
    toggleDrawer: (open: boolean) => void;
}

const PromptSideDrawer = ({ drawerOpen, toggleDrawer }: PromptSideDrawerPropTypes) => {
    return (
        <StyledDrawer open={drawerOpen} onClose={() => toggleDrawer(false)} anchor="right">
            <StyledBox>
                <CustomTypography variant="h4" textAlign="left">SELECTED TRACK:</CustomTypography>
                <SongCard songData={{ songTitle: "Kill Bill", artist: "SZA", album: "SOS", albumArtSrc: "https://media.pitchfork.com/photos/638902d2e5592afa444298b9/master/w_1600%2Cc_limit/SZA-SOS.jpg" }} type="small" />
                <StyledTextField variant="filled" label="Comment" multiline />
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <StyledButton variant="outlined" color="lightPeach" endIcon={<SendIcon />}>Post</StyledButton>
                </Box>
            </StyledBox>
        </StyledDrawer>
    )
}

export default PromptSideDrawer;
