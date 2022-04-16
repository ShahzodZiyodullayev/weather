import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";

function LeftSide(props) {
  const { currentLocation } = props;
  const [currentDate, setCurrentDate] = useState();
  const current = useSelector((item) => item.current);

  // console.log(current);

  const date = () => {
    let monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let newDate = new Date();
    let month = monthName[newDate.getMonth()];
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    setCurrentDate(`${month} ${day}, ${year}`);
  };

  useEffect(() => {
    date();
  }, []);

  return (
    <Grid
      xs={12}
      sm={12}
      md={4}
      sx={{
        p: { md: "60px", sm: "30px", xs: "20px 20px 40px 20px" },
        height: { md: "100vh", sm: "50vh", xs: "50vh" },
        display: "flex",
        background: "linear-gradient(-30deg, #F88169, #F14B91)",
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
          }}
        >
          {currentDate}
        </Typography>
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
