// src/plugins/vuetify.ts

import "@mdi/font/css/materialdesignicons.css"; // Ícones
import "vuetify/styles"; // Estilos principais do Vuetify

import { createVuetify } from "vuetify";
import { pt } from "vuetify/locale"; // Importa o idioma português

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#ffffff",
          surface: "#f5f5f5",
          primary: "#6200ea",
          secondary: "#03dac6",
          error: "#b00020",
          info: "#2196f3",
          success: "#4caf50",
          warning: "#fb8c00",
        },
      },
    },
  },
  icons: {
    iconfont: "mdi", // Usa Material Design Icons
  },
  locale: {
    locale: "pt",     // Define português como idioma padrão
    messages: { pt }, // Carrega mensagens traduzidas
  },
});
