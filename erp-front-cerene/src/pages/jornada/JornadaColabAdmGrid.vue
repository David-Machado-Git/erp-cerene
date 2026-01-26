<template>
  <section class="p-4 animate-slideDown position-component">
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="11"
        >
          <v-card
            class="pl-7 pt-7 pb-1 mb-4"
            elevation="2"
            rounded="lg"
            color="blue-lighten-5"
          >
            <v-card-title
              class="text-subtitle-1 font-weight-bold"
              style="color:#1976D2;"
            >
              <v-icon
                style="color:#0A111A;"
                size="32"
              >
                mdi-calendar-clock
              </v-icon>
              Jornada CERENE
            </v-card-title>

            <p
              class="text-body-2 mb-4"
              style="color:#555;"
            >
              <span style="position: relative; left: 52px; top: -16px;">Jornadas dos colaboradores abaixo</span>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row
      class="align-center justify-center"
      no-gutters
    >
      <v-col
        cols="12"
        md="2"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 ml-auto"
      >
        <!-- <v-btn
          color="green"
          class="d-flex align-center mb-4 py-2 px-4 text-uppercase font-weight-bold"
          @click="openModal('CREATE', null)"
        >
          <v-icon left>
            mdi-plus-circle
          </v-icon>
          CADASTRAR
        </v-btn> -->
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title
          class="d-flex align-center"
          style="background-color: #1976D2; color: white;"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-plus-circle
          </v-icon>
          Novo Colaborador
        </v-card-title>

        <v-card-text class="scrollable-content">
          <v-card
            class="mx-auto pa-6"
            elevation="8"
            max-width="448"
            rounded="lg"
            color=""
          >
            <h2 
              class="text-center pb-4 text-black" 
              style="opacity: .70; color: white;"
            >
              {{ nome }}
            </h2>
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
              SALVAR
            </v-btn>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row
      class="align-center justify-center"
      no-gutters
    >
      <v-col
        cols="12"
        md="3"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 mr-9"
      >
        <v-select
          v-model="filters.unidade"
          label="Filtrar por unidade"
          :items="unidadesMap"
          item-title="desc"
          item-value="desc"
          prepend-icon="mdi-filter"
          class="ml-3"
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 mr-9"
      >
        <v-select
          v-model="filters.sexo"
          label="Filtrar por Sexo"
          :items="['Masculino', 'Feminino']"
          prepend-icon="mdi-filter"
          class="ml-3"
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 mr-9"
      >
        <v-text-field
          v-model="filters.keyword"
          label="Palavras chave"
          class="w-full ml-3"
          outlined
          prepend-icon="mdi-magnify"
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        md="2"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 pb-4"
      >
        <v-btn
          color="blue"
          variant="outlined"
          size="small"
          class="ml-3"
          @click="limparFiltros"
        >
          <v-icon start>
            mdi-broom
          </v-icon>
          Limpar filtros
        </v-btn>
      </v-col>
    </v-row>
    <main style="margin-bottom: 90px; width: 98%; margin: auto;">
      <v-data-table
        v-model:pagination="pagination"
        :headers="headers"
        :items="filteredItems"
        item-key="id"
        class="elevation-1 mg-pers"
        :items-per-page-options="[5, 10, 15]"
        :items-per-page="pagination.rowsPerPage"
      >
        <template #item="props">
          <tr
            :key="props.item.cod"
            class="hover-row"
          >
            <td class="py-3 px-4 flex items-center">
              <span>{{ props.item.cod.length > 20 ? props.item.cod.slice(0, 20) + '...' : props.item.cod }}</span>
            </td>
            <td class="py-3 px-4">
              {{ props.item.nome.length > 12 ? props.item.nome.slice(0, 26) + '...' : props.item.nome }}
            </td>
            <td class="py-3 px-4">
              {{ props.item.unidade[0].desc }}
            </td>
            <td class="py-0 px-4">
              <v-chip
                :color="getPriorityColor(props.item.sexo)"
                text-color="white"
                class="capitalize"
              >
                {{ props.item.sexo }}
              </v-chip>
            </td>
            <td class="py-3 px-4">
              <i class="mdi mdi-card-account-details text-gray-500" /> {{ props.item.cpf }}
            </td>
            <td class="py-3 px-4">
              <div class="icon-container">
                <button
                  class="text-green-500"
                  @click="goToCalendar(props.item)"
                >
                  <v-icon
                    color="green"
                    class="s-i"
                  >
                    mdi-calendar
                  </v-icon>
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template #no-data>
          <div class="text-center py-4">
            <span>Sem dados disponíveis</span>
          </div>
        </template>
      </v-data-table>
    </main>
  </section>
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

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import JornadaColabAdmService from "@/services/JornadaColabAdmService";
import { useToast } from "vue-toastification";
import cadastroService from "@/services/cadastroService";
import { useRouter } from "vue-router";
import { eventBus } from "@/eventBus";
// import Swal from "sweetalert2";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: { id: number; title: string };
}


interface Unidade {
  desc?: string;   // opcional, pois você usou "?."
  enum?: string;   // opcional também
}

interface Usuario {
  login: string;
  password: string;
  role?: string;   // opcional, pois você usou "?."
  enum?: string;   // opcional também
}

interface Colab {
  nome: string;
  cpf: string;
  dataNascimento: string; // pode ser Date se você quiser tipar melhor
  cargo: string;
  email: string;
  unidade: Unidade[];
  sexo: string;
  usuario: Usuario[];
  configuracoes: any[];
}

const router = useRouter();
const toast = useToast();
const nome = ref("");
const cpf = ref("");
const unidade = ref("");
const nasc = ref("");
const cargo = ref("");
const completeData: any = ref("");
const isLoading = ref(true);
// const unidadesMap = [
//   { desc: "Administração Central", enum: 1 },
//   { desc: "Cerene Blumenau", enum: 2 },
//   { desc: "Cerene Gaspar - NVR", enum: 3 },
//   { desc: "Cerene Joinville", enum: 4 },
//   { desc: "Cerene São Bento do Sul", enum: 5 },
//   { desc: "Cerene Lapa", enum: 6 },
//   { desc: "Cerene Ituporanga", enum: 7 },
//   { desc: "Cerene Palhoça", enum: 8 },
// ];
const sexo = ref("");
const unidadesMap = ref([]) // começa vazio
const usuariosMap = [
  { desc: "Administrador", role: "ADMIN", enum: 1 },
  { desc: "Gerente", role: "MANAGER", enum: 2 },
  { desc: "Usuário", role: "USER", enum: 3 },
];

const email = ref("");
const password = ref("");

const headers = ref([
  { title: "Cód", sortable: true, value: "cod" },
  { title: "Nome", sortable: true, value: "nome" },
  { title: "Unidade", sortable: true, value: "unidade" },
  { title: "Sexo", sortable: true, value: "sexo" },
  { title: "CPF", sortable: true, value: "cpf" },
  { title: "Jornada", sortable: false, value: "actions" },
]);

const recuverData = ref<Task | null>(null);
const typeAction = ref("CREATE");
const filters = ref({
  unidade: null,
  sexo: null,
  keyword: "",
});
const dialog = ref(false);
const visible = ref(false);
const items = ref<any[]>([]);
// const ip = ref<string>("");

// const openModal = (typeOfAction: string, data: any | null) => {
//   if (typeOfAction === "EDIT") {
//     recuverData.value = data;
//     typeAction.value = "EDIT";
//     const infoData: any = recuverData.value;
//     nome.value = infoData.nome;
//     cpf.value = infoData.cpf;
//     nasc.value = data.nasc;
//     cargo.value = infoData.cargo;
//     unidade.value = infoData.unidade?.[0]?.desc;
//     sexo.value = infoData.sexo;
//     email.value = infoData.email;
//     password.value = infoData.password;
    
//   } else {
//     recuverData.value = null;
//     typeAction.value = "CREATE";

//     nome.value = "";
//     cpf.value = "";
//     nasc.value = "";
//     cargo.value = "";
//     unidade.value = "";
//     sexo.value = "";
//     email.value = "";
//     password.value = "";
//   }

//   dialog.value = true;
// };

const handleSavePerson = async () => {
  try {
    // const unidadeSelecionada = unidadesMap.find((u) => u.enum === Number(unidade.value));
    const unidadeSelecionada = unidadesMap.value.find((u) => u.desc === filters.value.unidade);
    const usuarioSelecionado = usuariosMap.find((u) => u.role === "USER");

    const dadosCadastro = {
      nome: nome.value ?? null,
      cpf: cpf.value ?? null,
      dataNascimento: nasc.value ?? null,
      cargo: cargo.value ?? null,
      email: email.value ?? null,
      unidade: [
        {
          desc: unidadeSelecionada?.desc ?? null,
          enum: unidadeSelecionada?.enum ?? null,
        },
      ],
      sexo: sexo.value ?? null,
      usuario: [
        {
          login: email.value ?? null,
          password: password.value ?? null,
          role: usuarioSelecionado?.role ?? null,
          enum: usuarioSelecionado?.enum ?? null,
        },
      ],
    };

    if (typeAction.value === "CREATE") {
      await cadastroService.registrarUsuario(dadosCadastro);
      toast.success("Cadastro realizado com sucesso!");
    } else if (typeAction.value === "EDIT" && recuverData.value?.id) {
      await JornadaColabAdmService.atualizarColaborador(recuverData.value.id, dadosCadastro);
      toast.success("Colaborador atualizado com sucesso!");
    }

    dialog.value = false;
    await atualizarGrid();
  } catch (error) {
    toast.error("Erro ao salvar colaborador!");
    console.error(error);
  }
};

function normalizeCpf(cpf = "") {
  return String(cpf).replace(/\D/g, ""); // remove tudo que não for número
}

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")               // separa acentos
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const itemUnidade = normalizeText(item.unidade?.[0]?.desc ?? "");
    const filtroUnidade = normalizeText(filters.value.unidade ?? "");

    const matchUnidade =
      !filters.value.unidade || itemUnidade === filtroUnidade;

    const matchSexo =
      !filters.value.sexo || item.sexo === filters.value.sexo;

    // keyword
    const keywordRaw = (filters.value.keyword ?? "").trim();
    const keywordLower = keywordRaw.toLowerCase();
    const keywordCpfPlain = normalizeCpf(keywordRaw);

    // campos principais
    const nomeNorm = normalizeText(item.nome ?? "");
    const unidadeNorm = itemUnidade;
    const sexoNorm = normalizeText(item.sexo ?? "");
    const emailRaw = String(item.email ?? "").toLowerCase();
    const cpfRaw = String(item.cpf ?? "").toLowerCase();
    const cpfPlain = normalizeCpf(item.cpf ?? "");
    const idRaw = String(item.id ?? "").toLowerCase();

    // 🔍 pega dinamicamente todos os campos de configuracoes
    const configuracoesCampos = Object.values(item.configuracoes ?? {})
      .map((v) => String(v ?? "").toLowerCase());

    // 🔍 verifica se keyword bate em qualquer campo
    const matchesKeyword =
      !keywordRaw ||
      nomeNorm.includes(keywordLower) ||
      unidadeNorm.includes(keywordLower) ||
      sexoNorm.includes(keywordLower) ||
      emailRaw.includes(keywordLower) ||
      cpfRaw.includes(keywordLower) ||
      (keywordCpfPlain && cpfPlain.includes(keywordCpfPlain)) ||
      idRaw.includes(keywordLower) ||
      configuracoesCampos.some((campo) => campo.includes(keywordLower));

    return matchUnidade && matchSexo && matchesKeyword;
  });
});


const limparFiltros = () => {
  filters.value.unidade = null;
  filters.value.sexo = null;
  filters.value.keyword = "";
};



const goToCalendar = (colab: Colab) => {
  // console.log("CAIU NO GO TO CALENDAR COM OS DADOS =>", colab);
  eventBus.colab = colab; // agora funciona
  // console.log('ANTES DE ENVIAR OS DADOS SÃO: => ', colab);
  
  router.push("/dashboard/minha-jornada");
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

  handleSavePerson();
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


watch(filters, () => {}, { deep: true });

watch(cpf, (newVal) => {
  cpf.value = formatCpf(newVal);
});

const atualizarGrid = async () => {
  try {
    isLoading.value = true; // ⏳ Inicia o carregamento

    const colaboradores = await JornadaColabAdmService.findColaboradores();

    // Ordena por nome
    colaboradores.sort((a: any, b: any) =>
      String(a.nome).localeCompare(b.nome)
    );

    completeData.value = colaboradores;

    // Mapeia os dados para a tabela
    items.value = colaboradores.map((colab: any, index: number) => ({
      cod: index + 1,
      urlPhoto: colab.urlPhoto,
      id: colab.id,
      nome: colab.nome,
      cpf: colab.cpf,
      nasc: colab.dataNascimento,
      cargo: colab.cargo,
      unidade: colab.unidade,
      sexo: colab.sexo,
      email: colab.email,
      isActive: colab.isActive,
      password: colab.password,
      actions: "...",

      // 🔍 inclui dinamicamente todos os campos de configuracoes
      configuracoes: { ...colab.configuracoes },
    }));
  } catch (error) {
    console.error("Erro ao carregar colaboradores:", error);
  } finally {
    isLoading.value = false; // ✅ Finaliza o carregamento
  }
};





onMounted(async () => {
  await carregarUnidadesMap();
  await atualizarGrid();
});

const carregarUnidadesMap = async () => {
  try {
    const unidades = await cadastroService.findUnidadesConfiguracoes()
    // console.log("Configurações das unidades:", unidades)

    const lista = []

    for (const u of unidades) {
      if (u.configuracoes?.mostrarSelect) {
        lista.push({
          id: u.id, // será usado como item-value
          desc: u.configuracoes?.selectName || u.textoSelect || u.nomeFantasia || "Sem nome"
        })
      }
    }

    // console.log("Lista final para o VSelect:", lista)
    unidadesMap.value = lista
  } catch (error) {
    console.error("Erro ao carregar unidades:", error)
  }
};

const getPriorityColor = (sexo: string) => {
  switch (sexo) {
    case "Feminino":
      return "orange";
    case "Masculino":
      return "green";
    default:
      return "grey";
  }
};

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

</script>

<style lang="scss" scoped>
.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
}

.position-component {
  margin-right: 14px;
  padding-top: 80px;
  padding-left: 60px;
}

.hover-row:hover {
  background-color: #e4f1fb; /* cor de destaque */
  cursor: pointer;          /* opcional: mostra que é interativo */
}

.mg-pers {
  margin-bottom: 70px;
}

.icon-pers {
  // display: none;
  position: relative;
  top: 2px !important;
  font-size: 20px;
}

.s-i {
  font-size: 30px !important;
}

.icon-pers-p {
  // display: none;
  position: relative;
  top: 2px !important;
  left: 0;
  font-size: 20px;
}

.icon-container {
  display: flex;
  flex-direction: row; /* padrão: lado a lado */
  align-items: center;
}

@media (max-width: 980px) {
  .icon-container {
    flex-direction: column; /* abaixo de 980px: um embaixo do outro */
    align-items: flex-start; /* opcional: alinha à esquerda */
  }

  .icon-container button {
    margin-bottom: 8px; /* espaço entre os botões */
  }

  .icon-pers-p {
    // display: none;
    position: relative;
    top: 4px !important;
    left: 9px;
    font-size: 20px;
  }
}



/* Quando a tela for menor que 1280px */
@media (max-width: 1280px) {
  .position-component {
    padding-left: 15px;
  }
}

</style>