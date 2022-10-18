import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

function HourlyChart() {
  const hourly = useSelector((state) => state.hourly);

  const hourlyChartOptions = {
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
          delay: 350,
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
      colors: ["#FFB3AA"],
      width: 1,
      dashArray: 0,
    },
    fill: {
      colors: ["#fb7c7c"],
      type: "gradient",
      gradient: {
        gradientToColors: ["#00A4FF"],
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0,
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
  };

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        type: "category",
        categories:
          hourly && hourly.data
            ? hourly.data
                .filter((e, i) => i < 24)
                .map((e) => {
                  let date = new Date(e.dt * 1000);
                  return `${date.getHours()}:00`;
                })
            : [],
        axisTicks: {
          show: false,
        },
        tickPlacement: "on",
        labels: {
          show: true,
          style: {
            colors: "#fff",
            fontFamily: '"Comfortaa", cursive',
            fontWeight: 800,
          },
        },
        axisBorder: {
          show: false,
        },
      },
    }));
  }, [hourly]);

  const [options, setOptions] = useState(hourlyChartOptions);

  useEffect(() => {
    setSeries([
      {
        name: "Baland",
        data:
          hourly && hourly.data
            ? hourly.data
                .filter((e, i) => i < 24)
                .map((e) => Math.round(e.temp - 273.15))
            : [],
      },
    ]);
  }, [hourly]);

  const [series, setSeries] = useState([{}]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      width="2000px"
      height="100%"
    />
  );
}

export default HourlyChart;
