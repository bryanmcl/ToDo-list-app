import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";
import App from "./App.vue";
import router from "./router";

import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
    autoClose: 5000,
});
app.mount("#app");
