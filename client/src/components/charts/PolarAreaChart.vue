<template>
  <PolarArea :data="chartjsdata" :options="chartOptions" />
</template>
  
  <script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "vue-chartjs";
import * as chartConfig from "./PolarAreachartConfig.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    PolarArea,
  },
  props: {
    oneCsv: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { chartjsdata: {} };
  },
  watch: {
    oneCsv(newValue) {
      if (this.csv !== newValue) {
        this.csv = newValue;
        this.getChartJsData();
      }
    },
  },
  methods: {
    getChartJsData() {
      const chartData = {
        labels: this.oneCsv.names,
        datasets: [
          {
            label: this.oneCsv.title,
            data: this.oneCsv.numbers,
            // backgroundColor: "rgba(54, 162, 235, 0.2)",
            // borderColor: "rgba(54, 162, 235, 1)",
            // borderWidth: 1,
            // hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
            // hoverBorderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };
      this.chartjsdata = chartData;
    },
  },
  created() {
    this.getChartJsData();
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true, // Set this to false to make the chart smaller
        // plugins: {
        //   title: {
        //     display: true,
        //     text: "Pie Chart",
        //     font: {
        //       size: 18,
        //       weight: "bold",
        //     },
        //   },
        //   legend: {
        //     display: true,
        //     position: "bottom",
        //     labels: {
        //       fontSize: 14,
        //       fontColor: "black",
        //     },
        //   },
        // },
        // scales: {
        //   x: {
        //     display: true,
        //     title: {
        //       display: true,
        //       // text: "Brand",
        //       font: {
        //         size: 20,
        //         weight: "bold",
        //         lineHeight: 1.2,
        //       },
        //       padding: { top: 20, left: 0, right: 0, bottom: 0 },
        //     },
        //   },
        //   y: {
        //     display: true,
        //     title: {
        //       display: true,
        //       // text: "Market Cap",
        //       font: {
        //         size: 20,
        //         lineHeight: 1.2,
        //       },
        //       padding: { top: 30, left: 0, right: 0, bottom: 0 },
        //     },
        //   },
        // },
      };
    },
  },
};
</script>
  