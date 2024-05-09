import { Box, Button, styled, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";

import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContextProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

const LoginTab = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { setCurrentUserId } = useContext(AppContext);
  const [isEmailErrorState, setIsEmailErrorState] = useState(false);
  const [isPasswordErrorState, setIsPasswordErrorState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // This method does a POST request to login and sets user ID in app context if successful
  const postLogin = async (loginData: { email: string; password: string }) => {
    try {
      setIsButtonDisabled(true);
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginData,
      );
      setCurrentUserId(response.data.user._id); // sets the user ID in App Context (i.e. they are authenticated)
      navigate("/user/prompt");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      setIsErrorState(true);
      setIsButtonDisabled(false);
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsErrorState(false);
    e.preventDefault();
    if (email && password) {
      postLogin({ email, password });
      setEmail("");
      setPassword("");
    }
    if (!email) {
      setIsEmailErrorState(true);
    }
    if (!password) {
      setIsPasswordErrorState(true);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      style={{
        padding: "3.5em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "2em",
      }}
    >
      <CustomTextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={isEmailErrorState || isErrorState}
        onFocus={() => {
          setIsEmailErrorState(false);
          setIsErrorState(false);
        }}
        helperText={isEmailErrorState ? "Email is required" : null}
      />
      <Box sx={{ width: "100%" }}>
        <CustomTextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={isPasswordErrorState || isErrorState}
          onFocus={() => {
            setIsPasswordErrorState(false);
            setIsErrorState(false);
          }}
          helperText={isPasswordErrorState ? "Password is required" : null}
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
            Looks like you've entered incorrect credentials or login has failed
            :( Please try again
          </Typography>
        )}
      </Box>
      <StyledButton
        variant="contained"
        color="lightPeach"
        disabled={isButtonDisabled}
        type="submit"
      >
        LOG IN
      </StyledButton>
    </form>
  );
};

export default LoginTab;
