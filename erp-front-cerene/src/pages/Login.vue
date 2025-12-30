<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="auth-wrapper pa-4 pt-6 animate-slideDown"
    :style="{
      // backgroundImage: 'url(/_img/_bg-login.png)',
      backgroundSize: '30%',
      backgroundPosition: '72% 64%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <v-img
      class="mx-auto my-2"
      max-width="228"
      src="/_img/_logo_rascunho.png"
    />
  
  
    <v-card
      class="mx-auto pa-4 custom-padding"
      elevation="8"
      max-width="448"
      rounded="lg"
      color=""
    >
      <!-- <v-img
        class="mx-auto my-4"
        max-width="68"
        src="/_img/imp_digital.gif"
      /> -->
      <v-text-field
        v-model="email"
        class="color-custom"
        density="compact"
        label="e-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        type="e-mail"
        autocomplete="email"
        @keydown.enter="login()"
      >
        <template #label>
          <span>e-mail <span style="color: red">*</span></span>
        </template>
      </v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        label="senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        @keydown.enter="login()"
      >
        <template #label>
          <span>Digite sua senha <span style="color: red">*</span></span>
        </template>
      </v-text-field>

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
              Criar conta <v-icon icon="mdi-chevron-right" />
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
        Esqueceu a senha?</a>
    </div>
  </div>
</template>

  <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LoginService from "../services/loginService";
import "@/firebase/ConectDb";
import { useToast } from "vue-toastification";


const toast = useToast();
const router = useRouter();
const visible = ref(false);
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const token = await LoginService.validarLogin(email.value, password.value);

    if (token) {
      localStorage.setItem("token", token.id);
      await LoginService.registerToken(token.id, token.id);
      router.push("/dashboard");
    }

  } catch (error) {
    toast.error("Credenciais inválidas ou erro na autenticação.");
    console.error("Erro de autenticação: ", error);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.push("/dashboard");
  }
});

const navigateToCadastroUser = () => {
  router.push("/cadastro");
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

@keyframes slideDown {
  0% {
    transform: translateY(-320px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideDown {
  animation: slideDown 0.95s ease-out;
}
</style>