<template>
  <div>
    <div class="vue-good-table-wrapper">
      <vue-good-table
        :columns="csv.columns"
        :rows="csv.rows"
        :costum-theme="theme"
        :pagination-options="paginationOptions"
        :search-options="{
          enabled: true,
          trigger: 'enter',
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
      />
    </div>
  </div>
</template>

<script>
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";

export default {
  components: {
    VueGoodTable,
  },
  props: {
    oneCsv: {
      type: Object,
      required: true,
    },
    columns: {
      label: String,
      type: Array,
      width: Number,
    },
    rows: {
      type: Array,
    },
  },
  data() {
    return {
      csv: {
        columns: [],
        rows: [],
      },
      theme: {
        table: "table table-bordered table-striped table-hover",
        pagination: "pagination btn-group",
        paginationInfo: "float-start",
        dropdown: "form-select form-select-sm",
        search: "form-control form-control-sm",
      },
      paginationOptions: {
        enabled: true,
        perPage: 12,
        perPageDropdown: [5, 10, 20, 50],
      },
    };
  },
  watch: {
    oneCsv(newValue) {
      if (this.csv !== newValue) {
        this.csv = newValue;
        this.getTableData();
      }
    },
  },
  methods: {
    getTableData() {
      const names = this.oneCsv.names;
      const numbers = this.oneCsv.numbers;

      // Create an array of objects to represent the table rows
      const tableRows = names.map((name, index) => ({
        id: index,
        name,
        number: numbers[index],
      }));

      // Create an array of object to represent table columns
      const tableColumns = [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Number",
          field: "number",
        },
      ];

      this.csv.columns = tableColumns;
      this.csv.rows = tableRows;
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style scope>
.vue-good-table-wrapper {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f8f8;
}

.table-hover tbody tr:hover {
  background-color: #f2f2f2;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
  padding: 0.5rem;
}
</style>