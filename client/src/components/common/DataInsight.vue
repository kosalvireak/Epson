<template>
  <section class="DataInsight">
    <h1 class="text-2xl p-4 pl-0" @click="ClearDataInsight()">Data Insight</h1>
    <div>
      <table class="table-auto">
        <thead>
          <tr>
            <td class="font-bold">PARAMETER</td>
            <td class="font-bold">VALUE</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-32">Sum</td>
            <td class="w-32">{{ DataInsights.sum }}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{{ DataInsights.average }}</td>
          </tr>
          <tr>
            <td>Minimum</td>
            <td>{{ DataInsights.minimum }}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{{ DataInsights.median }}</td>
          </tr>
          <tr>
            <td>Maximum</td>
            <td>{{ DataInsights.maximum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "DataInsight",
  props: {
    numbersArray: {
      type: Object,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapGetters(["DataInsights"]),
  },
  methods: {
    ...mapActions(["getDataInsight"]),
    ...mapMutations(["ClearDataInsight"]),
  },
  mounted() {
    this.getDataInsight();
  },
};
</script>

<style scoped>
.DataInsight {
  color: var(--darkblue);
}
li {
  font-size: large;
}
table {
  background-color: #f2f4f7;
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid #dcdfe6;
  padding: 0px;
  height: 3rem;
  text-align: left;
  font-size: 16px;
}
td {
  padding-left: 12px;
}
</style>