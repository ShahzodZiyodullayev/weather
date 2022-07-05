import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { monthName } from "../../helper/date";

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
    <Grid
      item
      xs={12}
      sm={12}
      md={4}
      sx={{
        p: { md: "60px", sm: "30px", xs: "20px 20px 40px 20px" },
        height: { md: "100vh", sm: "50vh", xs: "50vh" },
        display: "flex",
        // background: "linear-gradient(-30deg, #F88169, #F14B91)",
        background: "linear-gradient(330deg, #11998e 0%, #38ef7d 100% )",
        flexDirection: " column",
        justifyContent: "space-between",
        clipPath: {
          md: "none",
          sm: "none",
          xs: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        },
      }}
    >
      <Grid>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Comfortaa, cursive",
            fontSize: "60px",
            lineHeight: "60px",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Comfortaa, cursive",
          }}
        >
          {currentDate}
        </Typography>
        {/* <img
          style={{ marginLeft: "-20px" }}
          src={`http://openweathermap.org/img/wn/${
            current && current.weather && current.weather[0].icon
          }@2x.png`}
        /> */}
      </Grid>

      <Grid
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
      </Grid>
    </Grid>
  );
}

export default LeftSide;
