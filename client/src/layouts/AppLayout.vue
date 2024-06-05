<template>
  <div class="AppLayout">
    <Header />
    <div class="App">
      <SideBar />
      <div class="router-view" :style="{ 'margin-left': sidebarWidth }">
        <router-view />
      </div>

      <UploadFile
        v-if="popupTriggers.buttonTrigger"
        :TogglePopup="() => TogglePopup()"
      />
    </div>
    <button
      class="upload_button bg-gray-200 button"
      v-if="showUploadButton"
      @click="TogglePopup()"
    >
      <span class="material-symbols-outlined text-3xl"> upload </span>
    </button>
  </div>
</template>
  
<script>
import { mapMutations } from "vuex";
import Header from "../components/common/Header.vue";
import SideBar from "../components/sidebar/SideBar.vue";
import UploadFile from "../components/common/UploadFile.vue";
import { ref } from "vue";
import { sidebarWidth } from "../components/sidebar/state";

export default {
  name: "AppLayout",
  components: { SideBar, UploadFile, Header },
  computed: {
    showUploadButton() {
      if (this.$route.name == "dashboard" || this.$route.name == "data") {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    const popupTriggers = {
      buttonTrigger: false,
    };
    return { popupTriggers };
  },
  methods: {
    ...mapMutations(["clearNewCsvState"]),
    TogglePopup() {
      this.popupTriggers.buttonTrigger = !this.popupTriggers.buttonTrigger;
      this.clearNewCsvState();
    },
  },
  setup() {
    return {
      UploadFile,
      sidebarWidth,
    };
  },
};
</script>
  
<style >
.AppLayout {
  width: auto;
  height: 100vh;
}
.App {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.router-view {
  background-color: #0b2748;
  color: #ffffff;
  transition: margin-left 0.2s ease-in-out;
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 250px;
  height: 100%;
  transition: width 0.2s ease-in-out;
  background-color: #0e2f55;
}

.sidebar.collapsed {
  width: 50px;
}

.router-view[style*="margin-left: 50px;"] {
  margin-left: 50px;
}

.upload_button {
  position: fixed;
  bottom: 4rem;
  right: 5rem;
  color: rgb(21, 67, 115);
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 100%;
  font-size: large;
}
</style>