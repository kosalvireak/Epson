import { createApp } from 'vue';
import App from "./App.vue";
import router from "./router/index";
import "./assets/main.css";
import Toaster from "@meforma/vue-toaster";
import store from "./store"


// Create the Vue app instance
const app = createApp(App)

// Use plugins
app.use(Toaster);
app.use(store);
app.use(router);

app.mount("#app");