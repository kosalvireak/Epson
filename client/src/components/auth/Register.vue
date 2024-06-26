<template>
  <div>
    <!-- <Navbar></Navbar> -->
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
              Register to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              method="post"
              @submit.prevent="SubmitForm"
            >
              <!-- name -->
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Name</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="At least 5 Characters"
                  required=""
                  size="50"
                  maxlength="50"
                  v-model="name"
                />
              </div>
              <!-- email -->
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="A valid Email Address"
                  required=""
                  v-model="email"
                />
              </div>
              <!-- password -->
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  v-model="password"
                />
              </div>
              <!-- confirm_password -->
              <div>
                <label
                  for="confirm_password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  v-model="confirm"
                />
              </div>
              <!-- password check box -->
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

              <div class="alert alert-danger text-red-400" v-if="Errors">
                <i
                  class="fas fa-exclamation-circle"
                  style="font-size: 24px"
                ></i>
                <p>{{ Errors }}</p>
              </div>
              <div class="alert alert-danger text-black" v-else>
                <p>
                  Password Must contain at least one number, one uppercase , one
                  lowercase letter and 8 or more characters.
                </p>
              </div>
              <button
                style="background-color: #0e2f55"
                type="submit"
                class="w-full text-white bg-bi_lightblue hover:bg-sidebar-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center bi-flex"
              >
                <div class="w-full font-medium" v-if="!IsSendingRequest">
                  Change Info
                </div>
                <div class="loader text-center" v-else></div>
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?

                <router-link
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  to="/login"
                  >Login</router-link
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
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm: "",
      checked: false,
    };
  },
  watch: {
    checked() {
      if (this.checked) {
        password.type = "text";
        confirm_password.type = "text";
      } else {
        password.type = "password";
        confirm_password.type = "password";
      }
    },
  },
  computed: {
    ...mapGetters(["Errors", "IsSendingRequest"]),
  },
  mounted() {
    this.ClearAlert();
  },
  methods: {
    ...mapActions(["registerUser", "setAlert"]),
    ...mapMutations(["ClearAlert", "setIsSendingRequest"]),
    SubmitForm(e) {
      this.setIsSendingRequest(true);
      e.preventDefault();
      if (this.password != this.confirm) {
        this.setAlert("Confirm Password and Password do not match");
      } else {
        let user = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        this.registerUser(user);
      }
    },
  },
};
</script>

<style>
.invalid {
  color: red;
}

.valid {
  color: green;
}
</style>
