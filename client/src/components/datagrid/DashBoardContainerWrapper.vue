<template>
  <div class="Dashboard_Container_Wrapper">
    <div class="popup_header w-auto overflow-hidden">
      <h2 class="w-4/5 ellipsis">{{ title }}</h2>
      <button class="popup-close w-1/5 button" @click="Delete()">
        Delete Csv
      </button>
    </div>
    <div class="popup-body">
      <div class="popup-body-content ellipsisContainer">
        <router-link :to="`/admin/dashboard/${id}`">
          <!-- <h3 class="ellipsis"><b>Filename:</b> {{ fileName }}</h3>
          <h3 class="ellipsis"><b>Upload Date: </b>{{ getDate() }}</h3>
          <h3 class="ellipsis"><b>Column Name:</b> {{ names }}</h3>
          <h3 class="ellipsis"><b>Column Number:</b> {{ numbers }}</h3>
          <h3 class="ellipsis"><b>Author:</b> {{ author }}</h3> -->
          <h3><b>Upload Date: </b>{{ getDate() }}</h3>
          <h3><b>Column Name:</b> {{ names }}</h3>
          <h3 style="overflow: visible"><b>Column Number:</b> {{ numbers }}</h3>
          <h3><b>Author:</b> {{ author }}</h3>
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

.button:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #a29bfe;
}

.button:hover {
  background-color: #c70039;
  color: white;
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
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ellipsisContainer {
  overflow: overlay;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
