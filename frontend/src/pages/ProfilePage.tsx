import NavBar from "../components/NavBar";
import { Typography, ThemeProvider, Grid, Button } from "@mui/material";
import { theme } from "../theme";
import SongCard from "../components/SongCard";
import { useState } from "react";

const ProfilePage = () => {
  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    profilePic: "url_to_profile_pic",
    discoveryDate: "29th April 2024",
  };

  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Typography variant="h3" style={{ marginBottom: "20px" }}>
          PROFILE
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <img
            src={dummyUser.profilePic}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              marginRight: "60px",
            }}
          ></img>
          <div>
            <Typography variant="h1">{dummyUser.name}</Typography>
            <Typography variant="subtitle1">
              Discovering since {dummyUser.discoveryDate}
            </Typography>
          </div>
        </div>

      </ThemeProvider>
    </>
  );
};

export default ProfilePage;
