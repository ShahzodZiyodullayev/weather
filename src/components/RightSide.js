import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CitySelect from "./CitySelect";
import { Divider, Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import Hourly from "./Hourly";
import Daily from "./Daily";
import Today from "./Today";

function RightSide(props) {
  const current = useSelector((state) => state.current);
  const { select, setCurrentLocation } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={8}
      sx={{ background: "white", height: "100vh", p: "40px 60px" }}
    >
      <Grid
        mb="7px"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography sx={{ fontFamily: "Comfortaa, cursive", color: "#666" }}>
          Statistics
        </Typography>
        <CitySelect select={select} setCurrentLocation={setCurrentLocation} />
      </Grid>
      <Grid>
        <Divider />
      </Grid>
      <Grid container>
        <Grid item md={3} xs={3} p="20px" textAlign="center">
          <img
            src={require("./../assets/icons/humidity.png")}
            width="60px"
            alt="img"
          />
          <Typography fontFamily="Comfortaa, cursive" color="#999">
            {current && current.humidity} %
          </Typography>
        </Grid>
        <Grid item md={3} xs={3} p="20px" textAlign="center">
          <img
            src={require("./../assets/icons/wind.png")}
            width="60px"
            alt="img"
          />
          <Typography fontFamily="Comfortaa, cursive" color="#999">
            {current && Math.round(current.wind_speed)} m/s
          </Typography>
        </Grid>
        <Grid item md={3} xs={3} p="20px" textAlign="center">
          <img
            src={require("./../assets/icons/clouds.png")}
            width="60px"
            alt="img"
          />
          <Typography fontFamily="Comfortaa, cursive" color="#999">
            {current && current.clouds} %
          </Typography>
        </Grid>
        <Grid item md={3} xs={3} p="20px" textAlign="center">
          <img
            src={require("./../assets/icons/pressure.png")}
            width="60px"
            alt="img"
          />
          <Typography fontFamily="Comfortaa, cursive" color="#999">
            {current && current.pressure} hPa
          </Typography>
        </Grid>
      </Grid>
      <Grid overflow="hidden">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={`Today`}
                {...a11yProps(0)}
                sx={{
                  fontFamily: "Comfortaa, cursive",
                  textTransform: "capitalize",
                  p: 0,
                }}
              />
              <Tab
                label={`Hourly`}
                {...a11yProps(1)}
                sx={{
                  fontFamily: "Comfortaa, cursive",
                  textTransform: "capitalize",
                  p: 0,
                }}
              />
              <Tab
                label={`Daily`}
                {...a11yProps(2)}
                sx={{
                  fontFamily: "Comfortaa, cursive",
                  textTransform: "capitalize",
                  p: 0,
                }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Today />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Hourly />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Daily />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RightSide;
