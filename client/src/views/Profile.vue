<template>
  <section class="Profile">
    <div class="grid grid-cols-12 gap-4 h-fit mt-4 min-h-screen">
      <div
        class="Profile-Left-Side xl:col-span-4 md:col-span-12 col-span-12 flex flex-col items-center bi-background-blue mx-4 xl:mr-0 h-fit rounded-xl"
      >
        <UserProfile :User="User" v-if="User && !isShowEditProfile" />
        <ChangeProfile v-else @onCompletedChangeProfile="changeProfile" />
        <p
          class="font-medium mb-4 text-black rounded-lg text-lg px-5 py-2.5 text-center bi-background-gray w-ful"
          @click="changeProfile"
        >
          {{ onSwitchProfileText }}
        </p>
      </div>

      <div
        class="Profile-Right-Side xl:col-span-8 md:col-span-12 col-span-12 flex flex-col items-center bi-background-blue mx-4 xl:ml-0 flex-wrap h-max rounded-xl"
      >
        <div class="flex h-fit w-full justify-start p-14 flex-col">
          <h1 class="my-3 text-2xl">Yours documents</h1>

          <div
            class="flex flex-wrap items-center justify-center py-4 border-solid border-2 rounded-2xl"
          >
            <div v-if="Object.keys(AllCsvs).length == 0 || Errors">
              <div v-if="AllCsvsEmpty" class="text-xl">
                {{
                  Errors ||
                  "You don't have any Csv. Please upload or create new table."
                }}
              </div>
              <Preloader :scale="0.8" v-else />
            </div>
            <div v-else v-for="csv in AllCsvs" :key="csv._id">
              <ProfileCsvHeader
                :id="csv._id || emptyString"
                :title="csv.title || emptyString"
                :author="csv.author || emptyString"
                :uploadDate="csv.upload || emptyString"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Preloader from "../components/common/Preloader.vue";
import ProfileCsvHeader from "../components/common/ProfileCsvHeader.vue";
import UserProfile from "../components/common/UserProfile.vue";
import ChangeProfile from "../components/common/ChangeProfile.vue";
export default {
  name: "Profile",
  components: {
    Preloader,
    ProfileCsvHeader,
    UserProfile,
    ChangeProfile,
  },
  data() {
    let onSwitchProfileText = "Change Profile Information";
    return {
      isShowEditProfile: false,
      onSwitchProfileText,
    };
  },
  methods: {
    ...mapActions(["getAllCsvs"]),
    changeProfile() {
      this.isShowEditProfile = !this.isShowEditProfile;
      if (this.isShowEditProfile) {
        this.onSwitchProfileText = "Cancel";
      } else {
        this.onSwitchProfileText = "Change Profile Information";
      }
    },
  },
  computed: {
    ...mapGetters(["User", "AllCsvs", "Errors", "AllCsvsEmpty"]),
  },
  mounted() {
    if (localStorage.token) {
      this.getAllCsvs();
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>
