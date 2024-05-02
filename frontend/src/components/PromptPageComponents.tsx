import { styled, TextField, Button } from "@mui/material";
import { colors, landingBackground } from "../theme";

export const PageBackground = styled('div')({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "clip",
});

export const DialogBackground = styled('div')({
  background: landingBackground,
  backgroundColor: colors.navyBlue,
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' }
  },
  background: 'rgba(255, 229, 180, 0.05)',
  borderRadius: '4px'
});

export const ClearSearchButton = styled(Button)({
  color: colors.peach,
  fontSize: '0.75rem', 
  fontWeight: 400, 
  fontFamily: 'Sora', 
  textTransform: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
});

export const SkipButton = styled(Button)({
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
