<template>
  <div>
    <Bar :data="chartjsdata" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Bar,
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
            text: "Bar Chart",
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
              color: "#911",
              font: {
                size: 20,
                weight: "bold",
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
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
                lineHeight: 1.2,
              },
              padding: { top: 30, left: 0, right: 0, bottom: 0 },
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