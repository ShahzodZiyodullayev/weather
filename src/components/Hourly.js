import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Hourly() {
  const hourly = useSelector((s) => s.hourly);

  console.log("hourly: ", hourly);

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
      {hourly &&
        hourly.data &&
        hourly.data.length > 0 &&
        hourly.data.map((item) => (
          <Grid
            key={item.dt}
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Typography
              fontFamily="Comfortaa, cursive"
              color="#999"
              fontSize="15px"
              textAlign="right"
            >
              {(() => {
                let date = new Date(item.dt * 1000);
                let hours = date.getHours();
                return hours + ":00";
              })()}
            </Typography>
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
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#F46280"
                fontSize="15px"
                lineHeight="15px"
                width="70px"
                textAlign="right"
                mr="10px"
              >
                {Math.round(item.temp - 273.15)}°C
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default Hourly;
