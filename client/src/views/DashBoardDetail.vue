<template>
  <section class="DashBoardDetail">
    <div v-if="JSON.stringify(OneCsv) == '{}'">
      <Preloader :scale="0.8" />
    </div>
    <div v-else class="DashBoardDetail_Content bg-bi_lightblue mt-4">
      <div
        class="DashBoardDetail_Content_Header bg-bi_white_active text-3xl text-bi_lightblue not-italic font-medium text-center leading-loose w-full d-inline h-28 p-2"
      >
        <span
          class="material-symbols-outlined lg:text-6xl md:text-3xl d-flex items-center justify-center min-w-min mr-4"
        >
          folder_open
        </span>
        <DashBoardDetailEditableText :text="OneCsv.title" />
        <div
          class="flex items-center justify-center delete aspect-square rounded-full button ml-2 p-2"
        >
          <span
            class="material-symbols-outlined p-0 m-0 text-3xl"
            @click="Delete()"
          >
            delete
          </span>
        </div>
      </div>

      <div class="white-container">
        <input
          type="checkbox"
          name="checkBarChart"
          id="checkBarChart"
          v-model="showChart.showBarChart"
        />
        <label for="checkBarChart">Show BarChart</label>

        <input
          type="checkbox"
          name="checkLineChart"
          id="checkLineChart"
          v-model="showChart.showLineChart"
        />
        <label for="checkLineChart">Show LineChart</label>

        <input
          type="checkbox"
          name="checkPieChart"
          id="checkPieChart"
          v-model="showChart.showPieChart"
        />
        <label for="checkPieChart">Show PieChart</label>

        <input
          type="checkbox"
          name="checkDoughnutChart"
          id="checkDoughnutChart"
          v-model="showChart.showDoughnutChart"
        />
        <label for="checkDoughnutChart">Show DoughnutChart</label>

        <div class="flex flex-wrap items-center justify-center">
          <BarChartWrapper :oneCsv="OneCsv" v-show="showChart.showBarChart" />
          <LineChartWrapper :oneCsv="OneCsv" v-show="showChart.showLineChart" />
          <DoughnutChartWrapper
            :oneCsv="OneCsv"
            v-show="showChart.showDoughnutChart"
          />
          <PieChartWrapper :oneCsv="OneCsv" v-show="showChart.showPieChart" />
        </div>
        <div class="m-4 ml-0">
          <button class="btn-sort" @click="sortAscending()">
            Sort Ascending
          </button>
          <button class="btn-sort" @click="sortDescending()">
            Sort Descending
          </button>
        </div>
      </div>
      <div class="white-container">
        <button class="btn-sort" @click="showEditTable">
          {{ isEditTableButtonText }}
        </button>
        <VueGoodTableWrapper v-if="!isEditTable" :oneCsv="OneCsv" />
        <EditableTable v-else :oneCsv="OneCsv" />
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
export default {
  name: "DashBoardDetail",
  components: {
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
    let showChart = {
      showBarChart: true,
      showLineChart: false,
      showPieChart: true,
      showDoughnutChart: false,
    };
    return {
      paramsId: this.$route.params.id,
      isEditTable: false,
      isEditTableButtonText: "Edit Table",
      showChart,
    };
  },
  methods: {
    ...mapActions([
      "getSpecificCsvById",
      "editCsv",
      "deleteCsv",
      "sortAscending",
      "sortDescending",
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
  },
  computed: {
    ...mapGetters(["OneCsv"]),
  },
  mounted() {
    this.getSpecificCsvById(this.paramsId);
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
.vue-good-table-wrapper {
  padding: 0;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
  background-color: rgb(170, 170, 165);
  color: rgb(47, 47, 53);
}
.white-container {
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  margin: 2rem;
}
.d-inline {
  display: flex;
  width: 100%;
}
label {
  color: black;
  font-size: 1.2rem;
  margin: 0rem 1.5rem 0rem 0.4rem;
}
input[type="checkbox"] {
  padding: 1rem;
  transform: scale(1.5);
}
.delete {
  width: 4.5rem !important;
  height: 4rem !important;
}
</style>