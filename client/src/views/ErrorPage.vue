<template>
  <div class="grid h-screen px-4 place-content-center bi-background-darkblue">
    <div class="text-center">
      <h1 class="text-9xl bi-text-white">404</h1>

      <p class="text-2xl font-bold tracking-tight sm:text-4xl bi-text-white">
        Uh-oh!
      </p>

      <p class="mt-4 bi-text-gray">We can't find that page.</p>

      <button
        @click="goBackRoute()"
        class="inline-block px-5 py-3 mt-6 bi-background-gray font-medium rounded-lg bi-text-darkblue"
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

