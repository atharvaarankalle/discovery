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

const LoginTab = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { setIsUserAuthenticated } = useContext(AppContext);

  // This method does a POST request to login and sets user as authenticated in context if true
  // TODO: Remove console.log for success and store user data as appropriate
  const postLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginData
      );
      console.log("Login successful: ", response.data);
      setIsUserAuthenticated(true);
      navigate("/user/prompt");
    } catch (error: unknown) {
      console.error("Login failed:", error);
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
      <StyledButton
        variant="contained"
        color="lightPeach"
        onClick={() => {
          if (email && password) {
            postLogin({ email, password });
            setEmail("");
            setPassword("");
          }
        }}
      >
        LOG IN
      </StyledButton>
    </>
  );
};

export default LoginTab;
