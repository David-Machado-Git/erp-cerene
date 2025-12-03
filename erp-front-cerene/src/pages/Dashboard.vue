<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app :theme="theme">
    <v-navigation-drawer
      class="pt-10"
      v-model="isDrawerOpen"
      color="amber"
      expand-on-hover
      rail
    >
      <v-list>
        <img class="ml-13" src="/_img/_logo_rascunho.png" />
        <v-divider></v-divider>
        <v-list-item
          @click="() => handleClick('Dashboard')"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
        ></v-list-item>
        <v-list-item
          @click="() => handleClick('Produtos')"
          prepend-icon="mdi-storefront"
          title="Afiliados"
        ></v-list-item>
        <v-list-item
          @click="() => handleClick('Serviços')"
          prepend-icon="mdi-calendar"
          title="Agenda"
        ></v-list-item>

        <v-list-group v-model="usersGroupOpen">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="Estoque"
            ></v-list-item>
          </template>
          <v-list-item
            @click="navigateToImportacao"
            prepend-icon="mdi-checkbox-marked"
            title="Importação"
          ></v-list-item>
          <v-list-item
            @click="() => handleClick('Inativos')"
            prepend-icon="mdi-power-off"
            title="Inativos"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat class="border-b" color="amber">
      <v-app-bar-nav-icon
        @click="isDrawerOpen = !isDrawerOpen"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-menu v-model="menuVisible" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn icon class="mr-3" v-bind="props">
            <v-badge content="3" color="red" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card width="270" class="pa-4">
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-bell-alert"
              style="font-size: 20px; color: grey"
            ></v-icon>
            <span class="ml-2">novo usuário cadast ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-cash"
              style="font-size: 20px; color: grey"
            ></v-icon>
            <span class="ml-2">nova receita ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <v-icon
              icon="mdi-cash"
              style="font-size: 20px; color: grey"
            ></v-icon>
            <span class="ml-2">nova receita ...</span>
          </v-list-item>
          <v-list-item @click="myProfile">
            <!-- <v-icon icon="mdi-cash" style="font-size: 20px; color: grey;"></v-icon> -->
            <span class="ml-2" style="float: right">ver todos</span>
          </v-list-item>
        </v-card>
      </v-menu>
      <v-avatar v-bind="props" class="cursor mr-5" @click="toggleFullScreen">
        <v-icon>{{
          isFullScreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }}</v-icon>
      </v-avatar>

      <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props" class="cursor mr-5">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-avatar>
        </template>
        <v-card width="170" class="pa-4">
          <v-list-item @click="myProfile"
            ><v-icon
              icon="mdi-account"
              style="font-size: 20px; color: grey"
            ></v-icon>
            Meu perfil</v-list-item
          >
          <v-list-item @click="logout"
            ><v-icon
              icon="mdi-logout"
              style="font-size: 18px; color: grey"
            ></v-icon>
            Sair</v-list-item
          >
        </v-card>
      </v-menu>
    </v-app-bar>
    <StatisticsDash />
    <AppFooter />
  </v-app>
  <div class="loader" v-show="isLoading">
    <v-img class="position-custom" max-width="64" src="/_img/loader.gif"></v-img>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import StatisticsDash from "./financeiro/StatisticsDash.vue";
import AppFooter from "@/painel/painel-components/AppFooter.vue";
import { useRouter } from "vue-router";
// import { eventBus } from "../eventBus";
import { useToast } from "vue-toastification";

const props = defineProps({
  title: String,
});

const toast = useToast();
const isDrawerOpen = ref(false);
const usersGroupOpen = ref(false);
const menuVisible = ref(false);
const theme = ref("light");
const router = useRouter();
const isFullScreen = ref(false);
const isLoading = ref(true);
import LoginService from "../services/loginService";

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
    router.push("/dashboard");
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

    default:
      break;
  }
};

// onMounted(() => {
//   validateToken();
// });

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

.v-app-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.custum-drop-dal {
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
  background-color: #ffc107;
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
</style>
