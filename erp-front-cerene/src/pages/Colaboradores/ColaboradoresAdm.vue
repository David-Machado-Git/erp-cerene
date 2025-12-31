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
        <v-btn
          color="green"
          class="d-flex align-center mb-4 py-2 px-4 text-uppercase font-weight-bold"
          @click="openModal('CREATE', null)"
        >
          <v-icon left>
            mdi-plus-circle
          </v-icon>
          INSERIR
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="1200px"
      height="680px"
    >
      <v-card>
        <v-card-title
          class="d-flex align-center"
          style="background-color: #528ad0; color: white;"
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
            max-width="1200"
            rounded="lg"
            color=""
          >
            <VRow>
              <VCol>
                <h3 class="mb-2">
                  Cadastro de Usuário
                </h3>
                <p class="mb-6">
                  Preencha as informações abaixo
                </p>

                <!-- Primeira linha -->
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="nome"
                      label="Digite seu nome"
                      prepend-inner-icon="mdi-account-outline"
                      prepend-inner-icon-color="primary"
                      density="comfortable"
                      variant="outlined"
                      required
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="cpf"
                      label="Digite seu CPF"
                      prepend-inner-icon="mdi-card-account-details-outline"
                      prepend-inner-icon-color="indigo"
                      density="comfortable"
                      variant="outlined"
                      maxlength="14"
                      required
                    />
                  </VCol>
                </VRow>

                <!-- Segunda linha -->
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="nasc"
                      label="Data de Nascimento"
                      prepend-inner-icon="mdi-calendar"
                      prepend-inner-icon-color="deep-purple"
                      density="comfortable"
                      variant="outlined"
                      type="date"
                      required
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="cargo"
                      label="Digite seu cargo"
                      prepend-inner-icon="mdi-briefcase-outline"
                      prepend-inner-icon-color="teal"
                      density="comfortable"
                      variant="outlined"
                      required
                    />
                  </VCol>
                </VRow>

                <!-- Terceira linha -->
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="unidade"
                      :items="unidadesMap"
                      item-title="desc"
                      item-value="enum"
                      label="Unidade de Trabalho"
                      prepend-inner-icon="mdi-office-building"
                      prepend-inner-icon-color="orange"
                      density="comfortable"
                      variant="outlined"
                      required
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="sexo"
                      :items="['Masculino', 'Feminino']"
                      label="Sexo"
                      prepend-inner-icon="mdi-gender-male-female"
                      prepend-inner-icon-color="pink"
                      density="comfortable"
                      variant="outlined"
                      required
                    />
                  </VCol>
                </VRow>

                <!-- Quarta linha -->
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="email"
                      label="Digite seu e-mail"
                      prepend-inner-icon="mdi-email-outline"
                      prepend-inner-icon-color="cyan"
                      density="comfortable"
                      variant="outlined"
                      type="email"
                      required
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="password"
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      label="Digite sua senha"
                      prepend-inner-icon="mdi-lock-outline"
                      prepend-inner-icon-color="red"
                      density="comfortable"
                      variant="outlined"
                      required
                      @click:append-inner="visible = !visible"
                    />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>

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
                <!-- Editar -->
                <button
                  class="text-blue-500"
                  @click="openModal('EDIT', props.item)"
                >
                  <i class="mdi mdi-pencil icon-pers-p" />
                </button>

                <!-- Deletar -->
                <button
                  class="text-red-500 ml-2"
                  @click="handleDeletePerson(props.item)"
                >
                  <i class="mdi mdi-delete icon-pers" />
                </button>

                <!-- Bloquear / Liberar -->
                <button
                  class="ml-2"
                  @click="toggleActiveStatus(props.item)"
                >
                  <v-icon :color="props.item.isActive ? 'green' : 'red'">
                    {{ props.item.isActive ? 'mdi-lock-open' : 'mdi-lock' }}
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import colaboradorService from "@/services/colaboradorService";
import { useToast } from "vue-toastification";
import cadastroService from "@/services/cadastroService";
import Swal from "sweetalert2";


interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: { id: number; title: string };
}

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
  { title: "Cód", sortable: true, value: "cod" },
  { title: "Nome", sortable: true, value: "nome" },
  { title: "Unidade", sortable: true, value: "unidade" },
  { title: "Sexo", sortable: true, value: "sexo" },
  { title: "CPF", sortable: true, value: "cpf" },
  { title: "Ações", sortable: false, value: "actions" },
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
      await colaboradorService.atualizarColaborador(recuverData.value.id, dadosCadastro);
      toast.success("Colaborador atualizado com sucesso!");
    }

    dialog.value = false;
    await atualizarGrid();
  } catch (error) {
    toast.error("Erro ao salvar colaborador!");
    console.error(error);
  }
};

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const itemUnidade = item.unidade?.[0]?.desc?.toLowerCase?.() || "";
    const filtroUnidade = filters.value.unidade?.toLowerCase?.() || "";

    const matchUnidade =
      !filters.value.unidade || itemUnidade === filtroUnidade;

    const matchSexo =
      !filters.value.sexo || item.sexo === filters.value.sexo;

    const matchKeyword =
      !filters.value.keyword ||
      item.nome.toLowerCase().includes(filters.value.keyword.toLowerCase()) ||
      item.cpf.toLowerCase().includes(filters.value.keyword.toLowerCase()) ||
      itemUnidade.includes(filters.value.keyword.toLowerCase()); // ✅ agora também busca por unidade

    return matchUnidade && matchSexo && matchKeyword;
  });
});


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

// const cadastrar = async () => {
//   const usuarioSelecionado = usuariosMap.find((u) => u.role === "USER");
//   const unidadeSelecionada = unidadesMap.find((u) => u.enum === Number(unidade.value));

//   const dadosCadastro = {
//     nome: nome.value,
//     cpf: cpf.value,
//     dataNascimento: nasc.value,
//     cargo: cargo.value,
//     email: email.value,
//     unidade: [
//       {
//         desc: unidadeSelecionada?.desc,
//         enum: unidadeSelecionada?.enum,
//       },
//     ],
//     sexo: sexo.value,
//     usuario: [
//       {
//         login: email.value,
//         password: password.value,
//         role: usuarioSelecionado?.role,
//         enum: usuarioSelecionado?.enum,
//       },
//     ],
//   };

//   try {
//     await cadastroService.registrarUsuario(dadosCadastro);

//     dialog.value = false;

//     await atualizarGrid()

//     toast.success("Cadastro realizado com sucesso!");
//   } catch (error) {
//     console.error("Erro ao cadastrar usuário:", error);
//   }
// };



watch(filters, () => {}, { deep: true });

watch(cpf, (newVal) => {
  cpf.value = formatCpf(newVal);
});

const atualizarGrid = async () => {
  const colaboradores = await colaboradorService.findColaboradores();
  colaboradores.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
  completeData.value = colaboradores;

  items.value = colaboradores.map((colab: any, index: number) => ({
    cod: index + 1,
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
  }));
};

const toggleActiveStatus = async (item: any) => {
  try {
    const novoStatus = !item.isActive;

    await colaboradorService.atualizarColaborador(item.id, {
      isActive: novoStatus,
    });

    item.isActive = novoStatus; // atualiza localmente
    toast.success(
      novoStatus
        ? "Cadastro liberado com sucesso!"
        : "Cadastro bloqueado com sucesso!"
    );

    await atualizarGrid(); // recarrega a tabela
  } catch (error) {
    toast.error("Erro ao atualizar status do cadastro!");
    console.error(error);
  }
};



onMounted(async () => {
  await atualizarGrid();
  // popularBaseDeTeste();
});

// const popularBaseDeTeste = async () => {
//   const nomes = [
//     "Jean", "Fabio", "Armando", "Ana", "Beatriz", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gustavo",
//     "Helena", "Igor", "Juliana", "Kleber", "Larissa", "Marcos", "Nathalia", "Otávio", "Patrícia", "Rafael",
//     "Sandra", "Thiago", "Ursula", "Vinícius", "Wesley", "Xuxa", "Yasmin", "Zeca", "Bruna", "Caio",
//     "Débora", "Eliane", "Felipe", "Gabriela", "Henrique", "Isabela", "João", "Karen", "Leonardo", "Marta",
//     "Nicole", "Orlando", "Paula", "Renato", "Sabrina", "Tadeu", "Valéria", "William", "Yuri", "Zuleica"
//   ];

//   const unidades = [
//     { desc: "Administração Central", enum: 1 },
//     { desc: "Cerene Blumenau", enum: 2 },
//     { desc: "Cerene Gaspar - NVR", enum: 3 },
//     { desc: "Cerene Joinville", enum: 4 },
//     { desc: "Cerene São Bento do Sul", enum: 5 },
//     { desc: "Cerene Lapa", enum: 6 },
//     { desc: "Cerene Ituporanga", enum: 7 },
//     { desc: "Cerene Palhoça", enum: 8 },
//   ];

//   const perfis = [
//     { desc: "Administrador", role: "ADMIN", enum: 1 },
//     { desc: "Gerente", role: "MANAGER", enum: 2 },
//     { desc: "Usuário", role: "USER", enum: 3 },
//   ];

//   const gerarCpfFormatado = (i: number) => {
//     const base = String(100000000 + i).padStart(9, "0");
//     return `${base.slice(0, 3)}.${base.slice(3, 6)}.${base.slice(6, 9)}-${String(i).padStart(2, "0")}`;
//   };

//   for (let i = 0; i < 50; i++) {
//     const nome = `${nomes[i % nomes.length]} ${nomes[(i + 1) % nomes.length]} ${nomes[(i + 2) % nomes.length]}`;
//     const email = `usuario${i + 1}@teste.com`;
//     const cpf = gerarCpfFormatado(i + 1);
//     const unidade = unidades[i % unidades.length];
//     const perfil = perfis[i % perfis.length];
//     const sexo = i % 2 === 0 ? "Masculino" : "Feminino";

//     const dadosCadastro = {
//       id: `fake-id-${i + 1}`,
//       nome,
//       cpf,
//       dataNascimento: `199${i % 10}-0${(i % 9) + 1}-15`,
//       cargo: perfil.desc,
//       email,
//       isActive: true,
//       role: perfil.role,
//       unidade: [
//         {
//           desc: unidade.desc,
//           enum: unidade.enum,
//         },
//       ],
//       sexo,
//       password: "Teste123",
//       usuario: [
//         {
//           login: email,
//           password: "Teste123",
//           role: perfil.role,
//           enum: perfil.enum,
//         },
//       ],
//     };

//     try {
//       await cadastroService.registrarUsuario(dadosCadastro);
//       console.log(`✅ ${nome} cadastrado com sucesso!`);
//     } catch (error) {
//       console.error(`❌ Erro ao cadastrar ${nome}:`, error);
//     }
//   }
// };


const handleDeletePerson = async (task) => {
  try {
    const result = await Swal.fire({
      title: "Confirmação",
      text: `Deseja mesmo excluir: ${task.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e0a99e",
      cancelButtonColor: "#a9dfab",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await colaboradorService.deleteColaborador(task.id);

      toast.success(`Colaborador ${task.nome} excluído com sucesso!`);

      await atualizarGrid();
    } else {
      toast.info("Exclusão cancelada.");
    }
  } catch (error) {
    toast.error("Erro ao excluir. Tente novamente!");
    console.error(error);
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
  rowsPerPage: 15,
});
</script>

<style lang="scss" scoped>
.scrollable-content {
  max-height: 620px;
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

// @media (max-width: 980px) {
//   .icon-pers {
//     // display: none;
//     // position: relative;
//     // top: 5px !important;
//     font-size: 18px;
//   }
// }
</style>