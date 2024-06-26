<template>
  <div class="Dashboard_Container_Wrapper rounded-2xl">
    <div class="popup_header w-auto overflow-hidden">
      <h2 class="w-5/6 ellipsis">{{ title }}</h2>
      <button
        class="popup-close w-1/6 bi-red-transition-button"
        @click="Delete()"
      >
        Delete
      </button>
    </div>
    <div class="popup-body">
      <div class="popup-body-content ellipsis-container rounded-2xl">
        <router-link :to="`/admin/dashboard/${id}`">
          <h3><b>Upload Date: </b>{{ getDate() }}</h3>
          <h3><b>Column Name:</b> {{ names }}</h3>
          <h3 style="overflow: visible"><b>Column Number:</b> {{ numbers }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateUtils } from "../../utils";
import { mapActions } from "vuex";
export default {
  name: "Dashboard_Container_Wrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: String,
      required: true,
    },
    names: {
      type: Array,
      required: true,
    },
    numbers: {
      type: Array,
      required: true,
    },
    author: {
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
      return getDateUtils(this.uploadDate, false, true);
    },
  },
};
</script>

<style scoped>
.Dashboard_Container_Wrapper {
  display: flex;
  background-color: rgba(21, 67, 115, 0.3);
  height: 26rem;
  width: 38rem;
  padding: 0px;
  margin: 0px 10px 20px 10px;
  flex-direction: column;
  color: white;
}

.popup_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  margin: 0.5rem;
  border-bottom: 1px solid whitesmoke;
}
.popup_header h2 {
  font-size: large;
}

.popup-close {
  background-color: whitesmoke;
  width: 6rem;
  height: 2rem;
  color: #0b2748;
  border: none;
  border-radius: 30px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.popup-body {
  color: rgba(0, 0, 0, 0.875);
  flex-grow: 1;
  height: 22rem;
  margin: 0.5rem;
  text-decoration: none;
}
.popup-body-content {
  background-color: white;
  height: 21rem;
  padding: 0.5rem;
  width: auto;
  font-size: larger;
}
</style>
