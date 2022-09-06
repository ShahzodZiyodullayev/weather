import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Avatar, Stack } from "@mui/material";
import CitySelect from "../CitySelect";
import { monthName } from "../../helper/date";
import { UilBell } from "@iconscout/react-unicons";
import {
  WiHorizonAlt,
  WiHorizon,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiWindDeg,
} from "react-icons/wi";
import "./styles.css";

function LeftSide(props) {
  // const { currentLocation } = props;
  const [currentDate, setCurrentDate] = useState();
  const [time, setTime] = useState();
  const current = useSelector((item) => item.current);
  const currentLocation = useSelector((item) => item.location);

  console.log("✅ ", current);

  // console.log(current.weather[0].icon);
  // let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const date = () => {
    let newDate = new Date();
    let month = monthName[newDate.getMonth()];
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    setCurrentDate(`${month} ${day}, ${year}`);
  };

  useEffect(() => {
    // date();
    // const timer = setInterval(() => {
    //   const t = new Date();
    //   setTime(
    //     `${t.getHours() < 10 ? "0" + t.getHours() : t.getHours()}:${
    //       t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
    //     }:${t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()}`,
    //   );
    // }, 1000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  return (
    <Grid className="left-side_container" direction="column" item xs md={4}>
      <Grid className="tools_bar">
        <CitySelect />
        <Stack direction="row" spacing={2} ml={2}>
          <Avatar
            variant="square"
            sx={{ borderRadius: "10px", background: "transparent" }}
          >
            <UilBell />
          </Avatar>
          <Avatar
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            variant="square"
            sx={{ borderRadius: "10px" }}
          />
        </Stack>
        {/* <Typography
          sx={{
            color: "white",
            fontFamily: "Comfortaa, cursive",
            fontSize: "60px",
            lineHeight: "60px",
          }}
        >
          {time}
        </Typography> */}
        {/* <Typography className="current-date">{currentDate}</Typography> */}
      </Grid>

      <Grid container className="sunrise_and_sunset">
        <Grid item container md className="sunrise_and_sunset_left">
          <Grid md>
            <WiHorizonAlt size={50} color="white" />
          </Grid>
          <Grid md>
            <Typography>Sunrise</Typography>
            <Typography>4:40</Typography>
          </Grid>
        </Grid>
        <Grid item container md className="sunrise_and_sunset_right">
          <Grid md>
            <WiHorizon size={50} color="white" />
          </Grid>
          <Grid md>Two</Grid>
        </Grid>
      </Grid>
      <Grid container className="sunrise_and_sunset">
        <Grid item container md className="sunrise_and_sunset_left">
          <Grid md>
            <WiHumidity size={50} color="white" />
          </Grid>
          <Grid md>Two</Grid>
        </Grid>
        <Grid item container md className="sunrise_and_sunset_right">
          <Grid md>
            <WiBarometer size={50} color="white" />
          </Grid>
          <Grid md>Two</Grid>
        </Grid>
      </Grid>
      <Grid container className="sunrise_and_sunset">
        <Grid item container md className="sunrise_and_sunset_left">
          <Grid md>
            <WiStrongWind size={50} color="white" />
          </Grid>
          <Grid md>Two</Grid>
        </Grid>
        <Grid item container md className="sunrise_and_sunset_right">
          <Grid md>
            <WiWindDeg size={50} color="white" />
          </Grid>
          <Grid md>Two</Grid>
        </Grid>
      </Grid>

      {current && current.temp && (
        <Grid className="temperature">
          <Typography className="temperature_value" variant="body">
            {current && current.temp && `${Math.round(current.temp - 273.15)}`}
            <span className="temperature_round">°</span>
          </Typography>
          {currentLocation && (
            <Typography className="current_location" noWrap variant="body">
              {currentLocation.data}
            </Typography>
          )}
          <br />
          <Typography className="temperature_description" variant="body">
            {current && current.weather && current.weather[0].description}
          </Typography>
          {/* <img
            style={{ marginLeft: "-20px" }}
            src={`http://openweathermap.org/img/wn/${current && current.weather && current.weather[0].icon
              }@2x.png`}
          /> */}
        </Grid>
      )}
    </Grid>
  );
}

export default LeftSide;
