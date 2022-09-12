import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CitySelect from "../CitySelect";
import { Divider, Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hourly from "../Hourly";
import Daily from "../Daily";
import Today from "../Today";
import ReactApexChart from "react-apexcharts";
import "./index.css";

function RightSide(props) {
  const daily = useSelector((state) => state.daily);
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Grid
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Grid>
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

  let series;
  let gradientColors;
  if (daily?.data) {
    series = [
      {
        name: "yuqori",
        data: daily.data.map((e) => Math.round(e.temp.day - 273.15)),
      },
      {
        name: "past",
        data: daily.data.map((e) => Math.round(e.temp.night - 273.15)),
      },
    ];
    gradientColors = [
      daily.data.map((e, i) => {
        return {
          offset: i * 12.5,
          color: Math.round(e.temp.day - 273.15) > 25 ? "#FFDCE5" : "#FFF0FA",
          opacity: 0.7,
        };
      }),
      daily.data.map((e, i) => {
        return {
          offset: i * 12.5,
          color: Math.round(e.temp.night - 273.15) < 15 ? "#57ffff" : "#B4FFFF",
          opacity: 0.5,
        };
      }),
    ];
  } else {
    series = [];
    gradientColors = [];
  }

  let options = {
    colors: ["#000000"],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    fill: {
      shade: "light",
      type: "gradient",
      gradient: {
        type: "horizontal",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: gradientColors,
      },
    },
    dataLabels: {
      offsetX: 0,
      offsetY: -5,
      formatter: (val) => val + "°",
      background: {
        enabled: false,
      },
      style: {
        fontSize: "14px",
        fontFamily: '"Comfortaa", cursive',
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: ["sept", "oct", "nov", "dec", "jan", "feb", "march", "apr"],
      axisTicks: {
        show: false,
      },
      tickPlacement: "on",
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      labels: { show: false },
    },
    stroke: { show: false },
    grid: {
      show: false,
    },
  };

  return (
    // <Grid
    //   className="rightSide"
    //   item
    //   xs={12}
    //   sm={12}
    //   md={8}
    //   sx={{
    //     position: "relative",
    //     height: "100vh",
    //     overflow: "hidden",
    //     p: { md: "40px 60px", sm: "20px 30px", xs: "10px 20px" },
    //   }}
    // >
    //   <Grid className="background"></Grid>
    //   <Grid
    //     mb="7px"
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "flex-end",
    //     }}
    //   >
    //     <Typography sx={{ fontFamily: "Comfortaa, cursive", color: "#666" }}>
    //       Statistics
    //     </Typography>
    //     <CitySelect select={select} setCurrentLocation={setCurrentLocation} />
    //   </Grid>
    //   <Grid>
    //     <Divider />
    //   </Grid>
    //   <Grid container>
    //     <Grid item md={3} xs={3} p="20px" textAlign="center">
    //       <img
    //         src={require("./../../assets/icons/humidity.png")}
    //         width={isSm ? "40px" : "60px"}
    //         alt="img"
    //       />
    //       <Typography fontFamily="Comfortaa, cursive" color="#999">
    //         {current && current.humidity} %
    //       </Typography>
    //     </Grid>
    //     <Grid item md={3} xs={3} p="20px" textAlign="center">
    //       <img
    //         src={require("./../../assets/icons/wind.png")}
    //         width={isSm ? "40px" : "60px"}
    //         alt="img"
    //       />
    //       <Typography fontFamily="Comfortaa, cursive" color="#999">
    //         {current && Math.round(current.wind_speed)} m/s
    //       </Typography>
    //     </Grid>
    //     <Grid item md={3} xs={3} p="20px" textAlign="center">
    //       <img
    //         src={require("./../../assets/icons/clouds.png")}
    //         width={isSm ? "40px" : "60px"}
    //         alt="img"
    //       />
    //       <Typography fontFamily="Comfortaa, cursive" color="#999">
    //         {current && current.clouds} %
    //       </Typography>
    //     </Grid>
    //     <Grid item md={3} xs={3} p="20px" textAlign="center">
    //       <img
    //         src={require("./../../assets/icons/pressure.png")}
    //         width={isSm ? "40px" : "60px"}
    //         alt="img"
    //       />
    //       <Typography fontFamily="Comfortaa, cursive" color="#999">
    //         {current && current.pressure} hPa
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   <Grid overflow="hidden">
    //     <Box sx={{ width: "100%" }}>
    //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //         <Tabs
    //           value={value}
    //           onChange={handleChange}
    //           aria-label="basic tabs example"
    //           textColor="primary"
    //           indicatorColor="primary"
    //           centered={isSm ? true : false}
    //         >
    //           <Tab
    //             label={`Today`}
    //             {...a11yProps(0)}
    //             sx={{
    //               fontFamily: "Comfortaa, cursive",
    //               textTransform: "capitalize",
    //               p: 0,
    //             }}
    //           />
    //           <Tab
    //             label={`Hourly`}
    //             {...a11yProps(1)}
    //             sx={{
    //               fontFamily: "Comfortaa, cursive",
    //               textTransform: "capitalize",
    //               p: 0,
    //             }}
    //           />
    //           <Tab
    //             label={`Daily`}
    //             {...a11yProps(2)}
    //             sx={{
    //               fontFamily: "Comfortaa, cursive",
    //               textTransform: "capitalize",
    //               p: 0,
    //             }}
    //           />
    //         </Tabs>
    //       </Box>
    //       <TabPanel value={value} index={0}>
    //         <Today />
    //       </TabPanel>
    //       <TabPanel value={value} index={1}>
    //         <Hourly />
    //       </TabPanel>
    //       <TabPanel value={value} index={2}>
    //         <Daily />
    //       </TabPanel>
    //     </Box>
    //   </Grid>
    // </Grid>
    <Grid xs md={8}>
      <Grid sx={{ justifyContent: "center", paddingRight: "10px" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </Grid>
    </Grid>
  );
}

export default RightSide;
