<template>
  <div class="UploadPortal" @click="closePopup">
    <div class="UploadPortal_container">
      <div class="UploadPortal_header">
        <h1>Choose which method to create your CSV</h1>
        <button
          class="popup-close bi-red-transition-button"
          @click="this.TogglePopup()"
        >
          <i class="material-symbols-outlined"> close </i>
        </button>
      </div>
      <div class="UploadPortal_body">
        <button
          class="p-2 text-black w-40 border-top"
          :class="{ 'bg-gray-200': isShowUpload, 'bg-gray-400': isShowTable }"
          @click="showUpload"
        >
          Upload
        </button>
        <button
          class="p-2 text-black w-40 border-top"
          :class="{ 'bg-gray-200': isShowTable, 'bg-gray-400': isShowUpload }"
          @click="showTable"
        >
          Table
        </button>
        <UploadFile v-if="isShowUpload" @submitData="this.TogglePopup()" />
        <div v-if="isShowTable" class="p-2 Table_container">
          <div class="formInstruction overflow-auto">
            <h3 class="text-xl">Instruction</h3>
            <ol>
              <li>- Column "Name" must be a Text.</li>
              <li>- Column "Number" must be a Number.</li>
              <li>- Default title "Untitled document".</li>
            </ol>
          </div>
          <EditableTable
            :oneCsv="newCsv"
            :fromUpload="true"
            @submitData="this.TogglePopup()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from "./UploadFile.vue";
import EditableTable from "../datagrid/EditableTable.vue";
export default {
  name: "UploadPortal",
  props: ["TogglePopup"],
  data() {
    return {
      newCsv: {
        names: [""],
        numbers: [""],
      },
      isShowUpload: true,
      isShowTable: false,
    };
  },
  components: { EditableTable, UploadFile },
  methods: {
    closePopup(event) {
      if (!event.target.closest(".UploadPortal_container")) {
        this.TogglePopup();
      }
    },
    showUpload() {
      this.isShowUpload = true;
      this.isShowTable = false;
    },
    showTable() {
      this.isShowTable = true;
      this.isShowUpload = false;
    },
  },
};
</script>

<style>
.UploadPortal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  color: #0b2748;
}
.UploadPortal_container {
  background: #b2b6ba;
  width: 60rem;
  height: 44.5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}
.UploadPortal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  margin: 0.5rem;
  border-bottom: 1px solid rgb(0, 0, 0);
}
.UploadPortal_header h1 {
  font-size: larger;
  color: black;
}
.popup-close {
  background-color: whitesmoke;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-bottom: 7px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.UploadPortal_body {
  height: 42rem;
}

.border-top {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

.Table_container {
  background: #e3e3e3;
  width: 50rem;
  width: auto;
  height: 38rem;
  border-radius: 15px;
  border-top-left-radius: 0;
  display: flex;
  overflow: auto;
  flex-direction: column;
}
.formInstruction {
  height: 6.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: bold;
  font-size: medium;
  background-color: #b2b6ba;
  color: black;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>