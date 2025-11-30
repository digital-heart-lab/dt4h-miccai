// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from "echarts/charts";
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  LegendComponent,
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
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
// 基于准备好的dom，初始化echarts实例
const chartDom = document.getElementById("chartWrapPosition");
const myChart = echarts.init(chartDom);

const option = {
  textStyle: {
    color: "#eee",
    fontSize: 16,
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
  },
  legend: {
    left: "center",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "rgba(34,34,34,34)",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
          textStyle: {
            color: "#eee",
          },
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 5, name: "Industry Lead/Head" },
        { value: 16, name: "Academic Faculty" },
        { value: 5, name: "Postdoc" },
        { value: 28, name: "PhD Student" },
        { value: 5, name: "Master/Bachelor" },
      ],
    },
  ],
};

myChart.setOption(option);
