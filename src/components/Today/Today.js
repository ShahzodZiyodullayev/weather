import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// import AppWebsiteVisits from "./AppWebsiteVisits";
import ReactApexChart from "react-apexcharts";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

function Today() {
  const today = useSelector((i) => i.current);
  const hourly = useSelector((s) => s.daily);

  let options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    xaxis: {
      categories: [],
      labels: {
        offsetX: 4,
        show: true,
        format: "dd",
        formatter: function (value) {
          return value + " July";
        },
      },
      axisBorder: {
        show: true,
        color: "#78909C",
        height: 0,
        width: "100%",
      },
      axisTicks: {
        show: true,
        borderType: "dotted",
        color: "#000",
        height: 0,
      },
    },
    yaxis: { show: false },
    colors: ["#14bdeb", "#E91E63"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return val + "°C";
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 4,
      offsetY: -5,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: undefined,
      },
      background: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    markers: {
      size: 5,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  let chartD = [
    {
      name: "Low",
      type: "line",
      fill: "solid",
      data: [],
    },
    {
      name: "High",
      type: "line",
      fill: "solid",
      data: [],
    },
  ];

  if (hourly?.data && hourly.data.length > 0) {
    hourly.data.map((y, i) => {
      chartD[0].data.push(Math.round(y.temp.min - 273.15));
      chartD[1].data.push(Math.round(y.temp.max - 273.15));
      options.xaxis.categories.push(new Date(y.dt * 1000).getDate());
    });
  }

  let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Grid>
      <Grid
        ml="5px"
        sx={{
          // height: "48vh",
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
          <Grid>
            <Grid>
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
            </Grid>
          </Grid>
        )}
      </Grid>
      <ReactApexChart
        type="line"
        series={chartD}
        options={options}
        height={364}
      />
      {/* <AppWebsiteVisits
        title="Website Visits"
        subheader="(+43%) than last year"
        chartLabels={[
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
        ]}
        chartData={[
          {
            name: "Team A",
            type: "column",
            fill: "solid",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: "Team B",
            type: "area",
            fill: "gradient",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: "Team C",
            type: "line",
            fill: "solid",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
        ]}
      /> */}
      {/* <Swiper
        style={{ border: "1px solid" }}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 4,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 5,
          },
          // when window width is >= 991px
          991: {
            width: 991,
            slidesPerView: 6,
          },
          // when window width is >= 1024px
          1024: {
            width: 1024,
            slidesPerView: 6,
          },
        }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((k, i) => (
          <SwiperSlide key={i.toString()} style={{ display: "flex" }}>
            <Grid width="300px" height="300px" backgroundColor="red">hello</Grid>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </Grid>
  );
}

export default Today;
