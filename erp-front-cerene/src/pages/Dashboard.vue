<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app 
    :theme="theme"
  >
    <v-navigation-drawer
      v-model="isDrawerOpen"
      class="pt-10"
      style="background-color: #528ad0"
      expand-on-hover
      rail
    >
      <v-list>
        <img
          class="ml-13"
          src="/_img/_logo_rascunho.png"
        >
        <v-divider />
        <v-list-item
          class="custum-drop-dal"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          @click="() => handleClick('Dashboard')"
        />
        <v-list-item
          class="custum-drop-dal"
          prepend-icon="mdi-account-circle"
          title="Colaboradores Cerene"
          @click="() => handleClick('Colaboradores-cerene')"
        />
        <v-list-item
          class="custum-drop-dal"
          prepend-icon="mdi-calendar"
          title="Jornada de Trabalho"
          @click="() => handleClick('Colabradores-jornada')"
        />

        <v-list-group v-model="usersGroupOpen">
          <template #activator="{ props }">
            <v-list-item
              class="custum-drop-dal"
              v-bind="props"
              prepend-icon="mdi-file-chart"
              title="Relatórios"
            />
          </template>
          <v-list-item
            class="custum-drop-dal"
            prepend-icon="mdi-checkbox-marked"
            title="Importação"
            @click="navigateToImportacao"
          />
          <v-list-item
            class="custum-drop-dal"
            prepend-icon="mdi-power-off"
            title="Inativos"
            @click="() => handleClick('Inativos')"
          />
        </v-list-group>
        <v-list-item
          class="custum-drop-dal"
          prepend-icon="mdi-cog-outline"
          title="Configurações"
          @click="abrirConfiguracoes"
        />
        <v-list-item
          class="custum-drop-dal"
          prepend-icon="mdi-logout"
          title="Sair"
          @click="logout"
        />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      flat
      class="border-b"
      style="background-color: #528ad0"
    >
      <v-app-bar-nav-icon
        @click="isDrawerOpen = !isDrawerOpen"
      />
      <v-breadcrumbs
        :items="breadcrumbs"
        divider="/"
        class="element-visible"
      >
        <template #item="{ item, index }">
          <router-link
            v-if="item.to"
            :to="item.to"
            :class="[
              'breadcrumb-link',
              { 'active-breadcrumb': index === breadcrumbs.length - 1 }
            ]"
          >
            <v-icon
              v-if="item.icon"
              class="mr-1"
            >
              {{ item.icon }}
            </v-icon>
            {{ item.text }}
          </router-link>
          <span
            v-else
            :class="[
              'breadcrumb-link',
              { 'active-breadcrumb': index === breadcrumbs.length - 1 }
            ]"
          >
            <v-icon
              v-if="item.icon"
              class="mr-1"
            >{{ item.icon }}</v-icon>
            {{ item.text }}
          </span>
        </template>
      </v-breadcrumbs>





      <!-- <h2>{{ "TESTE" }}</h2> -->
    
      <v-spacer />
      <v-menu
        v-model="menuVisible"
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-btn
            icon
            class="mr-3"
            v-bind="props"
          >
            <v-badge
              content="3"
              color="red"
              overlap
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card
          width="270"
          class="pa-4"
        >
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-bell-alert"
              style="font-size: 20px; color: grey"
            />
            <span class="ml-2">novo usuário cadast ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-cash"
              style="font-size: 20px; color: grey"
            />
            <span class="ml-2">nova receita ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-cash"
              style="font-size: 20px; color: grey"
            />
            <span class="ml-2">nova receita ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <!-- <v-icon icon="mdi-cash" style="font-size: 20px; color: grey;"></v-icon> -->
            <span
              class="ml-2"
              style="float: right"
            >ver todos</span>
          </v-list-item>
        </v-card>
      </v-menu>
      <v-avatar
        v-bind="props"
        class="cursor mr-5"
        @click="toggleFullScreen"
      >
        <v-icon>
          {{
            isFullScreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
          }}
        </v-icon>
      </v-avatar>

      <v-menu>
        <template #activator="{ props }">
          <v-avatar
            v-bind="props"
            class="cursor mr-5"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-avatar>
        </template>
        <v-card
          width="170"
          class="pa-4"
        >
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-account"
              style="font-size: 20px; color: grey"
            />
            Meu perfil
          </v-list-item>
          <v-list-item @click="logout">
            <v-icon
              icon="mdi-logout"
              style="font-size: 18px; color: grey"
            />
            Sair
          </v-list-item>
        </v-card>
      </v-menu>
    </v-app-bar>
    
    <router-view />
    
    <AppFooter />
  </v-app>
  <div
    v-show="isLoading"
    class="loader"
  >
    <v-img
      class="position-custom"
      max-width="64"
      src="/_img/loader.gif"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
import { computed } from "vue";
// import StatisticsDash from "./financeiro/StatisticsDash.vue";
import AppFooter from "@/painel/painel-components/AppFooter.vue";
import { useRouter, useRoute } from "vue-router";
// import ColaboradoresAdm from "./Colaboradores/ColaboradoresAdm.vue";
// import { eventBus } from "../eventBus";
import { useToast } from "vue-toastification";
import LoginService from "../services/loginService";


const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});

const ip = ref("");
const locationData = ref(null);
const toast = useToast();
const isDrawerOpen = ref(false);
const usersGroupOpen = ref(false);
const menuVisible = ref(false);
const theme = ref("light");
const router = useRouter();
const route = useRoute();
const isFullScreen = ref(false);
const isLoading = ref(true);
// const renderizerComponent = ref("Dashboard");

// Pega dinamicamente o título definido no meta da rota
const breadcrumbs = computed(() => [
  { icon: 'mdi-home', to: '/' }, // casinha sempre primeiro
  ...route.matched.map(r => ({
    text: r.meta.title,
    to: r.path
  }))
]);




function navigateToImportacao() {
  router.push("/importacao");
}

const validateToken = async () => {
  const router = useRouter(); // Certifique-se de usar o `useRouter` no escopo correto
  const token = localStorage.getItem("token");

  if (!token) {
    setTimeout(() => {
      router.push("/login");
    }, 500);
    return;
  }

  const isValid = await LoginService.validateToken(token);

  if (isValid) {
    isLoading.value = false;
  } else {
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/login");
    }, 500);
    toast.error("Sessão expirada. Por favor, faça login novamente.");
  }
};

validateToken();

const handleClick = (event) => {
  switch (event) {
    case "Dashboard":
      router.push("/dashboard");
      break;
    case "Colaboradores-cerene":
      router.push("/dashboard/colaboradores-cerene");
      break;
    case "Colabradores-jornada":
      router.push("/dashboard/jornada-colaborador");
      break;
    default:
      break;
  }
};

onMounted(() => {
  fetchUserIpAndLocation();
  // validateToken();
});

// COMO OBTER INFORMAÇÕES DE GEOLOCALIZAÇÃO ABAIXO:
const fetchUserIpAndLocation = async () => {
  try {
    // 1. Obter IP público
    const res = await fetch("https://api.ipify.org?format=json")
    const data = await res.json()
    ip.value = data.ip

    // 2. Obter localização via ipwho.is
    const locRes = await fetch(`https://ipwho.is/${ip.value}`)
    const locData = await locRes.json()
    locationData.value = locData

    // 3. Imprimir no console
    console.log("IP do usuário:", ip.value)
    console.log("Localização aproximada:", {
      cidade: locData.city ?? "N/D",
      estado: locData.region ?? "N/D",
      país: locData.country ?? "N/D",
      latitude: locData.latitude ?? "N/D",
      longitude: locData.longitude ?? "N/D",
      provedor: locData.connection?.isp ?? "N/D"
    })
  } catch (err) {
    console.error("Erro ao obter IP/localização:", err)
  }
}


const logout = async () => {
  const token = localStorage.getItem("token");
  try {
    // Realiza o logout no backend
    await LoginService.logout(token);

    // Remove o token do localStorage
    localStorage.removeItem("token");

    // Atualiza o estado de autenticação
    // eventBus.authenticated = false;

    router.push("/login");
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
  }
};

const abrirConfiguracoes = () => {
  console.log("Caiu em meu Perfil");
};

const myProfile = () => {
  console.log("Caiu em meu Perfil");
};

watch(isLoading, (newValue) => {
  if (newValue) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    // Ativar fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
    isFullScreen.value = true;
  } else {
    // Desativar fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
    isFullScreen.value = false;
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.white-item {
  color: #ffffff !important;
}

.v-app-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.custum-drop-dal{
  font-weight: 700; /* semi-bold */
  color: #fff;
}

.cursor {
  cursor: pointer;
}

.cursor:hover {
  opacity: 0.5;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding-top: 64px;
}

.custom-p {
  position: absolute;
  top: 16px;
  right: 60px;
}

.loader {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #528ad0;
  opacity: 0.8;
  z-index: 999;
  overflow: hidden !important;
}

.position-custom {
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.breadcrumb-link {
  font-size: 13px;
  color: #fff !important;   /* força branco em todos os links */
  text-decoration: none;    /* remove sublinhado */
  transition: opacity 0.3s ease, color 0.3s ease; /* suavidade */
}

.breadcrumb-link:hover {
  opacity: 0.3;             /* fica mais apagado ao passar o mouse */
  color: #fff !important;   /* mantém branco */
}

.active-breadcrumb {
  font-size: 13px;
  color: #fff !important;   /* também branco */
  opacity: 0.8;             /* mais apagado para o ativo */
}

@media (max-width: 680px) {
  /* .breadcrumb-link {
    display: none;
  }

  .breadcrumb-link:hover {
    display: none;
  }

  .active-breadcrumb {
    display: none;
  } */

  .element-visible {
    display: none !important;
  }

}


</style>
