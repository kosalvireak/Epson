<template>
  <div
    class="UserProfile flex h-auto w-auto justify-center p-4 max-w-md xl:max-w-sm"
  >
    <div class="max-w-md xl:max-w-sm">
      <div class="photo-wrapper p-2">
        <img
          class="w-52 h-52 rounded-full mx-auto text-center object-cover"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getDateUtils } from "../../utils";
export default {
  name: "UserProfile",
  props: {
    User: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["Errors"]),
  },
  methods: {
    getDate() {
      return getDateUtils(this.User.date, true, false);
    },
  },
};
</script>
