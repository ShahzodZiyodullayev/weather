import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Daily() {
  const daily = useSelector((i) => i.daily);

  console.log("daily: ", daily);

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

  let daysName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Grid
      ml="5px"
      sx={{
        height: { md: "52vh", sm: "57vh", xs: "62vh" },
        overflow: "auto",
        "::-webkit-scrollbar": {
          width: "3px",
          backgroundColor: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
        ":hover::-webkit-scrollbar": {
          width: "3px",
          backgroundColor: "#E8EAED",
        },
        ":hover::-webkit-scrollbar-thumb": {
          borderRadius: "3px",
          backgroundColor: "#c1c1c1",
        },
      }}
    >
      {daily &&
        daily.data &&
        daily.data.length > 0 &&
        daily.data.map((item) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Grid>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#26C785"
                fontSize="15px"
                lineHeight="15px"
              >
                {(() => {
                  let date = new Date(item.dt * 1000);
                  return monthName[date.getMonth()] + " " + date.getDate();
                })()}
              </Typography>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="13px"
              >
                {(() => {
                  let date = new Date(item.dt * 1000);
                  return daysName[date.getDay()];
                })()}
              </Typography>
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                textTransform="capitalize"
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="14px"
                textAlign="right"
              >
                {item.weather[0].description}
              </Typography>
              <Grid>
                <Typography
                  fontFamily="Comfortaa, cursive"
                  color="#26C785"
                  fontSize="15px"
                  lineHeight="15px"
                  width="70px"
                  textAlign="right"
                  mr="10px"
                >
                  {Math.round(item.temp.max - 273.15)}°C
                </Typography>
                <Typography
                  fontFamily="Comfortaa, cursive"
                  color="#999"
                  fontSize="13px"
                  width="70px"
                  textAlign="right"
                  mr="10px"
                >
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
