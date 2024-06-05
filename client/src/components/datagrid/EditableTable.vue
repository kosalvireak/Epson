<template>
  <div class="EditableTable_Container p-5 m-5">
    <p class="text-red-500">{{ Errors }}</p>
    <table class="w-full">
      <thead>
        <tr class="h-10">
          <th>Name</th>
          <th>Number</th>
          <th class="action">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <input v-model="item.name" type="text" :id="'name' + index" />
          </td>
          <td>
            <input v-model="item.number" type="text" :id="'number' + index" />
          </td>
          <td class="deleteButton">
            <button
              @click="deleteARow(index)"
              class="rounded bg-red-500 text-white w-20 h-10 p-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="w-full h-16 flex items-center justify-evenly text-black actionButton"
    >
      <button
        @click="addRow"
        class="rounded bg-blue-500 text-white w-20 h-10 m-4"
      >
        Add Row
      </button>
      <button
        @click="onClickDone"
        class="rounded bg-green-500 text-white w-20 h-10 m-4"
      >
        Done
      </button>
    </div>
  </div>
</template>
  <script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  name: "EditableTable",
  props: {
    columns: {
      type: Array,
    },
    columnNumbers: {
      type: Array,
    },
    data: {
      type: Array,
    },
    oneCsv: {
      type: Object,
    },
  },
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.oneCsv.names.forEach((name, index) => {
      this.items.push({
        name,
        number: this.oneCsv.numbers[index],
      });
    });
  },
  computed: {
    ...mapGetters(["Errors"]),
  },
  methods: {
    ...mapActions(["deleteRow", "saveTableData"]),

    deleteARow(index) {
      this.items.splice(index, 1);
      this.deleteRow(index);
    },
    onClickDone() {
      this.saveTableData(this.items);
    },
    addRow() {
      this.items.push({
        name: "",
        number: 0,
      });
    },
  },
});
</script>

<style scoped>
table {
  background-color: #f2f3f7;
  color: #606266;
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
th {
  padding-left: 12px;
}

.action {
  width: 6rem;
}
.deleteButton {
  padding-left: 0.5rem;
}
.delete {
  width: 100px;
}
input[type="text"] {
  font-size: 16px;
  padding: 12px;
  width: 100%;
  height: 3rem;
  background-color: rgb(255, 255, 255);
  text-align: left;
}
.btn-delete {
  background-color: #2195f380;
  color: rgb(28, 32, 32);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #2195f3d3;
}
.actionButton {
  background: #f3f4f7;
  border: 1px solid #dcdfe6;
}
</style>