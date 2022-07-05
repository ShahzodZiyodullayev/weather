import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.css";

function Hourly() {
  const hourly = useSelector((s) => s.hourly);

  return (
    <Grid className="hourlyContainer" item>
      {hourly &&
        hourly.data &&
        hourly.data.length > 0 &&
        hourly.data.map((item) => (
          <Grid className="rows" key={item.dt} container>
            <Typography className="typography oneHourly" fontSize="15px">
              {(() => {
                let date = new Date(item.dt * 1000);
                let hours = date.getHours();
                return hours + ":00";
              })()}
            </Typography>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography className="typography twoHourly" fontSize="14px">
                {item.weather[0].description}
              </Typography>
              <Typography className="typography threeHourly" fontSize="15px">
                {Math.round(item.temp - 273.15)}°C
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default Hourly;
