import React from "react";
import { Grid, Typography } from "@mui/material";
import "./styles.css";

function InfoCard({ icon, name, value }) {
  return (
    <Grid className="sunrise_and_sunset_left">
      <Grid>{icon}</Grid>
      <Grid ml={1}>
        <Typography variant="body" className="weather-property_title">
          {name}
        </Typography>
        <br />
        <Typography variant="body" className="weather-property_value">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default InfoCard;
