<template>
  <section class="Profile">
    <div class="grid grid-cols-12 gap-4 h-fit mt-4 min-h-screen">
      <div
        class="Profile-Left-Side lg:col-span-4 md:col-span-12 col-span-12 flex flex-col items-center bg-bi_lightblue md:mx-4 lg:mr-0 h-fit"
      >
        <UserProfile :User="User" v-if="User" />
      </div>

      <div
        class="Profile-Right-Side lg:col-span-8 md:col-span-12 col-span-12 flex flex-col items-center bg-bi_lightblue md:mx-4 lg:m-0 flex-wrap h-max"
      >
        <div class="flex h-fit w-full justify-start p-14 flex-col">
          <h1 class="my-3 text-2xl">Recent documents</h1>

          <div
            class="flex flex-wrap items-center justify-center py-4 border-solid border-2 rounded-2xl"
          >
            <div v-if="Object.keys(AllCsvs).length == 0 || Errors">
              <div v-if="Errors" class="text-xl">{{ Errors }}</div>
              <Preloader :scale="0.8" v-if="Object.keys(AllCsvs).length == 0" />
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
export default {
  name: "Profile",
  components: {
    Preloader,
    ProfileCsvHeader,
    UserProfile,
  },
  methods: {
    ...mapActions(["getAllCsvs"]),
  },
  computed: {
    ...mapGetters(["User", "AllCsvs", "Errors"]),
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

<style scoped>
.Profile {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>