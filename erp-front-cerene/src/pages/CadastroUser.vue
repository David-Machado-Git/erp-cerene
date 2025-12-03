<template>
  <div
    class="auth-wrapper pa-4"
    :style="{
      // backgroundImage: 'url(/_img/_bg-login.png)',
      backgroundSize: '30%',
      backgroundPosition: '72% 64%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <v-img class="mx-auto my-6" max-width="228" src="/_img/_logo_rascunho.png"></v-img>
    <v-card
    class="mx-auto pa-6"
    elevation="8"
    max-width="448"
    rounded="lg"
    color=""
    >
    <h3 class="text-center pb-4 text-black" style="opacity: .70; color: white;">CADASTRE SEU NEGÓCIO</h3>
    <v-text-field
      v-model="nome"
      density="compact"
      label="Digite seu nome"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined" 
      type="text"
      autocomplete="name"
    ></v-text-field>
    <v-text-field
      v-model="empresa"
      density="compact"
      label="Empresa"
      prepend-inner-icon="mdi-office-building"
      variant="outlined"
      type="text"
      autocomplete="organization"
    ></v-text-field>


    <v-text-field
      v-model="email"
      density="compact"
      label="Digite seu e-mail"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      type="e-mail"
      autocomplete="email"
    ></v-text-field>

    <v-text-field
      v-model="senha"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      label="Digite sua senha"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

      <v-btn
        class="mb-3"
        size="large"
        variant="tonal"
        block
        @click="cadastrar"
      >
        Cadastrar
      </v-btn>
    </v-card>
    <div class="text-center mt-3">
      <a
        class="text-decoration-none text-black"
        href="#"
        @click="redirectToLogin"
        rel="noopener noreferrer"
        target="_self"
      >
        voltar a página de login</a
      >
    </div>
  </div>
</template>

  <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cadastroService from "@/services/cadastroService";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const visible = ref(false);
const nome = ref("");
const empresa = ref("");
const email = ref("");
const senha = ref("");

const redirectToLogin = () => {
  router.push("/login");
};

const cadastrar = async () => {
  const dadosCadastro = {
    nome: nome.value,
    empresa: empresa.value,
    usuarios: [
      {
        login: email.value,
        password: senha.value,
        role: "USER",
      },
    ],
  };

  try {
    await cadastroService.registrarUsuario(dadosCadastro);
    toast.success("Cadastro realizado com sucesso!");
    router.push("/login");
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/dashboard");
  }
});
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