import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.css";
import { monthName, daysName } from "../../helper/date";

function Daily() {
  const daily = useSelector((i) => i.daily);

  return (
    <Grid item className="dailyContainer">
      {daily &&
        daily.data &&
        daily.data.length > 0 &&
        daily.data.map((item) => (
          <Grid key={item.dt} container className="rows">
            <Grid>
              <Typography className="typography oneDaily" fontSize={15}>
                {(() => {
                  let date = new Date(item.dt * 1000);
                  return monthName[date.getMonth()] + " " + date.getDate();
                })()}
              </Typography>
              <Typography className="typography twoDaily" fontSize={13}>
                {(() => {
                  let date = new Date(item.dt * 1000);
                  return daysName[date.getDay()];
                })()}
              </Typography>
            </Grid>
            <Grid className="highLowContainer">
              <Typography className="typography threeDaily" fontSize={14}>
                {item.weather[0].description}
              </Typography>
              <Grid>
                <Typography className="typography fourDaily" fontSize={15}>
                  {Math.round(item.temp.max - 273.15)}°C
                </Typography>
                <Typography className="typography fiveDaily" fontSize={13}>
                  {Math.round(item.temp.min - 273.15)}°C
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default Daily;
