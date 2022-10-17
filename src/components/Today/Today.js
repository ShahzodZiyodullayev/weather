import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import "swiper/swiper-bundle.css";
import { options } from "../../helper/dailyChartData";
import "./style.css";
// import { Swiper, SwiperSlide } from "swiper/react";

function Today() {
  const today = useSelector((i) => i.current);
  const hourly = useSelector((s) => s.daily);

  const chartData = [
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
      chartData[0].data.push(Math.round(y.temp.min - 273.15));
      chartData[1].data.push(Math.round(y.temp.max - 273.15));
      options.xaxis.categories.push(new Date(y.dt * 1000).getDate());
    });
  }

  // let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Grid>
      <Grid className="todayContainer">
        {today && Object.keys(today).length > 0 && (
          <Grid>
            <Grid>
              <Grid className="row" container>
                <Typography className="Typography">Sunrise</Typography>
                <Grid className="UVIIndex">
                  <Typography className="Typography2">
                    {(() => {
                      let date = new Date(today.sunrise * 1000);
                      let hours = date.getHours();
                      return hours + ":00";
                    })()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="row">
                <Typography className="Typography">Sunset</Typography>
                <Grid className="UVIIndex">
                  <Typography className="Typography2">
                    {(() => {
                      let date = new Date(today.sunset * 1000);
                      let hours = date.getHours();
                      return hours + ":00";
                    })()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="row">
                <Typography className="Typography">Visibility</Typography>
                <Grid className="UVIIndex">
                  <Typography className="Typography2">
                    {today.visibility / 1000 >= 1
                      ? today.visibility % 1000 === 0
                        ? today.visibility / 1000 + " km"
                        : (today.visibility / 1000).toFixed(1) + " km"
                      : today.visibility + " m"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="row">
                <Typography className="Typography">UVI</Typography>
                <Grid className="UVIIndex">
                  <Typography className="Typography2">{today.uvi}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <ReactApexChart
        type="line"
        series={chartData}
        options={options}
        height={364}
      />
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
