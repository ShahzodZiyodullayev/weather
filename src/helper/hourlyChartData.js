import { shortMonthName } from "./date";

export const hourlySeries = (e) => {
  let seriesData;
  if (e?.data) {
    seriesData = [
      {
        name: "Baland",
        data: e.data
          .filter((e, i) => i < 24)
          .map((e) => Math.round(e.temp - 273.15)),
      },
    ];
  } else {
    seriesData = [];
  }
  return seriesData;
};

export const hourlyXaxisCategories = (e) => {
  let xaxisCategoriesData;
  if (e?.data) {
    xaxisCategoriesData = e.data
      .filter((e, i) => i < 24)
      .map((e) => {
        let date = new Date(e.dt * 1000);
        return `${date.getHours()}:00`;
      });
  } else {
    xaxisCategoriesData = [];
  }
  return xaxisCategoriesData;
};

export const hourlyOptions = (callback) => {
  return {
    colors: ["#fff"],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      offsetX: 5,
      offsetY: -10,
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
