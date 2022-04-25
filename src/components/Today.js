import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Today() {
  const today = useSelector((i) => i.current);

  return (
    <Grid
      ml="5px"
      sx={{
        height: "48vh",
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
      {today && Object.keys(today).length > 0 && (
        <>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Typography
              fontFamily="Comfortaa, cursive"
              color="#999"
              fontSize="15px"
            >
              Sunrise
            </Typography>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="15px"
                textAlign="right"
                mr="10px"
              >
                {(() => {
                  let date = new Date(today.sunrise * 1000);
                  let hours = date.getHours();
                  return hours + ":00";
                })()}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Typography
              fontFamily="Comfortaa, cursive"
              color="#999"
              fontSize="15px"
            >
              Sunset
            </Typography>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="15px"
                textAlign="right"
                mr="10px"
              >
                {(() => {
                  let date = new Date(today.sunset * 1000);
                  let hours = date.getHours();
                  return hours + ":00";
                })()}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Typography
              fontFamily="Comfortaa, cursive"
              color="#999"
              fontSize="15px"
            >
              Visibility
            </Typography>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="15px"
                textAlign="right"
                mr="10px"
              >
                {today.visibility / 1000 >= 1
                  ? today.visibility % 1000 === 0
                    ? today.visibility / 1000 + " km"
                    : (today.visibility / 1000).toFixed(1) + " km"
                  : today.visibility + " m"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p="17px 0"
          >
            <Typography
              fontFamily="Comfortaa, cursive"
              color="#999"
              fontSize="15px"
            >
              UVI
            </Typography>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                fontFamily="Comfortaa, cursive"
                color="#999"
                fontSize="15px"
                textAlign="right"
                mr="10px"
              >
                {today.uvi}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Today;
