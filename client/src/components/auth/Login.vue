<template>
  <div>
    <section class="bg-dashboard-50 dark:bg-dashboard-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <a
          href="#"
          class="flex items-center mb-6 text-4xl font-semibold text-bi_white_active dark:text-white"
        >
          Business Intelligence
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Log in to your account {{ env }}
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              method="post"
              @submit.prevent="SubmitForm"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  v-model="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  placeholder="••••••••"
                  v-model="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="showpassword"
                  id="showpassword"
                  v-model="checked"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-4"
                />
                <label
                  for="showpassword"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Show Password</label
                >
              </div>
              <div class="alert alert-danger text-red-500" v-if="Errors">
                <i
                  class="fas fa-exclamation-circle"
                  style="font-size: 24px"
                ></i>
                <p>{{ Errors }}</p>
              </div>
              <button
                style="background-color: #0e2f55"
                type="submit"
                class="w-full text-white bg-bi_lightblue hover:bg-sidebar-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?
                <router-link
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  to="/register"
                  >Register</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      env: import.meta.env.VITE_VUE_APP_BACKEND_URL,
      email: "",
      password: "",
      checked: false,
    };
  },
  watch: {
    checked() {
      if (this.checked == true) {
        password.type = "text";
      } else {
        password.type = "password";
      }
    },
  },
  methods: {
    ...mapActions(["LoginUser", "setAlert"]),
    ...mapMutations(["ClearAlert"]),
    SubmitForm(e) {
      e.preventDefault();
      let user = {
        email: this.email,
        password: this.password,
      };
      this.LoginUser(user);
    },
  },
  computed: {
    ...mapGetters(["Errors", "User"]),
  },
  mounted() {
    this.ClearAlert();
  },
};
</script>

<style></style>
