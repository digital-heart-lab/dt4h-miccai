// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from "echarts/charts";
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
// 基于准备好的dom，初始化echarts实例
var chartDom = document.getElementById("chartWrapAudience");
var myChart = echarts.init(chartDom);
var option;

option = {
  textStyle: {
    color: "#eee",
    fontSize: 16,
  },
  xAxis: {
    name: "Stage",
    type: "category",
    boundaryGap: false,
    data: [
      "Opening",
      "Keynote 1",
      "Oral Session 1 (1)",
      "Oral Session 1 (2)",
      "Oral Session 1 (3)",
      "Oral Session 1 (4)",
      "Keynote 2",
      "Sponser Session",
      "Poster/Coffee Break",
      "Oral Session 2 (1)",
      "Oral Session 2 (2)",
      "Oral Session 2 (3)",
      "Oral Session 2 (4)",
      "Keynote 3",
      "Awrad",
    ],
    splitLine: {
      show: true, // 开启分割线
      lineStyle: {
        color: "#555",
        type: "dashed", // 可选：solid, dashed, dotted
      },
    },
    axisLabel: {
      rotate: 45,
      interval: 0, //（可选）强制显示所有标签
      color: "#aaa",
    },
    axisTick: {
      show: true, // 显示刻度线
      alignWithLabel: true, //（可选）让刻度线与标签对齐
      length: 6, //（可选）刻度线长度
      lineStyle: {
        // color: "#333", //（可选）刻度线颜色
        width: 1,
      },
    },
  },
  yAxis: {
    max: 80,
    name: "Number of attendees",
    type: "value",
    interval: 10, // 每 10 显示一个刻度
    axisTick: {
      show: true,
    },
    axisLabel: {
      show: true,
      color: "#aaa",
    },
    splitLine: {
      show: true, // 开启分割线
      lineStyle: {
        color: "#555",
        type: "dashed", // 可选：solid, dashed, dotted
      },
    },
  },
  series: [
    {
      data: [30, 70, 65, 64, 62, 55, 45, 23, 20, 30, 33, 35, 38, 42, 35],
      type: "line",
      smooth: true,
      areaStyle: {},
    },
  ],
};

option && myChart.setOption(option);
