import { Button, styled } from "@mui/material";
import CustomTextField from "./CustomTextField";

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

const SignupTab = () => {
  return (
    <>
      <CustomTextField label="Email" />
      <CustomTextField label="Password" type="password" />
      <CustomTextField label="Display Name" />
      <StyledButton variant="contained" color="lightPeach">
        SIGN UP
      </StyledButton>
    </>
  );
};

export default SignupTab;
