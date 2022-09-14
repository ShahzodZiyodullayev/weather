import { useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import "./index.css";
import { options, series, xaxisCategories } from "../../helper/chartData";

function RightSide() {
  const daily = useSelector((state) => state.daily);

  let xaxis = xaxisCategories(daily);

  return (
    <Grid item xs md={9}>
      <Grid className="right-side_paper">
        <ReactApexChart
          options={options(xaxis)}
          series={series(daily)}
          type="area"
          height={200}
        />
      </Grid>
    </Grid>
  );
}

export default RightSide;
