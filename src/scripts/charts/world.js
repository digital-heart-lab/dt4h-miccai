import * as echarts from "echarts";
import worldJson from "./world.json"; // ← 直接导入

echarts.registerMap("world", worldJson);

const countries = [
  "United Kingdom",
  "Germany",
  "United States",
  "China",
  "South Korea",
  "Singapore",
  "Denmark",
  "Switzerland",
  "Netherlands",
  "Brazil",
  "Austria",
  "Italy",
  "France",
  "Japan",
  "Spain",
  "Finland",
  "Australia",
  "Unspecified",
];
const counts = [8, 6, 6, 5, 4, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2];

const countryParticipants = countries
  .map((c, i) => ({
    name: c,
    value: counts[i],
  }))
  .toSorted((a, b) => b.value - a.value);

// 初始化图表
const chartDom = document.getElementById("chartWrapWorld");
const chart = echarts.init(chartDom);

var option = {
  geo: {
    itemStyle: {
      areaColor: "rgba(255, 255, 255, 0.08)", // 🌟 未被着色国家的默认底色
      borderColor: "#ffffff34",
    },
    map: "world",
    roam: true,
    scaleLimit: {
      min: 1, // 最小缩放倍数
      max: 5, // 最大缩放倍数
    },
    emphasis: {
      label: {
        show: true,
        color: "#d1d1d1ff",
      },
      itemStyle: {
        areaColor: "rgba(255, 255, 255, 0.33)",
      },
    },
  },

  // 颜色区间：值越大颜色越深
  visualMap: {
    min: 0,
    max: Math.max(...counts),
    left: 10,
    bottom: 10,
    calculable: true,
    inRange: {
      color: ["#ffb30087", "#ff5100ff"],
    },
  },

  tooltip: {
    backgroundColor: "rgba(50, 50, 50, 0.9)", // 背景色（支持透明）
    borderColor: "#333", // 边框颜色
    borderWidth: 1, // 边框宽度
    padding: 10, // 内边距
    textStyle: {
      color: "#fff", // 文字颜色
      fontSize: 14, // 字体大小
      fontWeight: "normal", // 字重
    },
    extraCssText: "border-radius: 8px;",
    formatter: function (params) {
      return `${params.name}: ${params.value || 0}`;
    },
  },

  series: [
    {
      name: "Participants",
      type: "map",
      geoIndex: 0,
      map: "world",
      data: countryParticipants,
    },
  ],

  graphic: [
    {
      type: "text",
      right: 10,
      top: "center",
      bottom: 10, // 距离底部 10 像素
      silent: true, // 不拦截鼠标事件，让地图仍可点击
      style: {
        text: countryParticipants
          .map((item) => `${item.name}: ${item.value}`)
          .join("\n"),
        fontSize: 11,
        fontFamily: "sans-serif",
        fill: "#aaa", // 文字颜色
        lineHeight: 16,
        align: "left", // 居中对齐
      },
    },
  ],
};

chart.setOption(option);
