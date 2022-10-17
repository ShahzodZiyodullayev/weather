import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import "./index.css";
import {
  dailyOptions,
  dailySeries,
  dailyXaxisCategories,
} from "../../helper/dailyChartData";
import {
  hourlyOptions,
  hourlySeries,
  hourlyXaxisCategories,
} from "../../helper/hourlyChartData";
import InfoCard from "../InfoCard/InfoCard";
import { shortMonthName } from "../../helper/date";
import { useSpring, config, animated } from "react-spring";

function RightSide() {
  const daily = useSelector((state) => state.daily);
  const hourly = useSelector((state) => state.hourly);
  let dailyXaxis = dailyXaxisCategories(daily);
  let hourlyXaxis = hourlyXaxisCategories({
    data: hourly?.data ? hourly.data.filter((e, i) => i < 24) : undefined,
  });

  const getTimefromUnix = (arg) => {
    const date = new Date(arg * 1000);
    return date.getDate() + " " + shortMonthName[date.getMonth()];
  };

  const FadeAnimation = (time) => {
    return useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: time,
      config: config.molasses,
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={8}
      xl={9}
      container
      columnSpacing={3}
      rowSpacing={2}
      height="max-content"
    >
      <Grid item xs={12} sm={12} md={8} lg={12} xl={8}>
        <animated.div style={FadeAnimation(700)}>
          <Grid className="right-side_chart">
            <Typography variant="h5" ml="14px">
              Daily
            </Typography>
            <ReactApexChart
              options={dailyOptions(dailyXaxis)}
              series={dailySeries(daily)}
              type="area"
              height="100%"
            />
          </Grid>
        </animated.div>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
        <animated.div style={FadeAnimation(900)}>
          <Grid padding={3} className="right-side_detail">
            <Typography variant="h5" ml="14px">
              Daily
            </Typography>
            <Grid className="right-side_scrollable-grid">
              {daily?.data &&
                daily.data.map((e, ind) => (
                  <InfoCard
                    key={ind}
                    icon={
                      <img
                        style={{ margin: "-15px", width: "80px" }}
                        src={`http://openweathermap.org/img/wn/${
                          e && e.weather && e.weather[0].icon
                        }@2x.png`}
                      />
                    }
                    name={getTimefromUnix(e.dt)}
                    value={`${Math.round(e.temp.day - 273.15)}°/ ${Math.round(
                      e.temp.night - 273.15,
                    )}°`}
                  />
                ))}
            </Grid>
          </Grid>
        </animated.div>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
        <animated.div style={FadeAnimation(1100)}>
          <Grid padding={3} className="right-side_detail">
            <Typography variant="h5" ml="14px">
              Hourly
            </Typography>
            <Grid className="right-side_scrollable-grid">
              {hourly?.data &&
                hourly.data
                  .filter((e, i) => i < 24)
                  .map((e, ind) => (
                    <InfoCard
                      key={ind}
                      icon={
                        <img
                          style={{ margin: "-15px", width: "80px" }}
                          src={`http://openweathermap.org/img/wn/${
                            e && e.weather && e.weather[0].icon
                          }@2x.png`}
                        />
                      }
                      name={getTimefromUnix(e.dt)}
                      value={`${Math.round(e.temp.day - 273.15)}°/ ${Math.round(
                        e.temp.night - 273.15,
                      )}°`}
                    />
                  ))}
            </Grid>
          </Grid>
        </animated.div>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={12} xl={8}>
        <animated.div style={FadeAnimation(1300)}>
          <Grid className="right-side_chart">
            <Typography variant="h5" ml="14px">
              Hourly
            </Typography>
            <Grid height={true} className="right-side_hourly-chart">
              <ReactApexChart
                options={hourlyOptions(hourlyXaxis)}
                series={hourlySeries(hourly)}
                type="area"
                width="2000px"
                height="100%"
              />
            </Grid>
          </Grid>
        </animated.div>
      </Grid>
    </Grid>
  );
}

export default RightSide;
