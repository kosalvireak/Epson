<template>
  <div class="grid h-screen px-4 place-content-center bg-bi_darkblue">
    <div class="text-center">
      <h1 class="text-9xl text-bi_white_active">404</h1>

      <p class="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>

      <p class="mt-4 text-gray-500">We can't find that page.</p>

      <button
        @click="goBackRoute()"
        class="inline-block px-5 py-3 mt-6 text-md text-bi_lightblue bg-bi_gray hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "ErrorPage",
  methods: {
    goBackRoute() {
      router.go(-1);
    },
  },
};
</script>

