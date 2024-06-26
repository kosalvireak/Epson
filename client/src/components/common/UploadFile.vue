<template>
  <div class="UploadFile" @click.stop>
    <form @submit.prevent class="popup-body">
      <div class="formInstruction overflow-auto">
        <h3 class="text-xl">Instruction</h3>
        <ol>
          <li>- Title must set first and can't be over 50 characters.</li>
          <li>- Choose an Csv file that have only 2 Columns</li>
          <li>
            - First column name must be "names" and tha data of must be a Text.
          </li>
          <li>
            - Second column name must be "number" and tha data of must be a
            Number.
          </li>
          <li>- Preview will show after upload</li>
          <li>
            - If the data is not valid or empty the "{}" will show in the white
            box.
          </li>
        </ol>
      </div>
      <div class="divTitle">
        <input
          type="text"
          id="title"
          placeholder="Title of your csv"
          v-model="csvTitleValue"
          pattern="[A-Za-z0-9_ ]+"
          required
          class="input_field"
          size="50"
          maxlength="50"
        />
        <span class="error_message ellipsis" v-show="!isValidTitle">
          Please enter a valid title (alphanumeric characters and underscores
          only).
        </span>
      </div>

      <div class="divTitle">
        <input
          type="file"
          id="file"
          @change="handleFileChange"
          required
          class="input_field file text-black"
          accept=".csv"
          :disabled="isUploadDisabled"
        />
        <span class="error_message ellipsis" v-show="!isValidTitle">
          Please select only csv file
        </span>
      </div>
      <div class="upload_preview">
        {{ NewCsv }}
      </div>
      <button
        class="popup-upload-button"
        type="submit"
        @click="submitData()"
        :disabled="!isButtonDisabled"
        :class="{ 'btn-disable': !isButtonDisabled }"
      >
        Upload
      </button>
    </form>
  </div>
</template>

<script scoped>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "UploadFile",
  data() {
    return { isValidTitle: false, csvTitleValue: "" };
  },
  computed: {
    ...mapGetters(["CsvTitle", "NewCsv"]),
    isButtonDisabled() {
      let length = Object.keys(this.NewCsv).length;
      return this.isValidTitle && length > 1;
    },
    isUploadDisabled() {
      return this.csvTitleValue === "" || !this.isValidTitle;
    },
  },
  watch: {
    csvTitleValue(oldValue, newValue) {
      const regex = /^[A-Za-z0-9_ ]+$/;
      this.isValidTitle = regex.test(newValue);
      if (oldValue !== newValue) {
        this.addCsvTitle(this.csvTitleValue);
      }
    },
  },
  methods: {
    ...mapActions(["handleFileChange", "handleSubmit"]),
    ...mapMutations(["addCsvTitle", "clearNewCsvState"]),
    async submitData() {
      await this.handleSubmit();
      this.$emit("submitData");
    },
  },
};
</script>
<style scoped>
.popup {
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
.UploadFile {
  background: #e3e3e3;
  width: 50rem;
  width: auto;
  height: 38rem;
  border-radius: 15px;
  border-top-left-radius: 0;
  display: flex;
  flex-direction: column;
}

.popup-body {
  background-color: #1021353b;
  color: rgb(0, 0, 0);
  flex-grow: 1;
  margin: 0.5rem;
  text-decoration: none;
  height: auto;
  position: relative;
  border-radius: 9px;
}
.formInstruction {
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: bold;
  font-size: medium;
  /* overflow: scroll; */
}
.divTitle {
  height: 4.5rem;
}
.upload_preview {
  height: 10rem;
  overflow: auto;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 1rem;
}
.popup-upload-button {
  background-color: #f5f5f5;
  color: var(--bi_lightblue);
  padding: 0.7rem;
  position: absolute;
  right: 1rem;
  width: 6rem;
  border-radius: 15px;
  font-size: large;
  font-weight: 700;
}

.input_field {
  width: 100%;
  height: 3rem;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #e5e5e5;
}
.file {
  padding: 9px 0 0 12px;
}
.error_message {
  color: red;
}
.btn-disable {
  color: rgba(0, 0, 0, 0.1);
}
</style>