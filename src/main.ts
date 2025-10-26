import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import { createPinia } from "pinia";
import { Toaster } from "vue-sonner";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(MotionPlugin);
app.component("Toaster", Toaster);
app.mount("#app");
