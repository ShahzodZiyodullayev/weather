import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import CitySelect from "../CitySelect";
import { monthName } from "../../helper/date";
import "./styles.css";

function LeftSide(props) {
  const { currentLocation } = props;
  const [currentDate, setCurrentDate] = useState();
  const [time, setTime] = useState();
  const current = useSelector((item) => item.current);

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
    date();
    const timer = setInterval(() => {
      const t = new Date();
      setTime(
        `${t.getHours() < 10 ? "0" + t.getHours() : t.getHours()}:${
          t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()
        }:${t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()}`,
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid className="left-side_container" item xs md={4}>
      {/* <Grid> */}
        <CitySelect />
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
        {/* <img
          style={{ marginLeft: "-20px" }}
          src={`http://openweathermap.org/img/wn/${
            current && current.weather && current.weather[0].icon
          }@2x.png`}
        /> */}
      {/* </Grid> */}

      {/* <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            display: " flex",
            fontSize: "170px",
            lineHeight: "110px",
            color: "white",
            fontFamily: "Comfortaa, cursive",
          }}
        >
          {current && current.temp && `${Math.round(current.temp - 273.15)}`}
          <span
            style={{
              position: "relative",
              fontSize: "70px",
              marginTop: "-60px",
            }}
          >
            °
          </span>
        </Typography>
        <Typography
          noWrap
          sx={{
            color: "white",
            fontFamily: "Comfortaa, cursive",
            fontSize: "20px",
            lineHeight: "20px",
            mt: "20px",
          }}
        >
          {currentLocation}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Comfortaa, cursive",
            fontSize: "12px",
            lineHeight: "12px",
            textTransform: "capitalize",
            mt: "7px",
          }}
        >
          {current && current.weather && current.weather[0].description}
        </Typography>
      </Grid> */}
    </Grid>
  );
}

export default LeftSide;
