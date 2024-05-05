import { TextField, TextFieldProps, styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiFilledInput-underline::before": {
    borderBottomColor: `${theme.palette.peach.main}`,
  },
  "& .MuiFilledInput-root": {
    backgroundColor: `${theme.palette.peach.main}10`,
    color: `${theme.palette.lightPeach.main}`,
    ":hover:not(.Mui-focused)": {
      "&:before": {
        borderColor: `${theme.palette.peach.main}`,
      },
    },
  },
  "& .MuiFilledInput-root:after": {
    backgroundColor: `${theme.palette.peach.main}10`,
    color: `${theme.palette.lightPeach.main}`,
  },

  "& label.Mui-focused": {
    color: `${theme.palette.peach.main}`,
  },
}));

const CustomTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default CustomTextField;
