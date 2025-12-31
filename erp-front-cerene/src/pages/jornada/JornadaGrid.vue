<template>
  <section class="p-4 animate-slideDown position-component">
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
        md="4"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0"
      >
        <v-select
          v-model="filters.unidade"
          label="Filtrar por unidade"
          :items="['Administração Central', 'Cerene de Blumenau', 'Cerene Gaspar - NVR', 'Cerene Joinville', 'Cerene São Bento do Sul', 'Cerene Lapa', 'Cerene Ituporanga', 'Cerene Palhoça']"
          prepend-icon="mdi-filter"
          class="ml-3"
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0"
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
        md="4"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0"
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
    </v-row>
    <main>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-1 mg-pers"
        :items-per-page-options="[5, 10, 15]"
      >
        <template #item="{ item }">
          <tr
            :key="item.id"
            class="hover-row"
          >
            <td class="py-3 px-4">
              {{ item.date }}
            </td>
            <td class="py-3 px-4">
              {{ item.workSchedule }}
            </td>

            <!-- Entrada com cor dinâmica -->
            <td
              class="py-3 px-4"
              :class="{
                'bg-green-100': item.checkIn <= '08:00',
                'bg-orange-100': item.checkIn > '08:00' && item.checkIn <= '08:30',
                'bg-red-100': item.checkIn > '08:30'
              }"
            >
              {{ item.checkIn }}
            </td>

            <td class="py-3 px-4">
              {{ item.breakStart }}
            </td>
            <td class="py-3 px-4">
              {{ item.breakEnd }}
            </td>
            <td class="py-3 px-4">
              {{ item.checkOut }}
            </td>
            <td class="py-3 px-4">
              {{ item.totalWorked }}
            </td>
            <td class="py-3 px-4">
              {{ item.timeBank }}
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import JornadaColabAdmService from "@/services/JornadaColabAdmService";
import { useToast } from "vue-toastification";
import cadastroService from "@/services/cadastroService";
// import Swal from "sweetalert2";
import { useRouter } from "vue-router";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: { id: number; title: string };
}

const router = useRouter();
const toast = useToast();
const nome = ref("");
const cpf = ref("");
const unidade = ref("");
const nasc = ref("");
const cargo = ref("");
const completeData: any = ref("");
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

const headers = ref([
  { title: "Data", sortable: true, value: "date" },
  { title: "Regime de Trabalho", sortable: true, value: "workSchedule" },
  { title: "Entrada", sortable: true, value: "checkIn" },
  { title: "Início Intervalo", sortable: true, value: "breakStart" },
  { title: "Fim Intervalo", sortable: true, value: "breakEnd" },
  { title: "Saída", sortable: false, value: "checkOut" },
  { title: "Somatória", sortable: false, value: "totalWorked" },
  { title: "Banco Horas", sortable: false, value: "timeBank" },
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


// const items = ref<any[]>([]);

const openModal = (typeOfAction: string, data: any | null) => {
  if (typeOfAction === "EDIT") {
    recuverData.value = data;
    typeAction.value = "EDIT";
    const infoData: any = recuverData.value;
    nome.value = infoData.nome;
    cpf.value = infoData.cpf;
    nasc.value = data.nasc;
    cargo.value = infoData.cargo;
    unidade.value = infoData.unidade?.[0]?.desc;
    sexo.value = infoData.sexo;
    email.value = infoData.email;
    password.value = infoData.password;
    
  } else {
    recuverData.value = null;
    typeAction.value = "CREATE";

    nome.value = "";
    cpf.value = "";
    nasc.value = "";
    cargo.value = "";
    unidade.value = "";
    sexo.value = "";
    email.value = "";
    password.value = "";
  }

  dialog.value = true;
};

const handleSavePerson = async () => {
  try {
    const unidadeSelecionada = unidadesMap.find((u) => u.enum === Number(unidade.value));
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
    // await atualizarGrid();
  } catch (error) {
    toast.error("Erro ao salvar colaborador!");
    console.error(error);
  }
};

// const filteredItems = computed(() => {
//   return items.value.filter((item) => {
//     const itemUnidade = item.unidade?.[0]?.desc?.toLowerCase?.() || "";
//     const filtroUnidade = filters.value.unidade?.toLowerCase?.() || "";

//     const matchUnidade =
//       !filters.value.unidade || itemUnidade === filtroUnidade;

//     const matchSexo =
//       !filters.value.sexo || item.sexo === filters.value.sexo;

//     const matchKeyword =
//       !filters.value.keyword ||
//       item.nome.toLowerCase().includes(filters.value.keyword.toLowerCase()) ||
//       item.cpf.toLowerCase().includes(filters.value.keyword.toLowerCase()) ||
//       itemUnidade.includes(filters.value.keyword.toLowerCase()); // ✅ agora também busca por unidade

//     return matchUnidade && matchSexo && matchKeyword;
//   });
// });

const goToCalendar = () => {
  // aqui você define a rota desejada
  console.log('CAIU NO GO TO CALENDAR');
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

const gerarSemana = (baseDate: Date, qtdDias: number) => {
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  const diasGerados: any[] = []

  const horarios = ["07:50", "08:00", "08:10", "08:20", "08:30", "08:45", "09:00"]

  for (let i = 0; i < qtdDias; i++) {
    const data = new Date(baseDate)
    data.setDate(baseDate.getDate() + i)

    const diaSemana = diasSemana[data.getDay()]
    const dataFormatada = `${diaSemana} ${data.toLocaleDateString("pt-BR")}`

    const checkIn = horarios[i % horarios.length]

    diasGerados.push({
      id: i + 1,
      date: dataFormatada,
      workSchedule: "Escritório 08h às 18h",
      checkIn,
      breakStart: "12:00",
      breakEnd: "13:00",
      checkOut: "18:00",
      totalWorked: "09:00",
      timeBank: "+00:30"
    })
  }

  return diasGerados
}


const items = ref(gerarSemana(new Date(2025, 11, 29), 7));


// const atualizarGrid = async () => {
//   const colaboradores = await JornadaColabAdmService.findColaboradores();
//   colaboradores.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
//   completeData.value = colaboradores;

//   items.value = colaboradores.map((colab: any, index: number) => ({
//     cod: index + 1,
//     id: colab.id,
//     nome: colab.nome,
//     cpf: colab.cpf,
//     nasc: colab.dataNascimento,
//     cargo: colab.cargo,
//     unidade: colab.unidade,
//     sexo: colab.sexo,
//     email: colab.email,
//     isActive: colab.isActive,
//     password: colab.password,
//     actions: "...",
//   }));
// };



onMounted(async () => {
//   await atualizarGrid();
});

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
  rowsPerPage: 15,
});
</script>

<style lang="scss" scoped>
.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
}

.position-component {
  padding-top: 80px;
  padding-left: 60px;
}

.hover-row:hover {
  background-color: #e4f1fb; /* cor de destaque */
  cursor: pointer;          /* opcional: mostra que é interativo */
}

.mg-pers {
  margin-bottom: 50px;
}

.icon-pers {
  // display: none;
  position: relative;
  top: 2px !important;
  font-size: 20px;
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

.bg-green-100 {
  background-color: #d4edda;
}
.bg-orange-100 {
  background-color: #fff3cd;
}
.bg-red-100 {
  background-color: #f8d7da;
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