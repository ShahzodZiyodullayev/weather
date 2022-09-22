import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import "./index.css";
import { options, series, xaxisCategories } from "../../helper/chartData";
import InfoCard from "../InfoCard/InfoCard";
import { WiHorizonAlt } from "react-icons/wi";
import { shortMonthName } from "../../helper/date";

function RightSide() {
  const daily = useSelector((state) => state.daily);
  console.log(daily);
  let xaxis = xaxisCategories(daily);

  const getTimefromUnix = (arg) => {
    const date = new Date(arg * 1000);
    return date.getDate() + " " + shortMonthName[date.getMonth()];
  };

  return (
    <Grid item xs md={9} container columnSpacing={3} height="max-content">
      <Grid item md={8}>
        <Grid className="right-side_chart">
          <ReactApexChart
            options={options(xaxis)}
            series={series(daily)}
            type="area"
            height="100%"
          />
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid padding={3} className="right-side_detail">
          {daily?.data &&
            daily.data.map((e) => (
              <InfoCard
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
    </Grid>
  );
}

export default RightSide;
