import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import Toaster from "@meforma/vue-toaster";
import "./index.css";

const app = createApp(App);
app.use(router);

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toast: Toaster;
  }
}
app.use(Toaster, {
  position: "top-right",
  duration: 2000,
});
app.mount("#app");
