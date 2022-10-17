import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { shortMonthName } from "../../../helper/date";

function DailyChart() {
  const daily = useSelector((state) => state.daily);

  const dailyChartOptions = {
    colors: ["#ffffff"],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      offsetX: 5,
      offsetY: -10,
      animations: {
        enabled: true,
        easing: "linear",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    markers: {
      size: 0,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#FFB3AA", "#6FECFF"],
      width: 1,
      dashArray: 0,
    },
    fill: {
      colors: ["#fb7c7c", "#00A4FF"],
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0,
      },
    },
    dataLabels: {
      offsetY: -4,
      formatter: (val) => val + "°",
      background: {
        enabled: false,
      },
      style: {
        fontSize: "12px",
        fontFamily: '"Comfortaa", cursive',
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      labels: { show: false },
    },
    grid: {
      show: false,
    },
  };

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        type: "category",
        categories:
          daily && daily.data
            ? daily.data.map((e) => {
                let date = new Date(e.dt * 1000);
                return `${date.getDate()} ${shortMonthName[date.getMonth()]}`;
              })
            : [],
        axisTicks: {
          show: false,
        },
        tickPlacement: "on",
        labels: {
          show: true,
          style: {
            colors: "#ffffff",
            fontFamily: '"Comfortaa", cursive',
            fontWeight: 800,
          },
        },
        axisBorder: {
          show: false,
        },
      },
    }));
  }, [daily]);

  const [options, setOptions] = useState(dailyChartOptions);

  useEffect(() => {
    setSeries([
      {
        name: "Baland",
        data:
          daily && daily.data
            ? daily.data.map((e) => Math.round(e.temp.day - 273.15))
            : [],
      },
      {
        name: "Past",
        data:
          daily && daily.data
            ? daily.data.map((e) => Math.round(e.temp.night - 273.15))
            : [],
      },
    ]);
  }, [daily]);

  const [series, setSeries] = useState([{}]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height="100%"
    />
  );
}

export default DailyChart;
