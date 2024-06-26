<template>
  <section
    class="DashBoard flex flex-wrap items-center justify-center overflow-auto mt-4"
  >
    <div v-if="Object.keys(AllCsvs).length == 0 || Errors">
      <div v-if="AllCsvsEmpty" class="text-xl">
        {{
          Errors || "You don't have any Csv. Please upload or create new table."
        }}
      </div>
      <Preloader :scale="0.8" v-else />
    </div>
    <div v-else v-for="csv in AllCsvs" :key="csv._id">
      <DashBoardContainerWrapper
        :id="csv._id || emptyString"
        :title="csv.title || emptyString"
        :uploadDate="csv.upload || emptyString"
        :names="csv.names || emptyString"
        :numbers="csv.numbers || emptyString"
        :author="csv.author || emptyString"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Preloader from "../components/common/Preloader.vue";
import DashBoardContainerWrapper from "../components/datagrid/DashBoardContainerWrapper.vue";
export default {
  name: "DashBoard",
  components: {
    Preloader,
    DashBoardContainerWrapper,
  },
  data() {
    return { emptyString: "" };
  },
  methods: {
    ...mapActions(["getAllCsvs"]),
  },
  computed: {
    ...mapGetters(["Errors", "AllCsvsEmpty", "AllCsvs"]),
  },
  mounted() {
    if (localStorage.token) {
      this.getAllCsvs();
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>



