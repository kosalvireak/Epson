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
        Plot Graph
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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
            <div class="alert alert-danger text-red-500" v-if="Errors">
              <i class="fas fa-exclamation-circle" style="font-size: 24px"></i>
              <p>{{ Errors }}</p>
            </div>
            <div class="alert alert-danger text-black" v-else>
              <p>Enter your valid Email Address</p>
              <p>After Admin reset. You will receive your new password.</p>
            </div>
            <button
              style="background-color: #0e2f55"
              type="submit"
              @click="sendMail"
              class="w-full text-white bg-bi_lightblue hover:bg-sidebar-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center bi-flex"
            >
              <div class="w-full font-medium" v-if="!IsSendingRequest">
                Request
              </div>
              <div class="loader text-center" v-else></div>
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Back to Login?
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                to="/login"
                >Login</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ResetPassword",
  data() {
    return {
      env: import.meta.env.VITE_VUE_APP_BACKEND_URL,
      email: "",
    };
  },
  methods: {
    ...mapActions(["setAlert", "resetPassword"]),
    ...mapMutations(["ClearAlert", "setIsSendingRequest"]),
    sendMail() {
      const user = {
        email: this.email,
      };
      this.setIsSendingRequest(true);
      this.resetPassword(user);
    },
  },
  computed: {
    ...mapGetters(["Errors", "IsSendingRequest"]),
  },
  mounted() {
    this.ClearAlert();
  },
};
</script>

<style></style>
