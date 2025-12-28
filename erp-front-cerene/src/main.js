/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
// import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue3-apexcharts";
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// import { vMaska } from "maska";
// import maska from "maska";
// import * as Maska from "maska";




// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);
// app.use(vuetify);
app.component("VueApexCharts", VueApexCharts);

// app.directive("maska", vMaska);
// app.directive("maska", maska);

registerPlugins(app);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    maxToasts: 5,
  })

app.mount("#app");
