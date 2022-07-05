export const options = {
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
