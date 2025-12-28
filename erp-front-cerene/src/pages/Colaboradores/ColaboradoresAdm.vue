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
          Criar Tarefa
        </v-btn>
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
          Criar Tarefa
        </v-card-title>

        <v-card-text class="scrollable-content">
          <!-- <task-form 
            :data-task="selectedTask" 
            :type-action="typeAction" 
            @close-modal="closeModal"
          /> -->
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
          v-model="filters.category"
          label="Filtrar por unidade"
          :items="['Administração Central', 'Cerene de Joinville', 'Cerene de Palhoça']"
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
          v-model="filters.priority"
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
        item-key="id"
        class="elevation-1"
        :items-per-page-options="[5, 10, 15]"
        :items-per-page="pagination.rowsPerPage"
      >
        <template #item="props">
          <tr :key="props.item.id">
            <td class="py-3 px-4 flex items-center">
              <span>{{ props.item.title.length > 20 ? props.item.title.slice(0, 20) + '...' : props.item.title }}</span>
            </td>
            <td class="py-3 px-4">
              {{ props.item.description.length > 12 ? props.item.description.slice(0, 12) + '...' : props.item.description }}
            </td>
            <td class="py-3 px-4">
              {{ props.item.category }}
            </td>
            <td class="py-0 px-4">
              <v-chip
                :color="getPriorityColor(props.item.priority)"
                text-color="white"
                class="capitalize"
              >
                {{ props.item.priority }}
              </v-chip>
            </td>
            <td class="py-3 px-4">
              <i class="mdi mdi-calendar-month text-gray-500" /> {{ props.item.dueDate }}
            </td>
            <td class="py-3 px-4 flex items-center">
              <button
                class="text-blue-500"
                @click="openModal('EDIT', props.item)"
              >
                <i class="mdi mdi-pencil" />
              </button>
              <button
                class="text-red-500 ml-2"
                @click="handleDeleteTask(props.item.id)"
              >
                <i class="mdi mdi-delete" />
              </button>
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
// import { ref, onMounted, watch, computed } from "vue";
import { ref, onMounted, watch } from "vue";
import colaboradorService from "@/services/colaboradorService";
// import LoginService from "../services/loginService";
// import { useRouter } from "vue-router";
// import { useToast } from "vue-toastification";
// import { getUserTasks, deleteTask } from "../services/AddTaskService";
// import Swal from "sweetalert2";
// import { useToast } from "vue-toastification";

// const validateToken = async () => {
//   const router = useRouter(); // Certifique-se de usar o `useRouter` no escopo correto
//   const token = localStorage.getItem("token");
//   const isLoading = ref(true);
//   const toast = useToast();

//   if (!token) {
//     setTimeout(() => {
//       router.push("/login");
//     }, 500);
//     return;
//   }

//   const isValid = await LoginService.validateToken(token);

//   if (isValid) {
//     router.push("/dashboard");
//     isLoading.value = false;
//   } else {
//     localStorage.removeItem("token");
//     setTimeout(() => {
//       router.push("/login");
//     }, 500);
//     toast.error("Sessão expirada. Por favor, faça login novamente.");
//   }
// };

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   priority: string;
//   dueDate: string;
//   category: { id: number; title: string };
// }

const headers = ref([
  { title: "Cód", sortable: true, value: "cod" },
  { title: "Nome", sortable: true, value: "nome" },
  { title: "Unidade", sortable: true, value: "unidade" },
  { title: "Sexo", sortable: true, value: "sexo" },
  { title: "CPF", sortable: true, value: "cpf" },
  { title: "Ações", sortable: false, value: "actions" },
]);

// const selectedTask = ref<Task | null>(null);
const typeAction = ref("CREATE");

const filters = ref({
  category: "",
  priority: "",
  keyword: "",
});

const dialog = ref(false);
// const closeModal = () => {
//   dialog.value = false;
//   const storedUserId = localStorage.getItem("userId");
//   fetchTasks(String(storedUserId));
// };

const items = ref([]);
const userId = ref("");
// const toast = useToast();

// const openModal = (typeTask: string, task: Task | null) => {
//   if (typeTask === "EDIT") {
//     selectedTask.value = task;
//     typeAction.value = "EDIT";
//   } else {
//     selectedTask.value = null;
//     typeAction.value = "CREATE";
//   }
//   dialog.value = true;
// };

// const filteredItems = computed(() => {
//   return items.value.filter((item) => {
//     const matchCategory = filters.value.category
//       ? String(item.category) === filters.value.category
//       : true;

//     const matchPriority = filters.value.priority
//       ? item.priority === filters.value.priority
//       : true;

//     const matchKeyword = filters.value.keyword
//       ? item.title
//           .toLowerCase()
//           .includes(filters.value.keyword.toLowerCase()) ||
//         item.description
//           .toLowerCase()
//           .includes(filters.value.keyword.toLowerCase()) ||
//         item.dueDate.includes(filters.value.keyword)
//       : true;

//     return matchCategory && matchPriority && matchKeyword;
//   });
// });

watch(filters, () => {}, { deep: true });

// const fetchTasks = async (param: string) => {
//   try {
//     const tasks = await getUserTasks(param);
//     items.value = tasks;
//   } catch (error) {
//     console.error("Erro ao buscar as tarefas:", error);
//   }
// };

onMounted(async () => {
  const colaboradores = await colaboradorService.findColaboradores();
  // items.value = colaboradores;
});

const handleDeleteTask = async (taskId) => {
  console.log(taskId);
};

const openModal = async (taskId, any) => {
  console.log(taskId, any);
};

// const handleDeleteTask = async (taskId: string) => {
//   try {
//     const result = await Swal.fire({
//       title: "Você tem certeza?",
//       text: "Esta tarefa será excluída permanentemente!",
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonColor: "#a9dfab",
//       confirmButtonColor: "#e0a99e",
//       confirmButtonText: "Sim, excluir!",
//       cancelButtonText: "Cancelar",
//       reverseButtons: true,
//       customClass: {
//         confirmButton: "confirm-btn",
//         cancelButton: "cancel-btn",
//       },
//     });

//     if (result.isConfirmed) {
//       await deleteTask(taskId);
//       toast.success("Exclusão realizada com sucesso!");
//       const storedUserId = localStorage.getItem("userId");
//       fetchTasks(String(storedUserId));
//     }
//   } catch {
//     toast.error("Erro ao excluir. Tente novamente!");
//   }
// };

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "red";
    case "Média":
      return "orange";
    case "Baixa":
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
  padding-top: 80px;
  padding-left: 60px;
}

/* Quando a tela for menor que 1280px */
@media (max-width: 1280px) {
  .position-component {
    padding-left: 15px;
  }
}
</style>