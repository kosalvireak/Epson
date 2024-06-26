<template>
  <section class="flex flex-wrap items-center justify-center overflow-auto">
    <div v-if="Object.keys(AllCsvs).length == 0 || Errors">
      <div v-if="AllCsvsEmpty" class="text-xl mt-4">
        {{
          Errors || "You don't have any Csv. Please upload or create new table."
        }}
      </div>
      <Preloader :scale="0.8" v-else />
    </div>
    <div
      v-else
      v-for="csv in AllCsvs"
      :key="csv._id"
      class="VueGoodTableWrapper_loop m-4 bi-background-blue rounded-2xl"
    >
      <router-link :to="`/admin/dashboard/${csv._id}`">
        <h1 class="bi-text-white text-xl p-2 border ellipsis rounded-2xl">
          {{ csv.title }}
        </h1>
      </router-link>
      <div class="bi-background-white-nohover rounded-2xl m-2">
        <VueGoodTableWrapper :oneCsv="csv" />
      </div>
    </div>
  </section>
</template>
<script>
import VueGoodTableWrapper from "../components/datagrid/VueGoodTableWrapper.vue";
import BarChartWrapper from "../components/charts/BarChartWrapper.vue";
import Preloader from "../components/common/Preloader.vue";
import { onMounted } from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DataBoard",
  components: {
    Preloader,
    VueGoodTableWrapper,
    BarChartWrapper,
  },
  methods: {
    ...mapActions(["getAllCsvs", "GetVueGoodTableData"]),
  },
  computed: {
    ...mapGetters(["AllCsvs", "VueGoodTableData", "Errors", "AllCsvsEmpty"]),
  },
  mounted() {
    if (localStorage.token) {
      this.getAllCsvs();
    } else {
      this.$route.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
.vue-good-table-wrapper-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.vue-good-table-wrapper-container .vgt-table {
  width: 100%;
}

#sub-container {
  height: fit-content;
}
</style>