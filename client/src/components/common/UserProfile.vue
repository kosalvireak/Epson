<template>
  <div class="flex h-full w-full justify-center p-4 max-w-md">
    <div class="max-w-md">
      <div class="photo-wrapper p-2">
        <img
          class="w-60 h-60 rounded-full mx-auto text-center object-cover"
          :src="User.image"
          alt="User Profile Image"
        />
      </div>
      <div class="p-2 overflow-hidden">
        <h3 class="text-center text-2xl font-medium leading-8 ellipsis">
          {{ User.name }}
        </h3>
        <table class="text-xl my-3">
          <tbody>
            <tr>
              <td class="px-2 py-2 font-semibold">Email:</td>
              <td class="px-2 py-2">{{ User.email }}</td>
            </tr>
            <tr>
              <td class="px-2 py-2 font-semibold">Registered:</td>
              <td class="px-2 py-2">
                {{ getDate() }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center my-3">
          <a
            class="text-m italic hover:underline hover:text-bi_gray_hover font-medium"
            href="#"
            @click="changeProfile"
            >Change Profile Information</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateUtils } from "../../utils";
export default {
  name: "UserProfile",
  props: {
    User: {
      required: true,
    },
  },
  methods: {
    changeProfile() {
      alert("You Can't Use This Feature Right Now.");
    },
    getDate() {
      return getDateUtils(this.User.date, true, false);
    },
  },
};
</script>

<style>
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>