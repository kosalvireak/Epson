<template>
  <div>
    <Line :data="chartjsdata" :options="chartOptions" />
  </div>
</template>
  
  <script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import * as chartConfig from "./LinechartConfig.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Line,
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
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
            hoverBorderColor: "rgba(54, 162, 235, 1)",
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
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: "Line Chart",
            font: {
              size: 18,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontSize: 14,
              fontColor: "black",
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              // text: "Brand",
              color: "#000",
              font: {
                size: 20,
                weight: "bold",
                lineHeight: 1,
              },
              padding: { top: 0, left: 0, right: 10, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              // text: "Market Cap",
              color: "#191",
              font: {
                size: 20,
                lineHeight: 3,
              },
              padding: { top: 0, left: 0, right: 10, bottom: 0 },
            },
          },
        },
      };
    },
  },
};
</script>
<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
}
</style>