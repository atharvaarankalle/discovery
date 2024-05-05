import { Button, styled } from "@mui/material";
import CustomTextField from "./CustomTextField";

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

const LoginTab = () => {
  return (
    <>
      <CustomTextField label="Email" />
      <CustomTextField label="Password" type="password" />
      <StyledButton variant="contained" color="lightPeach">
        LOG IN
      </StyledButton>
    </>
  );
};

export default LoginTab;
