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
  const { setIsUserAuthenticated } = useContext(AppContext);

  // This method does a POST request to signup and sets user as authenticated in context if true,
  // thus logging them in automatically after sign up.
  // TODO: Remove console.log for success and store user data as appropriate
  const postSignup = async (signUp: {
    email: string;
    password: string;
    displayName?: string;
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, signUp);
      console.log("Signup successful: ", response.data);
      setIsUserAuthenticated(true);
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
          }
        }}
      >
        SIGN UP
      </StyledButton>
    </>
  );
};

export default SignupTab;
