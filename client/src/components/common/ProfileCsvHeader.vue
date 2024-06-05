<template>
  <div class="ProfileCsvHeader container">
    <router-link
      :to="`/admin/dashboard/${id}`"
      class="m-0 p-0 flex justify-center items-center w-5/6"
    >
      <div class="flex flex-row justify-center items-center w-full">
        <span class="material-symbols-outlined text-5xl pr-2 w-1/5">
          folder
        </span>
        <div class="popup_header overflow-hidden pl-1 w-4/5 h-16">
          <h2 class="font-bold ellipsis h-2/4">{{ title }}</h2>
          <h3 class="h-2/4 ellipsis">Uploaded: {{ getDate() }}</h3>
        </div>
      </div>
    </router-link>
    <button class="w-1/6" @click="Delete()">
      <span class="material-symbols-outlined button"> delete </span>
    </button>
  </div>
</template>
  
  <script>
import { getDateUtils } from "../../utils";
import { mapActions } from "vuex";
export default {
  name: "ProfileCsvHeader",
  props: {
    id: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteCsv"]),
    Delete() {
      const data = {
        id: this.id,
        authorId: this.author,
      };
      this.deleteCsv(data);
    },
    getDate() {
      return getDateUtils(this.uploadDate, true, false);
    },
  },
};
</script>
  
  <style scoped>
.container {
  display: flex;
  background-color: rgba(21, 67, 115, 0.3);
  height: 5rem;
  width: 20rem;
  padding: 10px;
  margin: 10px;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  border-radius: 15px;
}
.title {
  text-overflow: ellipsis;
}
.button {
  padding: 5px;
  border-radius: 15px;
}
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
  