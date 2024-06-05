<template>
  <section class="Header navbar flex">
    <div
      class="flex text-white items-center justify-items-start name_field hover:bg-gray-500 dropdown rounded-full margin-0"
      v-if="User"
    >
      <div class="flex items-center justify-items-start margin-0">
        <img
          class="w-12 h-12 rounded-full mx-auto text-center mr-1 object-cover"
          :src="User.image"
          alt="User Profile Image"
        />
        <h3>Hello {{ User.name }}!</h3>
        <i class="material-symbols-outlined"> arrow_drop_down </i>
      </div>
      <div
        class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dropdown-content"
      >
        <ul
          class="py-2 text-md text-gray-700 dark:text-gray-200 items-center"
          aria-labelledby="dropdownDefaultButton"
        >
          <li
            class="flex margin-0 items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white justify-start"
            @click="toProfile"
          >
            <i class="material-symbols-outlined"> person </i>
            <a> Profile</a>
          </li>
          <li
            class="flex margin-0 items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white justify-start"
            @click="Logout"
          >
            <i class="material-symbols-outlined"> logout </i>
            <a href="#"> Logout</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>Hello</div>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "Navbar",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["Logout"]),
    ...mapActions(["loadUser"]),
    toProfile() {
      this.$router.push({ path: "/admin/profile" });
    },
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


<style scoped>
.navbar {
  background-color: var(--bi_lightblue);
  width: 100%;
  height: 5.25rem;
}

.flex {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-content: center;
}
.popup-upload-button {
  background-color: #f5f5f5;
  padding: 0.7rem;
  width: 6rem;
  height: 3rem;
  border-radius: 15px;
  font-size: large;
  font-weight: 700;
  color: black;
  margin-right: 2rem;
}

.dropdown {
  position: absolute;
  right: 4rem;
}

.margin-0 {
  margin: 0px !important;
}

.min-width-150px {
  min-width: 150px;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.justify-start {
  justify-content: start;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
