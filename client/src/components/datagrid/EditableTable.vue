<template>
  <div class="EditableTable_Container">
    <p class="text-red-500">{{ Errors }}</p>

    <table class="w-full bi-text-darkgray">
      <thead>
        <tr class="h-10">
          <th>Name</th>
          <th>Number</th>
          <th class="w-24">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <input
              v-model="item.name"
              type="text"
              :id="'name' + index"
              placeholder=". . ."
            />
          </td>
          <td>
            <input
              v-model="item.number"
              type="text"
              :id="'number' + index"
              placeholder="0"
            />
          </td>
          <td class="bg-white">
            <button
              @click="deleteARow(index)"
              class="rounded bi-text-blue w-20 h-10 p-2 ml-2 bi-background-gray-nohover bi-red-transition-button"
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
        class="rounded bi-text-blue bi-background-gray w-20 h-10 m-4"
      >
        Add Row
      </button>
      <button
        @click="onClickDone"
        class="rounded bi-text-blue bi-background-gray w-20 h-10 m-4"
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
    oneCsv: {
      type: Object,
    },
    fromUpload: Boolean,
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
    ...mapActions(["deleteRow", "saveTableData", "createCsvTable", "setAlert"]),

    async deleteARow(index) {
      this.items.splice(index, 1);
      if (!this.fromUpload) {
        await this.deleteRow(index);
      }
    },
    async onClickDone() {
      if (this.fromUpload) {
        const res = await this.createCsvTable(this.items);
        if (res == true) {
          this.$emit("submitData");
        }
      } else {
        await this.saveTableData(this.items);
      }
    },
    addRow() {
      this.items.push({
        name: "",
        number: "",
      });
    },
  },
});
</script>

<style scoped>
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
th {
  padding-left: 12px;
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
.actionButton {
  background: #f3f4f7;
  border: 1px solid #dcdfe6;
}
</style>