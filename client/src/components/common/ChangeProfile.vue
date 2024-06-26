<template>
  <div class="max-w-md m-4">
    <!-- image -->
    <form
      class="space-y-4 md:space-y-6"
      method="post"
      @submit.prevent="SubmitForm"
    >
      <div class="flex 2xl:flex-row sm:flex-col">
        <div
          class="w-44 h-44 rounded-full mx-auto text-center object-cover flex items-center justify-center border-2"
        >
          <img
            v-if="prevImage"
            :src="prevImage"
            class="w-40 h-40 rounded-full mx-auto text-center object-cover border-2"
            alt="User Profile Image"
          />
          <p v-else>Your image will preview here.</p>
        </div>
      </div>
      <div class="border-solid border-2 rounded-2xl p-3">
        <div>
          <label for="name" class="block mb-2 text-md font-medium bi-text-white"
            >Choose Images</label
          >
          <input
            class="form-control bi-background-white border border-gray-300 text-black text-md rounded-lg w-full p-2"
            type="file"
            id="image"
            name="image"
            @change="handleImageChange"
          />
        </div>
        <!-- name -->
        <div>
          <label for="name" class="block mb-2 text-md font-medium bi-text-white"
            >Name</label
          >
          <input
            type="text"
            name="name"
            size="50"
            maxlength="50"
            id="name"
            class="bi-background-white border border-gray-300 text-black text-md rounded-lg w-full p-2.5"
            v-model="name"
          />
        </div>
        <!-- email -->
        <div>
          <label
            for="email"
            class="block mb-2 text-md font-medium bi-text-white"
            >Email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bi-background-white border border-gray-300 text-black text-md rounded-lg w-full p-2.5"
            v-model="User.email"
          />
        </div>
        <!-- password -->
        <div>
          <label
            for="password"
            class="block mb-2 text-md font-medium bi-text-white"
            >Old Password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
            class="bi-background-white border border-gray-300 text-black text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            v-model="oldPassword"
          />
        </div>
        <!-- confirm_password -->
        <div>
          <label
            for="confirm_password"
            class="block mb-2 text-md font-medium bi-text-white"
            >New Password</label
          >
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="••••••••"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
            class="bi-background-white border border-gray-300 text-black text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required=""
            v-model="newPassword"
          />
        </div>
        <!-- password check box -->
        <div class="mt-2">
          <input
            type="checkbox"
            name="showpassword"
            id="showpassword"
            v-model="checked"
            class="bi-background-white border border-gray-300 bi-text-white text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
          />
          <label
            for="showpassword"
            class="ml-2 text-md font-medium bi-text-white"
            >Show Password</label
          >
        </div>

        <div class="alert alert-danger text-red-500" v-if="Errors">
          <i class="fas fa-exclamation-circle" style="font-size: 24px"></i>
          <p>{{ Errors }}</p>
        </div>
        <div class="alert alert-danger text-lg text-white my-2" v-else>
          <p>
            Password Must contain at least one number and one uppercase and
            lowercase letter, and at least 8 or more characters.
          </p>
        </div>
        <button
          type="submit"
          :disabled="IsSendingRequest"
          class="w-full text-black font-medium rounded-lg text-lg px-5 py-2.5 text-center bi-background-gray bi-flex"
        >
          <div class="w-full font-medium" v-if="!IsSendingRequest">
            Change Info
          </div>
          <div class="loader text-center" v-else></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ChangeProfile",
  data() {
    return {
      image: {},
      prevImage: "",
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      checked: false,
    };
  },
  mounted() {
    this.name = this.User.name;
    this.prevImage = this.User.image;
    this.email = this.User.email;
  },
  computed: {
    ...mapGetters(["Errors", "User", "IsSendingRequest"]),
  },
  methods: {
    ...mapActions(["updateUser", "setAlert"]),
    ...mapMutations(["ClearAlert", "setIsSendingRequest"]),
    SubmitForm(e) {
      this.setIsSendingRequest(true);
      e.preventDefault();
      let user = {
        image: this.image,
        name: this.name,
        email: this.email,
        oldpassword: this.oldPassword,
        newpassword: this.newPassword,
      };
      this.updateUser(user);
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      this.image = file;
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.prevImage = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    },
  },
  watch: {
    User(newVal, oldVal) {
      // this check is mandatory to prevent endless cycle
      if (newVal !== oldVal) this.$emit("onCompletedChangeProfile");
    },
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
};
</script>

<style>
label {
  margin-top: 0.5rem;
}
</style>