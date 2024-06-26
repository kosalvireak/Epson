<template>
  <section class="DashBoardDetail">
    <div v-if="JSON.stringify(OneCsv) == '{}'">
      <Preloader :scale="0.8" />
    </div>
    <div
      v-else
      class="DashBoardDetail_Content bi-background-blue mt-4 rounded-2xl"
    >
      <div
        class="DashBoardDetail_Content_Header bg-white text-3xl bi-text-darkblue not-italic font-medium text-center leading-loose w-full flex h-20 p-2 rounded-3xl"
      >
        <span
          class="material-symbols-outlined lg:text-6xl md:text-3xl d-flex items-center justify-center min-w-min mr-4"
        >
          folder_open
        </span>
        <DashBoardDetailEditableText :text="OneCsv.title" />
        <div
          class="flex items-center justify-center delete aspect-square rounded-full bi-red-transition-button ml-2 p-2"
        >
          <span
            class="material-symbols-outlined p-0 m-0 text-3xl"
            @click="Delete()"
          >
            delete
          </span>
        </div>
      </div>

      <div class="white-container rounded-2xl">
        <input
          type="checkbox"
          name="checkBarChart"
          id="checkBarChart"
          v-model="OneCsv.displayedCharts.showBarChart"
          @click="onChangeDisplayedBarChart()"
        />
        <label for="checkBarChart">Show BarChart</label>

        <input
          type="checkbox"
          name="checkLineChart"
          id="checkLineChart"
          v-model="OneCsv.displayedCharts.showLineChart"
          @click="onChangeDisplayedLineChart()"
        />
        <label for="checkLineChart">Show LineChart</label>

        <input
          type="checkbox"
          name="checkPieChart"
          id="checkPieChart"
          v-model="OneCsv.displayedCharts.showPieChart"
          @click="onChangeDisplayedPieChart()"
        />
        <label for="checkPieChart">Show PieChart</label>

        <input
          type="checkbox"
          name="checkDoughnutChart"
          id="checkDoughnutChart"
          v-model="OneCsv.displayedCharts.showDoughnutChart"
          @click="onChangeDisplayedDoughnutChart()"
        />
        <label for="checkDoughnutChart">Show DoughnutChart</label>

        <div
          class="flex flex-wrap items-center justify-center lg:flex-row md:flex-col"
        >
          <BarChartWrapper
            :oneCsv="OneCsv"
            :backgroundColors="chartBackgroundColors"
            v-show="OneCsv.displayedCharts.showBarChart"
          />
          <LineChartWrapper
            :oneCsv="OneCsv"
            :backgroundColors="chartBackgroundColors"
            v-show="OneCsv.displayedCharts.showLineChart"
          />
          <DoughnutChartWrapper
            :oneCsv="OneCsv"
            :backgroundColors="chartBackgroundColors"
            v-show="OneCsv.displayedCharts.showDoughnutChart"
          />
          <PieChartWrapper
            :oneCsv="OneCsv"
            :backgroundColors="chartBackgroundColors"
            v-show="OneCsv.displayedCharts.showPieChart"
          />
        </div>
        <div class="m-4 ml-0">
          <button class="btn-sort bi-background-gray" @click="sortAscending()">
            Sort Ascending
          </button>
          <button class="btn-sort bi-background-gray" @click="sortDescending()">
            Sort Descending
          </button>
        </div>
      </div>
      <div class="white-container rounded-2xl">
        <DataInsight :numbersArray="OneCsv.numbers" />
      </div>
      <div class="white-container rounded-2xl">
        <button class="btn-sort bi-background-gray" @click="showEditTable">
          {{ isEditTableButtonText }}
        </button>
        <VueGoodTableWrapper v-if="!isEditTable" :oneCsv="OneCsv" />
        <EditableTable
          v-else
          :oneCsv="OneCsv"
          :fromUpload="false"
          class="p-5 m-5"
        />
      </div>
    </div>
  </section>
</template>

<script >
import { mapActions, mapGetters } from "vuex";
import VueGoodTableWrapper from "../components/datagrid/VueGoodTableWrapper.vue";
import BarChartWrapper from "../components/charts/BarChartWrapper.vue";
import DoughnutChartWrapper from "../components/charts/DoughnutChartWrapper.vue";
import LineChartWrapper from "../components/charts/LineChartWrapper.vue";
import PieChartWrapper from "../components/charts/PieChartWrapper.vue";
import DashBoardDetailEditableText from "../components/datagrid/DashBoardDetailEditableText.vue";
import Preloader from "../components/common/Preloader.vue";
import EditableTable from "../components/datagrid/EditableTable.vue";
import DataInsight from "../components/common/DataInsight.vue";
export default {
  name: "DashBoardDetail",
  components: {
    DataInsight,
    Preloader,
    BarChartWrapper,
    DoughnutChartWrapper,
    LineChartWrapper,
    DashBoardDetailEditableText,
    VueGoodTableWrapper,
    PieChartWrapper,
    EditableTable,
  },
  data() {
    let showChart = {};
    return {
      paramsId: this.$route.params.id,
      isEditTable: false,
      isEditTableButtonText: "Edit Table",
      showChart,
      chartBackgroundColors: [],
    };
  },
  methods: {
    ...mapActions([
      "getSpecificCsvById",
      "editCsv",
      "deleteCsv",
      "sortAscending",
      "sortDescending",
      "onChangeDisplayedLineChart",
      "onChangeDisplayedBarChart",
      "onChangeDisplayedPieChart",
      "onChangeDisplayedDoughnutChart",
    ]),
    Delete() {
      const data = {
        id: this.OneCsv._id,
        authorId: this.OneCsv.author,
      };
      this.deleteCsv(data);
      this.$router.go(-1);
    },

    showEditTable() {
      this.isEditTable = !this.isEditTable;
      if (this.isEditTable == false) {
        this.isEditTableButtonText = "Edit Table";
      } else {
        this.isEditTableButtonText = "Preview Table";
      }
    },
    randomColors() {
      this.chartBackgroundColors = [
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
      ];
    },
  },
  computed: {
    ...mapGetters(["OneCsv", "OneCsv.displayedCharts"]),
  },
  mounted() {
    this.getSpecificCsvById(this.paramsId);
    this.randomColors();
  },
};
</script>

<style  scoped>
.DashBoardDetail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
}
.DashBoardDetail_Content {
  width: 98%;
}
.btn-sort {
  width: max-content;
  height: max-content;
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  color: var(--darkblue);
}
.white-container {
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  margin: 2rem;
}
label {
  color: var(--darkblue);
  font-size: 1.2rem;
  margin: 0rem 1.5rem 0rem 0.4rem;
  margin-right: 2.5rem;
}
label:hover {
  background-color: var(--gray);
}

input[type="checkbox"] {
  padding: 1rem;
  transform: scale(1.5);
  accent-color: var(--blue);
}

.delete {
  width: 4.5rem !important;
  height: 4rem !important;
}
</style>