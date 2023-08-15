import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Profile from "./Profile";
import Intro from "./Intro";

const Home = ({ theme }) => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Grid container >
        <Grid item xs={12} md={3} >
          <Profile theme={theme} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Intro theme={theme} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
