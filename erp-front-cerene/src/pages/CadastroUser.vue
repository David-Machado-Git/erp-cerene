<template>
  <div
    class="auth-wrapper pa-4 animate-slideDown"
    :style="{
      // backgroundImage: 'url(/_img/_bg-login.png)',
      backgroundSize: '30%',
      backgroundPosition: '72% 64%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <v-img 
      class="mx-auto my-6" 
      max-width="228" 
      src="/_img/_logo_rascunho.png"
    />

    <v-card
      class="mx-auto pa-6"
      elevation="8"
      max-width="448"
      rounded="lg"
      color=""
    >
      <h3 
        class="text-center pb-4 text-black" 
        style="opacity: .70; color: white;"
      >
        CADASTRO CONTROLE PONTO
      </h3>
      <v-text-field
        v-model="nome"
        density="compact"
        label="Digite seu nome"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined" 
        type="text"
        autocomplete="name"
        required
      >
        <template #label>
          <span>Digite seu nome <span style="color: red">*</span></span>
        </template>
      </v-text-field>
    
      <v-text-field
        v-model="cpf"
        density="compact"
        label="Digite seu CPF"
        prepend-inner-icon="mdi-card-account-details-outline"
        variant="outlined"
        type="text"
        autocomplete="off"
        maxlength="14"
        required
      >
        <template #label>
          <span>Digite seu CPF <span style="color: red">*</span></span>
        </template>
      </v-text-field>

      <v-text-field
        v-model="nasc"
        density="compact"
        label="Data de Nascimento"
        prepend-inner-icon="mdi-calendar"
        variant="outlined"
        type="date"
        autocomplete="bday"
      >
        <template #label>
          <span>Data de Nascimento <span style="color: red">*</span></span>
        </template>
      </v-text-field>

      <v-text-field
        v-model="cargo"
        density="compact"
        label="Digite seu cargo"
        prepend-inner-icon="mdi-briefcase-outline"
        variant="outlined"
        type="text"
        autocomplete="organization-title"
      >
        <template #label>
          <span>Digite seu cargo <span style="color: red">*</span></span>
        </template>
      </v-text-field>


      <v-select
        v-model="unidade"
        :items="unidadesMap"
        item-title="desc"
        item-value="enum"
        density="compact"
        label="Unidade de Trabalho"
        prepend-inner-icon="mdi-office-building"
        variant="outlined"
        autocomplete="organization"
      >
        <template #label>
          <span>Unidade de Trabalho <span style="color: red">*</span></span>
        </template>
      </v-select>

      <v-select 
        v-model="sexo" 
        :items="['Masculino', 'Feminino']" 
        label="Sexo" 
        density="compact" 
        variant="outlined" 
        prepend-inner-icon="mdi-gender-male-female"
      >
        <template #label>
          <span>Sexo <span style="color: red">*</span></span>
        </template>
      </v-select>

      <v-text-field
        v-model="email"
        density="compact"
        label="Digite seu e-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        type="e-mail"
        autocomplete="email"
      >
        <template #label>
          <span>Digite seu e-mail <span style="color: red">*</span></span>
        </template>
      </v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        label="Digite sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      >
        <template #label>
          <span>Digite sua senha <span style="color: red">*</span></span>
        </template>
      </v-text-field>

      <v-btn
        class="mb-3"
        size="large"
        variant="tonal"
        block
        @click="validateForm"
      >
        Cadastrar
      </v-btn>
    </v-card>
    <div class="text-center mt-3">
      <a
        class="text-black text-decoration-none"
        href="javascript:void(0);"
        @click="redirectToLogin"
      >
        voltar a página de login</a>
    </div>
  </div>
</template>

  <script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import cadastroService from "@/services/cadastroService";
import { useToast } from "vue-toastification";
// import maska from "maska";
// import * as Maska from "maska";

const toast = useToast();
const router = useRouter();
const visible = ref(false);
const nome = ref("");
const cpf = ref("");
const unidade = ref("");
const nasc = ref("");
const cargo = ref("");
const unidadesMap = [
  { desc: "Administração Central", enum: 1 },
  { desc: "Cerene Blumenau", enum: 2 },
  { desc: "Cerene Gaspar - NVR", enum: 3 },
  { desc: "Cerene Joinville", enum: 4 },
  { desc: "Cerene São Bento do Sul", enum: 5 },
  { desc: "Cerene Lapa", enum: 6 },
  { desc: "Cerene Ituporanga", enum: 7 },
  { desc: "Cerene Palhoça", enum: 8 },
];
const sexo = ref("");

const usuariosMap = [
  { desc: "Administrador", role: "ADMIN", enum: 1 },
  { desc: "Gerente", role: "MANAGER", enum: 2 },
  { desc: "Usuário", role: "USER", enum: 3 },
];

const email = ref("");
const password = ref("");

const redirectToLogin = () => {
  router.push("/login");
};

const validateForm = () => {
  const rawCpf = cpf.value;

  const digitsOnly = rawCpf.replace(/\D/g, "");

  if (!/^\d+$/.test(digitsOnly)) {
    toast.error("No campo CPF Somente números são permitidos!");
    return;
  }

  if (digitsOnly.length !== 11) {
    toast.error("CPF deve ter exatamente 11 dígitos!");
    return;
  }

  cadastrar();
};

const formatCpf = (value) => {
  let digits = value.replace(/\D/g, "").substring(0, 11);
  if (digits.length > 9) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (digits.length > 6) {
    return digits.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (digits.length > 3) {
    return digits.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else {
    return digits;
  }
};

const cadastrar = async () => {
  // exemplo: sempre USER por padrão
  const usuarioSelecionado = usuariosMap.find((u) => u.role === "USER");

  // encontra a unidade selecionada pelo enum
  const unidadeSelecionada = unidadesMap.find((u) => u.enum === unidade.value);

  const dadosCadastro = {
    nome: nome.value,
    cpf: cpf.value,
    dataNascimento: nasc.value,
    cargo: cargo.value,
    email: email.value,
    unidade: [
      {
        desc: unidadeSelecionada?.desc,
        enum: unidadeSelecionada?.enum,
      },
    ],
    sexo: sexo.value,
    usuario: [
      {
        login: email.value,
        password: password.value,
        role: usuarioSelecionado?.role,
        enum: usuarioSelecionado?.enum,
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

watch(cpf, (newVal) => {
  cpf.value = formatCpf(newVal);
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