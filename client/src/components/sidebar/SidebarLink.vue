<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { collapsed } from "./state";

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    const icon = props.icon;
    return { isActive, collapsed, icon };
  },
};
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="material-symbols-outlined text-3xl p-2.5 ml-2"> {{ icon }}</i>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  font-size: 1.1em;
  user-select: none;

  margin: 0.5em 0;
  /* padding: 0.4em; */
  height: 4em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--bi_white_hover);
  color: black;
}

.link.active {
  background-color: var(--bi_white_active);
  color: black;
}

.link .icon {
  flex-shrink: 0;
  margin: 20px;
}
</style>