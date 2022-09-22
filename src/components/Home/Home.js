import React from "react";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";
import { Grid } from "@mui/material";
import "./style.css";

function Home(props) {
  const { currentLocation } = props;

  return (
    <Grid padding={3} height="100vh" backgroundColor="#282828" className="home">
      <Grid container columnSpacing={3} height="100%">
        <LeftSide currentLocation={currentLocation} />
        <RightSide />
      </Grid>
    </Grid>
  );
}

export default Home;
