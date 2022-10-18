import React from "react";
import { Grid, Typography } from "@mui/material";
import "./styles.css";

function InfoCard({ icon, name, value, type, description }) {
  return (
    <>
      {type === "current" && (
        <Grid className="sunrise_and_sunset_left">
          <Grid className="weather-property_left-container">
            <Grid className="weather-property_icon">{icon}</Grid>
            <Grid ml={1}>
              <Typography variant="body" className="weather-property_title">
                {name}
              </Typography>
              <br />
              <Typography
                variant="body"
                color="#FFB3AA"
                className="weather-property_value"
              >
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {type === "daily" && (
        <Grid
          className="sunrise_and_sunset_left"
          sx={{ width: "100% !important" }}
        >
          <Grid className="weather-property_left-container">
            <Grid className="weather-property_icon">{icon}</Grid>
            <Grid ml={1}>
              <Typography variant="body" className="weather-property_title">
                {name}
              </Typography>
              <br />
              <Typography
                variant="body"
                color="#FFB3AA"
                className="weather-property_value"
              >
                {value}
              </Typography>
            </Grid>
          </Grid>

          <Grid className="weather-property_additional">{description}</Grid>
        </Grid>
      )}
      {type === "hourly" && (
        <Grid
          className="sunrise_and_sunset_left"
          sx={{ width: "100% !important" }}
        >
          <Grid className="weather-property_left-container">
            <Grid className="weather-property_icon">{icon}</Grid>
            <Grid ml={1}>
              <Typography variant="body" className="weather-property_title">
                {name}
              </Typography>
              <br />
              <Typography
                variant="body"
                color="#FFB3AA"
                className="weather-property_value"
              >
                {value}
              </Typography>
            </Grid>
          </Grid>

          <Grid className="weather-property_additional">{description}</Grid>
        </Grid>
      )}
    </>
  );
}

export default InfoCard;
