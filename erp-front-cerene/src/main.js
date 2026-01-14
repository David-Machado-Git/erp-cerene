/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from "@/plugins";

import VueApexCharts from "vue3-apexcharts";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Importa o Vuetify configurado
// import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.component("VueApexCharts", VueApexCharts);

registerPlugins(app);

// Usa o Vuetify
// app.use(vuetify);

app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  maxToasts: 5,
});

app.mount("#app");
