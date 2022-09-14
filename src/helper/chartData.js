import { shortMonthName } from "./date";

export const series = (e) => {
  let seriesData;
  if (e?.data) {
    seriesData = [
      {
        name: "yuqori",
        data: e.data.map((e) => Math.round(e.temp.day - 273.15)),
      },
      {
        name: "past",
        data: e.data.map((e) => Math.round(e.temp.night - 273.15)),
      },
    ];
  } else {
    seriesData = [];
  }
  return seriesData;
};

export const xaxisCategories = (e) => {
  let xaxisCategoriesData;
  if (e?.data) {
    xaxisCategoriesData = e.data.map((e) => {
      let date = new Date(e.dt * 1000);
      return `${date.getDate()} ${shortMonthName[date.getMonth()]}`;
    });
  } else {
    xaxisCategoriesData = [];
  }
  return xaxisCategoriesData;
};

export const options = (callback) => {
  return {
    colors: ["#000"],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    markers: {
      size: 2,
      strokeWidth: 0,
      shape: "circle",
      radius: 2,
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
      colors: ["rgba(255, 100, 100, 1)", "#00A4FF"],
      shade: "light",
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 1,
        opacityTo: 0.1,
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
    xaxis: {
      type: "category",
      categories: callback,
      axisTicks: {
        show: false,
      },
      tickPlacement: "on",
      labels: {
        show: true,
        style: {
          fontFamily: '"Comfortaa", cursive',
          fontWeight: 800,
        },
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
    grid: {
      show: false,
    },
  };
};
