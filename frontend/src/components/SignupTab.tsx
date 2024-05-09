import { Button, styled } from "@mui/material";
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

  // This method does a POST request to signup and sets user ID in context if successful,
  // thus logging them in automatically after sign up.
  const postSignup = async (signUp: {
    email: string;
    password: string;
    displayName?: string;
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, signUp);
      setCurrentUserId(response.data.user._id); // sets the user ID in App Context (i.e. they are authenticated)
      navigate("/user/prompt");
    } catch (error: unknown) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <CustomTextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <CustomTextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <CustomTextField
        label="Display Name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
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
        }}
      >
        SIGN UP
      </StyledButton>
    </>
  );
};

export default SignupTab;
