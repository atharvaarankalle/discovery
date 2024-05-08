import { Button, styled } from "@mui/material";
import CustomTextField from "./CustomTextField";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const StyledButton = styled(Button)({
  fontWeight: "bold",
});

const postLogin = async (loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData, {
      withCredentials: true,
    });
    axios.defaults.withCredentials = true;

    console.log("Login successful:", response.data);
  } catch (error: unknown) {
    console.error("Login failed:", error);
  }
};

const LoginTab = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

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
            postLogin({ email, password }); // Wait for postLogin to complete
            setEmail("");
            setPassword("");
            navigate("/user/prompt");
          }
        }}
      >
        LOG IN
      </StyledButton>
    </>
  );
};

export default LoginTab;
