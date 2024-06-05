<template>
  <div>
    <Header></Header>
    <div v-if="User">
      <h1 class="p-2">Welcome {{ User.name }} !!!</h1>
    </div>
  </div>
</template>

<script>
import { store, router } from "@/main";
import Header from "./Header.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: { Header },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadUser"]),
  },
  computed: {
    ...mapGetters(["User"]),
  },
  mounted() {
    if (localStorage.token) {
      this.loadUser();
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style></style>
