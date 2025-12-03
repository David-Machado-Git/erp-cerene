<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="auth-wrapper pa-4 pt-6"
    :style="{
      // backgroundImage: 'url(/_img/_bg-login.png)',
      backgroundSize: '30%',
      backgroundPosition: '72% 64%',
      backgroundRepeat: 'no-repeat',
    }"
  >
  <v-img class="mx-auto my-2" max-width="228" src="/_img/_logo_rascunho.png"></v-img>
  
  
  <v-card
  class="mx-auto pa-4 custom-padding"
  elevation="8"
  max-width="448"
  rounded="lg"
  color=""
  >
  <v-img class="mx-auto my-4" max-width="68" src="/_img/imp_digital.gif"></v-img>
      <v-text-field
        class="color-custom"
        density="compact"
        label="e-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        type="e-mail"
        autocomplete="email"
        v-model="email"
        @keydown.enter="login()"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        label="senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
        @keydown.enter="login()"
      ></v-text-field>

      <v-btn
        class="mb-8"
        size="large"
        variant="tonal"
        block
        @click="login()"
      >
        Entrar
      </v-btn>

      <v-row>
        <v-col col="3">
          <v-card-text class="text-right">
            <a
              class="text-black text-decoration-none"
              href="javascript:void(0);"
              @click="navigateToCadastroUser"
            >
              Criar conta <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center mt-3">
      <a
        class="text-decoration-none text-black"
        href="#"
        rel="noopener noreferrer"
        target="_self"
      >
        Esqueceu a senha?</a
      >
    </div>
  </div>
</template>

  <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LoginService from "../services/loginService";
import { useToast } from "vue-toastification";
// import axios from "axios";

const toast = useToast();
const router = useRouter();
const visible = ref(false);
const email = ref("");
const password = ref("");
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const login = async () => {
  try {
    const token = await LoginService.loginUser(email.value, password.value);
    localStorage.setItem("token", token);
    router.push("/dashboard");
  } catch (error) {
    toast.error("Credenciais inválidas ou erro na autenticação.");
    console.error("Erro de autenticação: ", error);
  }
};

onMounted(() => {
  // validateToken();
  const token = localStorage.getItem("token");

  if (token) {
    router.push("/dashboard");
  }
});

// const validateToken = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   try {
//     console.log("FAZENDO VALIDAÇÃO!");

//     const response = await api.get("/auth/validate-token", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Se o token for válido, redireciona para o dashboard
//     if (response.status === 200) {
//       router.push("/dashboard");
//     }
//   } catch (error) {
//     // Se o token for inválido, remove-o do localStorage
//     localStorage.removeItem("token");
//     toast.error("Sessão expirada. Por favor, faça login novamente.");
//     console.error("Token inválido: ", error);
//   }
// };

const navigateToCadastroUser = () => {
  router.push("/parceiro");
};
</script>

<style lang="scss">
.auth-wrapper {
  background-color: #528ad0;
  color: #fff !important;
  min-height: 96vh;
  justify-content: center;
  align-items: center;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus {
  background-color: #f5f5f5 !important; /* Cor de fundo desejada */
  color: #fff !important; /* Cor do texto para branco */
  caret-color: #fff !important; /* Cor do cursor */
  border: 1px solid transparent !important; /* Remover bordas */
  -webkit-text-fill-color: #585656 !important; /* Cor do texto preenchido */
  -webkit-box-shadow: 0 0 0px 1000px #f5f5f5 inset !important; /* Remover sombras padrão */
  box-shadow: 0 0 0px 1000px #f5f5f5 inset !important; /* Remover sombras padrão */
  transition: background-color 5000s ease-in-out 0s; /* Evitar o flash amarelo */
}

.custom-padding {
  margin-top: 10px !important;
}
</style>