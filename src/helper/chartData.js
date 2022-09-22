import { shortMonthName } from "./date";

export const series = (e) => {
  let seriesData;
  if (e?.data) {
    seriesData = [
      {
        name: "Baland",
        data: e.data.map((e) => Math.round(e.temp.day - 273.15)),
      },
      {
        name: "Past",
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
    colors: ["#ffd8d8", "#8ed8ff"],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
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
      show: true,
      markers: {
        width: 12,
        height: 12,
        fillColors: ["#fb7c7c", "#00A4FF"],
        radius: 12,
      },
      labels: {
        colors: "#fff",
        useSeriesColors: true,
      },
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
          colors: "#fff",
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
