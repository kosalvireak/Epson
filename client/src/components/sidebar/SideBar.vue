<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>BI</div>
      </span>
      <span v-else>BI Board</span>
    </h1>

    <SidebarLink to="/admin/dashboard" icon="dashboard"> Dashboard</SidebarLink>
    <SidebarLink to="/admin/data" icon="database">Data</SidebarLink>
    <SidebarLink to="/admin/profile" icon="person">Profile</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <span class="material-symbols-outlined text-3xl"> arrow_back </span>
    </span>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
};
</script>

<style>
:root {
  --bi_lightblue: #0e2f55;
  --bi_darkblue: #0b2748;
  --bi_gray: #b2b6ba;
  --bi_gray_hover: #6e7073;
  --bi_white_hover: #f2f4f7;
  --bi_white_active: #e5e5e5;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--bi_lightblue);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
  font-size: 1.5em;
  text-align: left;
  padding: 20px;
  margin-bottom: 1rem;
  font-weight: 600;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>