import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useStore } from "./store/store";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const store = useStore();

store.fetchUser().finally(() => {
    app.mount("#app");
});
