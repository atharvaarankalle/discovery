import { Box, Button, styled, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContextProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

const SignupTab = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const navigate = useNavigate();
  const { setCurrentUserId } = useContext(AppContext);
  const [isEmailErrorState, setIsEmailErrorState] = useState(false);
  const [isPasswordErrorState, setIsPasswordErrorState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);

  // This method does a POST request to signup and sets user ID in context if successful,
  // thus logging them in automatically after sign up.
  const postSignup = async (signUp: {
    email: string;
    password: string;
    displayName?: string;
  }) => {
    console.log("click");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, signUp);
      setCurrentUserId(response.data.user._id); // sets the user ID in App Context (i.e. they are authenticated)
      navigate("/user/prompt");
    } catch (error: unknown) {
      console.error("Signup failed:", error);
      setIsErrorState(true);
    }
  };

  return (
    <>
      <CustomTextField
        label="Email"
        value={email}
        required
        onChange={(event) => setEmail(event.target.value)}
        error={isEmailErrorState || isErrorState}
        onFocus={() => {
          setIsEmailErrorState(false);
          setIsErrorState(false);
        }}
        helperText={isEmailErrorState ? "Email is required" : null}
      />
      <CustomTextField
        label="Password"
        type="password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
        error={isPasswordErrorState || isErrorState}
        onFocus={() => {
          setIsPasswordErrorState(false);
          setIsErrorState(false);
        }}
        helperText={isPasswordErrorState ? "Password is required" : null}
      />
      <Box sx={{ width: "100%" }}>
        <CustomTextField
          label="Display Name"
          value={displayName}
          error={isErrorState}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        {isErrorState && (
          <Typography
            sx={{
              width: "100%",
              mt: 1,
              color: "error.main",
              textAlign: "center",
            }}
          >
            Looks like there's been an error signing up :( Please try again
          </Typography>
        )}
      </Box>
      <StyledButton
        variant="contained"
        color="lightPeach"
        onClick={() => {
          if (email && password) {
            postSignup({ email, password, displayName });
            setEmail("");
            setPassword("");
            setDisplayName("");
          }
          if (!email) {
            setIsEmailErrorState(true);
          }
          if (!password) {
            setIsPasswordErrorState(true);
          }
        }}
      >
        SIGN UP
      </StyledButton>
    </>
  );
};

export default SignupTab;
