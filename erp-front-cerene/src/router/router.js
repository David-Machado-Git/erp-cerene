import { createRouter, createWebHistory } from "vue-router";
import { routes as autoRoutes } from "vue-router/auto-routes";
import CadastroUser from "@/pages/CadastroUser.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import StatisticsDash from "@/pages/financeiro/StatisticsDash.vue";
import ColaboradoresAdm from "@/pages/Colaboradores/ColaboradoresAdm.vue";
// import Importacao from "@/pages/Importacao.vue"; // Adiciona manualmente o componente
// import ColaboradoresAdm from "@/pages/Colaboradores/ColaboradoresAdm.vue";

// Adiciona manualmente as rotas protegidas e não protegidas
const routes = [
  // Rotas públicas
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/parceiro",
    name: "CadastroUser",
    component: CadastroUser,
  },

  // Rota protegida com filhos
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "", // rota padrão filha
        name: "StatisticsDash",
        component: StatisticsDash,
      },
      {
        path: "colaboradores-cerene",
        name: "ColaboradoresCerene",
        component: ColaboradoresAdm,
      },
    ],
  },

  ...autoRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // console.log("Token global guard: ", token);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // console.log("A rota requer autenticação? ", requiresAuth);

  if (requiresAuth && !token) {
    // console.log("Usuário sem token, redirecionando para login");
    next("/login");
  } else {
    next();
  }
});

router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// Espera o router estar pronto
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

// Exporta o router
export default router;
