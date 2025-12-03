<template>
  <v-app>
    <v-main class="color-custom">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.color-custom {
  background: #528ad0;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
// import Login from "./pages/Login.vue";
// import { eventBus } from "./eventBus";
// import { watch } from "vue";
// import { useRouter } from "vue-router"; // Usando useRouter para navegação

const isAuthenticated = ref(false); // Inicialmente definido como falso
// const router = useRouter();

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem("token");
});

// watch(
//   () => eventBus.authenticated,
//   () => {
//     isAuthenticated.value = !isAuthenticated.value;
//     router.push("/login");
//     // console.log(
//     //   "Evento de autenticação recebido no AppPP! ",
//     //   isAuthenticated.value
//     // );
//   },
//   () => eventBus.loged,
//   () => {
//     router.push("/dashboard");
//     // console.log(
//     //   "Evento de autenticação AQUI AQUI! ",
//     //   isAuthenticated.value
//     // );
//   },

// );
</script>
