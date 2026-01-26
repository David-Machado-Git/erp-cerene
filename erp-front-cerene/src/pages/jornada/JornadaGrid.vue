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

    <!-- INÍCIO MODAL -->

    <v-dialog
      v-model="dialog"
      max-width="900px"
      class="custom-dialog"
    >
      <v-card>
        <!-- Cabeçalho -->
        <v-card-title
          class="d-flex align-center justify-space-between flex-wrap"
          style="background-color: #528ad0; color: white;"
        >
          <!-- Título -->
          <div class="d-flex align-center">
            <v-icon
              left
              class="mr-2"
            >
              mdi-file-document-edit
            </v-icon>
            Justificativa / Anexo
          </div>

          <!-- Status (select + chip ao lado) -->
          <div
            class="d-flex align-center"
            style="gap: 12px;"
          >
            <!-- Admin: seletor simples de strings -->
            <v-select
              v-if="typeUser === 'admin'"
              v-model="statusJustificativa"
              :items="['Aguardando Aprovação', 'Aprovada', 'Reprovada']"
              density="compact"
              hide-details
              style="max-width: 240px;"
              label="Status"
            />

            <!-- Visualização (sempre mostra) -->
            <v-chip
              :color="getStatusColor(statusJustificativa)"
              text-color="white"
              class="font-weight-bold"
            >
              <v-icon left>
                {{ getStatusIcon(statusJustificativa) }}
              </v-icon>
              {{ statusJustificativa || 'Aguardando Aprovação' }}
            </v-chip>
          </div>
        </v-card-title>






        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- Card 1: Justificativa -->
                <v-card
                  class="pa-4 mb-6"
                  elevation="4"
                  rounded="lg"
                  color="blue-grey-lighten-5"
                >
                  <v-card-title
                    class="text-subtitle-1 font-weight-bold"
                    style="color:#1976D2;"
                  >
                    <v-icon
                      left
                      class="mr-2"
                      color="primary"
                    >
                      mdi-pencil
                    </v-icon>
                    Escreva sua justificativa
                  </v-card-title>

                  <p class="mb-4">
                    Digite manualmente o motivo ou justificativa.
                  </p>

                  <v-textarea
                    v-model="justificativa"
                    label="Digite aqui..."
                    auto-grow
                    rows="5"
                    variant="outlined"
                    prepend-inner-icon="mdi-text-box-edit-outline"
                  />
                  <div
                    v-if="arquivoExistente"
                    class="mt-4"
                  >
                    <v-alert
                      type="info"
                      border="start"
                      color="blue-lighten-4"
                    >
                      <v-icon
                        left
                        class="mr-2"
                      >
                        mdi-file
                      </v-icon>
                      Arquivo já anexado:
                      <strong>{{ arquivoExistente.nome }}</strong>
                      <v-btn
                        variant="tonal"
                        color="primary"
                        class="ml-4"
                        :href="arquivoExistente.url"
                        target="_blank"
                        download
                      >
                        <v-icon
                          left
                          class="mr-2"
                        >
                          mdi-download
                        </v-icon>
                        Download
                      </v-btn>
                    </v-alert>
                  </div>
                </v-card>

                <!-- Card 2: Anexo -->
                <v-card
                  class="pa-4 mb-6"
                  elevation="4"
                  rounded="lg"
                  color="grey-lighten-4"
                >
                  <v-card-title
                    class="text-subtitle-1 font-weight-bold"
                    style="color:#424242;"
                  >
                    <v-icon
                      left
                      class="mr-2"
                      color="indigo"
                    >
                      mdi-paperclip
                    </v-icon>
                    Anexar Arquivo
                  </v-card-title>

                  <p class="mb-4">
                    Se necessário, anexe um arquivo (PDF, DOC ou imagem).
                  </p>

                  <v-file-input
                    v-model="arquivo"
                    label="Selecione um arquivo"
                    prepend-inner-icon="mdi-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    variant="outlined"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- Ações -->
        <v-card-actions>
          <div
            class="d-flex justify-center mx-auto"
            style="width: 320px;"
          >
            <v-btn
              class="mb-3"
              variant="tonal"
              color="green-darken-4"
              block
              :loading="loading"
              :disabled="loading"
              @click="saveJustific"
            >
              SALVAR
            </v-btn>
          </div>
          <v-btn
            color="blue"
            :disabled="loading"
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
        <v-overlay
          v-model="loading"
          contained
          absolute
          class="preloader-overlay"
        >
          <v-sheet
            elevation="6"
            rounded="lg"
            class="pa-6 d-flex flex-column align-center"
            style="background-color: white; min-width: 280px;"
          >
            <v-progress-circular
              indeterminate
              size="48"
              color="primary"
            />
            <div class="mt-3 font-weight-bold">
              Salvando justificativa...
            </div>
          </v-sheet>
        </v-overlay>
      </v-card>
    </v-dialog>


    <!-- FIM MODAL -->

    <v-card
      class="pa-4 mb-6"
      elevation="6"
      rounded="xl"
      color="blue-grey-lighten-6"
    >
      <v-row class="align-center">
        <!-- Foto redonda com borda -->
        <v-col
          cols="12"
          md="2"
          class="d-flex justify-center"
        >
          <div class="avatar-container">
            <v-avatar
              size="180"
              class="mb-2"
              color="#528ad0"
            >
              <v-img
                :src="colab?.urlPhoto || 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'"
                alt="Foto do colaborador"
                cover
              >
                <template #placeholder>
                  <div class="loading-blink">
                    Carregando...
                  </div>
                </template>
              </v-img>
            </v-avatar>
          </div>
        </v-col>

        <!-- Dados compactados -->
        <v-col
          cols="12"
          md="9"
        >
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <h1
                class="font-weight-bold"
                style="color:#1976D2;"
              >
                {{ colab?.nome || "" }}
              </h1>
              <div class="text-caption text-grey-darken-1">
                {{ colab?.cargo || "" }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-icon
                color="deep-purple"
                class="mr-1"
              >
                mdi-card-account-details-outline
              </v-icon>
              <span class="text-caption"><strong>CPF:</strong> {{ colab?.cpf || "" }}</span><br>
              <v-icon
                color="green"
                class="mr-1"
              >
                mdi-calendar
              </v-icon>
              <span class="text-caption"><strong>Nascimento:</strong> {{ colab?.nasc || "" }}</span>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-icon
                color="orange"
                class="mr-1"
              >
                mdi-briefcase-outline
              </v-icon>
              <span class="text-caption"><strong>Cargo:</strong> {{ colab?.cargo || "" }}</span><br>
              <v-icon
                color="indigo"
                class="mr-1"
              >
                mdi-office-building
              </v-icon>
              <span class="text-caption"><strong>Unidade:</strong> {{ colab?.unidade?.[0]?.desc || "" }}</span>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col
              cols="12"
              md="6"
            >
              <v-icon
                color="pink"
                class="mr-1"
              >
                mdi-gender-male-female
              </v-icon>
              <span class="text-caption"><strong>Sexo:</strong> {{ colab?.sexo || "" }}</span>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-icon
                color="red"
                class="mr-1"
              >
                mdi-email-outline
              </v-icon>
              <span
                class="text-caption cursor-pointer"
                style="text-decoration: underline; color: #1976D2;"
                @click="copiarEmail(colab?.email)"
              >
                <strong>E-mail:</strong> {{ colab?.email || "" }}
              </span>
            </v-col>

            <!-- Novo campo: ID -->
            <v-col
              cols="12"
              md="6"
            >
              <v-icon
                color="blue"
                class="mr-1"
              >
                mdi-identifier
              </v-icon>
              <span
                class="text-caption cursor-pointer"
                style="text-decoration: underline; color: #1976D2;"
                @click="copiarId"
              >
                <strong>ID:</strong> {{ colab?.id || "" }}
              </span>
            </v-col>
          </v-row>
        </v-col>

        <!-- Botão Voltar à direita -->
        <v-col
          cols="12"
          md="1"
          class="d-flex justify-end"
        >
          <v-btn
            color="blue-grey-darken-1"
            variant="tonal"
            rounded="lg"
            class="ma-16 btn-voltar"
            @click="voltar"
          >
            <v-icon left>
              mdi-arrow-left
            </v-icon>
            Voltar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>


    <!-- Painel de apontamentos -->
    <v-row
      v-if="!diaAtualCompleto"
      class="mb-4"
    >
      <v-col
        cols="11"
        style="margin: auto;"
      >
        <!-- 🔹 Cabeçalho moderno com instrução -->
        <div class="text-center mb-4">
          <h2
            class="font-weight-bold"
            style="color:#2e7d32;"
          >
            Registre seus horários
          </h2>
          <p
            class="subtitle-2"
            style="color:#555;"
          >
            Faça seus apontamentos clicando no botão abaixo
          </p>
        </div>

        <v-card
          outlined
          class="pa-4 d-flex justify-space-around flex-wrap"
        >
          <!-- Entrada -->
          <v-btn
            v-if="!diaAtual?.checkIn"
            color="success"
            class="ma-2 btn-clock"
            @click="registrarHorarioDiaAtual('checkIn')"
          >
            <div class="btn-content">
              <v-icon size="40">
                mdi-login
              </v-icon>
              <span>Entrada</span>
              <v-chip
                small
                color="white"
                class="btn-chip"
              >
                {{ horaAtualTexto }}
              </v-chip>
            </div>
          </v-btn>

          <!-- Início Intervalo -->
          <v-btn
            v-else-if="diaAtual?.checkIn && !diaAtual?.breakStart"
            color="warning"
            class="ma-2 btn-clock"
            @click="registrarHorarioDiaAtual('breakStart')"
          >
            <div class="btn-content">
              <v-icon size="40">
                mdi-food
              </v-icon>
              <span>Início Intervalo</span>
              <v-chip
                small
                color="white"
                class="btn-chip"
              >
                {{ horaAtualTexto }}
              </v-chip>
            </div>
          </v-btn>

          <!-- Fim Intervalo -->
          <v-btn
            v-else-if="diaAtual?.breakStart && !diaAtual?.breakEnd"
            color="success"
            class="ma-2 btn-clock"
            @click="registrarHorarioDiaAtual('breakEnd')"
          >
            <div class="btn-content">
              <v-icon size="40">
                mdi-food-off
              </v-icon>
              <span>Fim Intervalo</span>
              <v-chip
                small
                color="white"
                class="btn-chip"
              >
                {{ horaAtualTexto }}
              </v-chip>
            </div>
          </v-btn>

          <!-- Saída -->
          <v-btn
            v-else-if="diaAtual?.breakEnd && !diaAtual?.checkOut"
            color="warning"
            class="ma-2 btn-clock"
            @click="registrarHorarioDiaAtual('checkOut')"
          >
            <div class="btn-content">
              <v-icon size="40">
                mdi-logout
              </v-icon>
              <span>Saída</span>
              <v-chip
                small
                color="white"
                class="btn-chip"
              >
                {{ horaAtualTexto }}
              </v-chip>
            </div>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>




    <v-row
      class="align-center justify-center"
      no-gutters
    >
      <!-- De -->
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-center mb-4 mb-md-0 mr-7"
      >
        <v-menu
          v-model="menuDe"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="filters.dataDe"
              label="De"
              prepend-icon="mdi-calendar-start"
              readonly
              clearable
              class="ml-3"
              v-bind="props"
            />
          </template>
          <v-date-picker
            v-model="filters.dataDe"
            :allowed-dates="datasDisponiveis"
            locale="pt"
          />
        </v-menu>
      </v-col>

      <!-- Até -->
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-center mb-4 mb-md-0 mr-7"
      >
        <v-menu
          v-model="menuAte"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="filters.dataAte"
              label="Até"
              prepend-icon="mdi-calendar-end"
              readonly
              clearable
              class="ml-3"
              v-bind="props"
            />
          </template>
          <v-date-picker
            v-model="filters.dataAte"
            :allowed-dates="datasDisponiveis"
            locale="pt"
          />
        </v-menu>
      </v-col>

      <!-- Palavra-chave -->
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-center mb-4 mb-md-0 mr-7"
      >
        <v-text-field
          v-model="filters.keyword"
          label="Palavras chave"
          prepend-icon="mdi-magnify"
          class="w-full ml-3"
          clearable
        />
      </v-col>
    </v-row>

    <main style="margin-bottom: 90px; width: 98%; margin: auto;">
      <!-- Resumo -->
      <v-row
        class="mb-4"
        style="max-width: 94%; margin: auto"
      >
        <!-- Total de Horas Trabalhadas -->
        <v-col
          cols="12"
          md="5"
        >
          <v-card
            outlined
            class="pa-4 d-flex align-center"
          >
            <v-icon
              color="primary"
              size="36"
              class="mr-3"
            >
              mdi-clock-check-outline
            </v-icon>
            <div>
              <div class="text-subtitle-1 font-weight-medium">
                Total de Horas Trabalhadas
              </div>
              <div class="text-h5 font-weight-bold text-primary">
                {{ totalHorasTrabalhadasFormatado }}
              </div>
              <small class="text-caption text-grey">
                {{ totalHorasTrabalhadas }} min
              </small>
            </div>
          </v-card>
        </v-col>

        <!-- Banco de Horas Total -->
        <v-col
          cols="12"
          md="5"
        >
          <v-card
            outlined
            class="pa-4 d-flex align-center"
          >
            <v-icon
              :color="bancoHorasTotal.startsWith('+') ? 'success' : 'error'"
              size="36"
              class="mr-3"
            >
              mdi-timer-sand
            </v-icon>
            <div>
              <div class="text-subtitle-1 font-weight-medium">
                Banco de Horas Total
              </div>
              <div
                class="text-h5 font-weight-bold"
                :class="{
                  'text-success': bancoHorasTotal.startsWith('+'),
                  'text-error': bancoHorasTotal.startsWith('-')
                }"
              >
                {{ bancoHorasTotal }}
              </div>
              <small class="text-caption text-grey">Saldo acumulado</small>
            </div>
          </v-card>
        </v-col>
      </v-row>




      <!-- Tabela de registros -->
      <v-data-table
        v-model:pagination="pagination"
        :headers="headers"
        :items="filteredItems"
        item-key="id"
        class="elevation-1 mg-pers"
        :items-per-page-options="[5, 10, 15]"
        :items-per-page="pagination.rowsPerPage"
      >
        <template #item="{ item }">
          <tr
            :style="
              item.status === 'faltou'
                ? 'background-color: #B71C1C; color: white;'
                : ''
            "
          >
            <td>{{ item.date }}</td>
            <td>{{ item.workSchedule }}</td>
            <td>{{ item.checkIn || '—' }}</td>
            <td>{{ item.breakStart || '—' }}</td>
            <td>{{ item.breakEnd || '—' }}</td>
            <td>{{ item.checkOut || '—' }}</td>
            <td
              :class="{
                'bg-green-100': item.totalWorked && item.totalWorked >= '08:00',
                'bg-red-100': item.totalWorked && item.totalWorked < '08:00'
              }"
            >
              {{ item.totalWorked || '—' }}
            </td>
            <td
              :class="{
                'bg-green-100 text-success d-flex align-center': item.timeBank?.startsWith('+'),
                'bg-red-100 text-error d-flex align-center': item.timeBank?.startsWith('-')
              }"
            >
              <v-icon
                v-if="item.timeBank"
                size="16"
                class="mr-1"
                :color="item.timeBank.startsWith('+') ? 'success' : 'error'"
              >
                {{ item.timeBank.startsWith('+') ? 'mdi-arrow-up-bold-circle' : 'mdi-arrow-down-bold-circle' }}
              </v-icon>
              <span>{{ item.timeBank || '—' }}</span>
            </td>
            <td>
              {{ item.justific || '—' }}
              <v-icon
                size="22"
                class="cursor-pointer just-p"
                :class="item.hasJustificativa ? 'icon-alert-pulse' : ''"
                :title="item.hasJustificativa ? 'Baixar justificativa' : 'Inserir justificativa'"
                :color="item.hasJustificativa ? 'orange' : ''"
                @click="abrirJustificativa(item)"
              >
                {{ item.hasJustificativa ? 'mdi-alert-outline' : 'mdi-comment-edit-outline' }}
              </v-icon>
            </td>
          </tr>
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
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import JornadaColabAdmService from "@/services/JornadaColabAdmService";
import UploadStorageService from "@/services/UploadStorageService";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { eventBus } from "@/eventBus";

const loading = ref(false)
const statusJustificativa = ref("Aguardando Aprovação");
const typeUser = ref("admin") // variável de controle pra poder editar os registros
const colab = eventBus.colab;
const dataJustificInsert = ref<any>();
const router = useRouter();
// console.log("TESTANDOO => ", colab?.urlPhoto);
const horaAtualTexto = ref("");
const dialog = ref(false);
const justificativa = ref("");
const arquivo = ref(null);
const arquivoExistente = ref(null)
const isLoading = ref(true);
// const urlPhoto = ref<any>(colab?.urlPhoto || null);
if (!colab) {
  router.push("/dashboard/jornada-colaborador");
}

let audio;
const hoje = new Date();
const inicioSemana = new Date(hoje);inicioSemana.setDate(hoje.getDate() - hoje.getDay() + 1) // segunda-feira
// const qtdDias = hoje.getDate() - inicioSemana.getDate() + 1


// const router = useRouter();
const toast = useToast();
const cpf = ref("");

const headers = ref([
  { title: "Data", sortable: true, value: "date" },
  { title: "Regime de Trabalho", sortable: true, value: "workSchedule" },
  { title: "Entrada", sortable: true, value: "checkIn" },
  { title: "Início Intervalo", sortable: true, value: "breakStart" },
  { title: "Fim Intervalo", sortable: true, value: "breakEnd" },
  { title: "Saída", sortable: false, value: "checkOut" },
  { title: "Hrs TB do Dia", sortable: false, value: "totalWorked" },
  { title: "BC Hrs do Dia", sortable: false, value: "timeBank" },
  { title: "Justificativas", sortable: false, value: "justific" },
]);



const filters = ref({
  dataDe: null,
  dataAte: null,
  keyword: ""
});
const menuDe = ref(false);
const menuAte = ref(false);

const voltar = () => {
      router.back(); // volta para a rota anterior no histórico
    };


const diaAtualCompleto = computed(() => {
  const hoje = getLocalDateId();
  const item = items.value.find(i => getRegistroId(i) === hoje);

  // 🔹 Verifica se há filtro de datas ou palavra-chave ativo
  const filtroAtivo =
    !!filters.value.dataDe ||
    !!filters.value.dataAte ||
    !!filters.value.keyword; // agora também considera o campo keyword

  // 🔹 Considera completo se:
  // - todos os apontamentos foram feitos, OU
  // - existe qualquer filtro ativo (data ou keyword)
  return filtroAtivo || (
    item?.checkIn &&
    item?.breakStart &&
    item?.breakEnd &&
    item?.checkOut
  );
});







const copiarId = async () => {
  try {
    await navigator.clipboard.writeText(colab?.id || "");
    toast.success("ID copiado para a área de transferência!");
    tocarSom(); // se quiser o som de confirmação
  } catch (err) {
    console.error("Erro ao copiar ID:", err);
    toast.error("Não foi possível copiar o ID.");
  }
};

const registrarHorarioDiaAtual = async (campo) => {
  const hoje = getLocalDateId(); // ou use new Date().toISOString().split('T')[0]
  const item = filteredItems.value.find(i => getRegistroId(i) === hoje);
  if (!item) return;

  await registrarHorario(item, campo);
};

const diaAtual = computed(() => {
  const hoje = getLocalDateId();
  return filteredItems.value.find(i => getRegistroId(i) === hoje);
});



const copiarEmail = (data) => {
  const email = data;
  navigator.clipboard.writeText(email)
    .then(() => {
      toast.success("E-mail copiado para a área de transferência!");
      tocarSom();
    })
    .catch(() => {
      toast.error("Não foi possível copiar o e-mail.");
    });
};

const tocarSom = () => {
  if (audio) {
    audio.currentTime = 0; // garante que começa do início
    audio.play().catch(err => console.error("Erro ao tocar som:", err));
  }
};

// const isDiaAtual = (item) => getRegistroId(item) === getLocalDateId();

// const editingField = ref(null)

// mapeamento de cor/ícone
const getStatusColor = (status?: string) => {
  const s = status || 'Aguardando Aprovação'
  return s === 'Aprovada' ? 'green' : s === 'Reprovada' ? 'red' : 'orange'
}
const getStatusIcon = (status?: string) => {
  const s = status || 'Aguardando Aprovação'
  return s === 'Aprovada' ? 'mdi-check-circle' : s === 'Reprovada' ? 'mdi-close-circle' : 'mdi-clock-outline'
}


// const editarCampo = (item, field) => {
//   console.log(">>> [editarCampo] Chamado")
//   console.log(">>> Item recebido:", JSON.stringify(item, null, 2))
//   console.log(">>> Campo a editar:", field)

//   editingField.value = { id: item.id, field }
//   console.log(">>> Estado editingField atualizado:", editingField.value)
// }

// const salvarEdicao = async (item, field) => {
//   console.log(">>> [salvarEdicao] Chamado")
//   console.log(">>> Item recebido:", JSON.stringify(item, null, 2))
//   console.log(">>> Campo editado:", field)

//   editingField.value = null
//   console.log(">>> Estado editingField resetado:", editingField.value)

//   try {
//     await JornadaColabAdmService.salvarRegistro(item.idUser, item)
//     console.log(">>> Registro salvo com sucesso para usuário:", item.idUser)
//   } catch (error) {
//     console.error(">>> Erro ao salvar registro:", error)
//   }
// }



const datasDisponiveis = (date: Date) => {
  const dia = String(date.getDate()).padStart(2, "0")
  const mes = String(date.getMonth() + 1).padStart(2, "0")
  const ano = date.getFullYear()
  const dataFormatada = `${ano}-${mes}-${dia}`

  const datas = items.value.map(i =>
    i.date.split(" ")[1].split("/").reverse().join("-")
  )

  return datas.includes(dataFormatada)
};

// Normaliza texto para busca
const normalizar = (texto) => {
  return texto?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ""
};

// const isDiaAtualFinalizado = (item) => {
//   if (!item?.date) return false;

//   try {
//     const partes = item.date.split(" ")[1]?.split("/");
//     if (!partes || partes.length < 3) return false;

//     const dia = Number(partes[0]);
//     const mes = Number(partes[1]) - 1;
//     const ano = Number(partes[2]);

//     const dataItem = new Date(ano, mes, dia);

//     // Se a data for inválida, retorna false
//     if (isNaN(dataItem.getTime())) return false;

//     // Aqui você aplica sua lógica de "finalizado"
//     // Exemplo: se já tem checkOut preenchido
//     return !!item.checkOut;
//   } catch {
//     return false;
//   }
// };



// const getClass = (hora, referencia, operador) => {
//   if (!hora) return '';
//   const [h, m] = hora.split(':').map(Number);
//   const minutos = h * 60 + m;

//   const [rh, rm] = referencia.split(':').map(Number);
//   const refMin = rh * 60 + rm;

//   if (operador === '<=') return minutos <= refMin ? 'bg-green-100' : 'bg-red-100';
//   if (operador === '>=') return minutos >= refMin ? 'bg-green-100' : 'bg-red-100';
//   return '';
// };




// Função para pegar hora atual formatada
const horaAtual = () => {
  const now = new Date();
  return now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

// const diffMinutes = (horaAtual: string, horaEsperada: string) => {
//   const [hA, mA] = horaAtual.split(":").map(Number);
//   const [hE, mE] = horaEsperada.split(":").map(Number);
//   return (hA * 60 + mA) - (hE * 60 + mE);
// };

// const getColor = (horaAtual, horaLimite) => {
//   return horaAtual > horaLimite ? 'error' : 'success';
// };



const registrarHorario = async (item, campo) => {
  const idUser = colab.id;
  item[campo] = horaAtual();
  item.idUser = idUser;

  // console.log('CHEGOU NA FN REGISTRA HORÁRIO COM AS PROPRIEDADES: => ', item);
  

  calcularSomatoria(item); // sempre tenta calcular

  // console.log(`>>> Inserção realizada no campo: ${campo}`);
  // console.log("Item atualizado:", JSON.stringify(item, null, 2));

  await JornadaColabAdmService.salvarRegistro(idUser, item);
};

// Computed para filtrar
// const filteredItems = computed(() => {
  
//   return items.value.filter((item) => {
//     const keyword = normalizar(filters.value.keyword)
//     const dataDe = filters.value.dataDe
//     const dataAte = filters.value.dataAte

//     // Junta todas as colunas para busca por palavra-chave
//     const textoCompleto = [
//       item.date,
//       item.workSchedule,
//       item.checkIn,
//       item.breakStart,
//       item.breakEnd,
//       item.checkOut,
//       item.totalWorked,
//       item.timeBank
//     ].map(normalizar).join(" ")

//     const passaKeyword = !keyword || textoCompleto.includes(keyword)

//     // Converte a data do item para objeto Date
//     const [dia, mes, ano] = item.date.split(" ")[1].split("/")
//     const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia))

//     // Converte filtros para timestamp (se existirem)
//     const passaData =
//       (!dataDe || dataItem.getTime() >= new Date(dataDe).getTime()) &&
//       (!dataAte || dataItem.getTime() <= new Date(dataAte).getTime())

//     return passaKeyword && passaData
//   })
// });

const filteredItems = computed(() => {
  const resultado = items.value.filter((item) => {
    const keyword = normalizar(filters.value.keyword);
    const dataDe = filters.value.dataDe;
    const dataAte = filters.value.dataAte;

    const textoCompleto = [
      item.date,
      item.workSchedule,
      item.checkIn,
      item.breakStart,
      item.breakEnd,
      item.checkOut,
      item.totalWorked,
      item.timeBank
    ].map(normalizar).join(" ");

    const passaKeyword = !keyword || textoCompleto.includes(keyword);

    const [dia, mes, ano] = item.date.split(" ")[1].split("/");
    const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const passaData =
      (!dataDe || dataItem.getTime() >= new Date(dataDe).getTime()) &&
      (!dataAte || dataItem.getTime() <= new Date(dataAte).getTime());

    return passaKeyword && passaData;
  });

  // console.log(">>> Resultado do filteredItems:", resultado);
  return resultado;
});


const totalHorasTrabalhadas = computed(() => {
  return filteredItems.value.reduce((acc, item) => {
    if (item.totalWorked) {
      const [h, m] = item.totalWorked.split(':').map(Number);
      return acc + h * 60 + m;
    }
    return acc;
  }, 0);
});

const bancoHorasTotal = computed(() => {
  let totalMin = 0;
  filteredItems.value.forEach(item => {
    if (item.timeBank) {
      const sinal = item.timeBank.startsWith('-') ? -1 : 1;
      const [h, m] = item.timeBank.replace('+', '').replace('-', '').split(':').map(Number);
      totalMin += sinal * (h * 60 + m);
    }
  });
  const sinal = totalMin >= 0 ? '+' : '-';
  const absMin = Math.abs(totalMin);
  const h = Math.floor(absMin / 60);
  const m = absMin % 60;
  return `${sinal}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});


const totalHorasTrabalhadasFormatado = computed(() => {
  const totalMin = totalHorasTrabalhadas.value;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});

const abrirJustificativa = (data) => {
  statusJustificativa.value = data.statusJustificativa || "Aguardando Aprovação"
  // console.log("Abrir justificativa para registro:", data);

  dataJustificInsert.value = data;
  justificativa.value = data.justificativa || "";
  arquivo.value = null; // limpa input

  // se já existir arquivo salvo no registro
  if (data.fileUrl) {
    const partes = data.fileUrl.split("/");
    const nomeArquivo = partes[partes.length - 1].split("?")[0];

    arquivoExistente.value = {
      nome: nomeArquivo || "Arquivo disponível",
      url: data.fileUrl,
    };
  } else {
    arquivoExistente.value = null;
  }

  dialog.value = true;
};




const saveJustific = async () => {
  try {
    loading.value = true
    await UploadStorageService.saveJustificativa(
      dataJustificInsert.value.idUser,
      dataJustificInsert.value.id,
      justificativa.value,
      arquivo.value,
      statusJustificativa.value
    )

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Justificativa salva com sucesso!",
      showConfirmButton: false,
      timer: 3000,
    })

    justificativa.value = null
    arquivo.value = null
    dialog.value = false
  } catch (error) {
    console.error("Erro ao salvar justificativa:", error)
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Não foi possível salvar a justificativa. Tente novamente.",
      confirmButtonColor: "#d33",
    })
  } finally {
    loading.value = false
  }
}








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


const items = ref<any[]>([]);

onMounted(async () => {

  console.log('OS DADOS DO USUÁRIO A CHEGAR => ', colab);
  

  // 🔊 Som de clique
  audio = new Audio("/sound_click.mp3");
  audio.volume = 0.5;
  audio.load();

  // 🕒 Atualiza o relógio em tempo real
  const updateHora = () => {
    const agora = new Date();
    horaAtualTexto.value = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  updateHora();
  const interval = setInterval(updateHora, 1000);
  onUnmounted(() => clearInterval(interval));

  try {
    // 🚀 Início do carregamento
    isLoading.value = true;

    if (!colab || !colab.id) {
      items.value = gerarDiaAtual("sem-id");
    } else {
      const registros = (await JornadaColabAdmService.buscarRegistros(colab.id)) || [];
      console.log("REGISTROS =>>", registros);

      const hojeId = getLocalDateId(); // data local, não UTC
      const jaTemHoje = registros.some((r) => getRegistroId(r) === hojeId);

      // Apenas gera o dia atual se NÃO existir nenhum registro com esse ID
      if (!jaTemHoje) {
        registros.push(...gerarDiaAtual(colab.id));
      }

      // Opcional: garantir registros únicos por ID
      const porId = new Map<string, any>();
      for (const r of registros) {
        const rid = getRegistroId(r);
        if (!porId.has(rid)) porId.set(rid, r);
      }

      items.value = Array.from(porId.values());
    }
  } catch (error) {
    console.error("❌ Erro ao carregar registros:", error);
  } finally {
    // ✅ Finaliza carregamento
    isLoading.value = false;
  }
});



// Gera YYYY-MM-DD em horário local
const getLocalDateId = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Tenta extrair um ID normalizado do registro
const getRegistroId = (r: any) => {
  // se já vier no formato esperado
  if (typeof r.id === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.id)) return r.id;

  // se vier a data como string tipo "Sex 09/01/2026"
  if (typeof r.date === "string") {
    const partes = r.date.match(/(\d{2})\/(\d{2})\/(\d{4})$/);
    if (partes) {
      const [, dia, mes, ano] = partes;
      return `${ano}-${mes}-${dia}`;
    }
  }

  // se vier um campo dateISO ou timestamp
  if (r.dateISO) {
    const d = new Date(r.dateISO);
    return getLocalDateId(d);
  }
  if (r.timestamp) {
    const d = new Date(r.timestamp);
    return getLocalDateId(d);
  }

  // fallback: retorna o próprio id (pode falhar comparação)
  return r.id;
};


const gerarDiaAtual = (idUser: string) => {
  const hoje = new Date();
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return [{
    id: hoje.toISOString().split("T")[0], // ex: "2026-01-07"
    date: `${diasSemana[hoje.getDay()]} ${hoje.toLocaleDateString("pt-BR")}`,
    workSchedule: "Escritório 08h às 18h",
    checkIn: "",
    breakStart: "",
    breakEnd: "",
    checkOut: "",
    totalWorked: "",
    timeBank: "",
    idUser
  }];
};




// Função para calcular horas trabalhadas
const calcularSomatoria = (item) => {
  const toMinutes = (h) => {
    if (!h || !/^\d{2}:\d{2}$/.test(h)) return null;
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
  };

  // Caso 1: jornada completa com intervalo ? prioridade
  if (item.checkIn && item.breakStart && item.breakEnd && item.checkOut) {
    // console.log("B - AGORA ENTROU NA FUNÇÃO DE CÁLCULO (completo).");
    const workedMorning = toMinutes(item.breakStart) - toMinutes(item.checkIn);
    const workedAfternoon = toMinutes(item.checkOut) - toMinutes(item.breakEnd);
    const totalMinutes = workedMorning + workedAfternoon;

    const horas = Math.floor(totalMinutes / 60);
    const minutos = totalMinutes % 60;
    item.totalWorked = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;

    const diff = totalMinutes - 480;
    const sign = diff >= 0 ? "+" : "-";
    const diffAbs = Math.abs(diff);
    const diffHoras = Math.floor(diffAbs / 60);
    const diffMin = diffAbs % 60;
    item.timeBank = `${sign}${String(diffHoras).padStart(2, "0")}:${String(diffMin).padStart(2, "0")}`;
    return;
  }

  // Caso 2: parcial manhã (até intervalo)
  if (item.checkIn && item.breakStart) {
    // console.log("A - AGORA ENTROU NA FUNÇÃO DE CÁLCULO (parcial manhã).");
    const totalMinutes = toMinutes(item.breakStart) - toMinutes(item.checkIn);

    const horas = Math.floor(totalMinutes / 60);
    const minutos = totalMinutes % 60;
    item.totalWorked = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;

    const diff = totalMinutes - 480;
    const sign = diff >= 0 ? "+" : "-";
    const diffAbs = Math.abs(diff);
    const diffHoras = Math.floor(diffAbs / 60);
    const diffMin = diffAbs % 60;
    item.timeBank = `${sign}${String(diffHoras).padStart(2, "0")}:${String(diffMin).padStart(2, "0")}`;
    return;
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

.tr-justificativa {
  background-color: #FF9800 !important;
  color: white !important;
}


.position-component {
  padding-top: 80px;
  padding-left: 60px;
}

.mg-pers {
  margin-bottom: 70px;
}

.just-p {
  position: relative;
  left: 20px;
}

.icon-pers {
  // display: none;
  position: relative;
  top: 2px !important;
  font-size: 20px;
}

.icon-alert-pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
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

.per-btn {
  margin: 20px;
  position: relative;
  top: -10px;
}

  .btn-clock {
  position: relative;
  width: 94px;
  height: 64px;
  padding: 0;
  transition: background-color 0.3s;
}

.btn-clock:hover {
  opacity: 0.85;
}

.btn-clock .clock-time {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  line-height: 1;
  transition: color 0.3s;
}

.btn-clock .rg-tx {
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: #c0bfbf;
  text-align: center;
  line-height: 1;
  transition: color 0.3s;
}

.btn-clock:hover .clock-time {
  color: #fff; /* hora muda para branco no hover */
}

.ic-c {
  color: #fff; /* hora muda para branco no hover */
}

.btn-clock:hover .rg-tx {
  color: #f5f5f5; /* "registrar" fica mais visível no hover */
}




.preloader-overlay {
  /* cobre todo o card */
  inset: 0;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* acima do conteúdo interno */
  border-radius: 12px; /* acompanha o card arredondado, se houver */
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.preloader-text {
  color: #1f2937; /* cinza escuro legível */
  font-weight: 600;
}

.loading-blink {
  color: white;
  font-size: 12px;
  font-weight: bold;
  animation: blink 1s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-container::before {
  content: "";
  position: absolute;
  top: -6px;
  left: -6px;
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #f3f5fc,
    #e7fbfc,
    #5b7f8f,
    #3481df,
    #f3f2f2
  );
  animation: spin 3s linear infinite;
  z-index: -1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.btn-clock {
  min-width: 280px;
  max-width: 100%;
  height: auto;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
  text-align: center;
}

.btn-clock:hover {
  transform: scale(1.03);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-content span {
  font-size: 16px;
  font-weight: bold;
}

.btn-chip {
  font-size: 14px;
  font-weight: bold;
  height: 26px;
  line-height: 24px;
  border-radius: 12px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
}

/* 📱 Responsivo abaixo de 360px */
@media (max-width: 360px) {
  .btn-clock {
    min-width: 210px;
    padding: 12px;
    font-size: 14px;
  }

  .btn-content span {
    font-size: 14px;
  }

  .btn-chip {
    font-size: 12px;
    height: 22px;
    line-height: 20px;
  }
}

.btn-voltar {
  background-color: #528AD0 !important; /* cor base */
  color: #fff !important;              /* texto/ícone branco */
  transition: all 0.35s ease;          /* transição suave */
  font-size: 11px;
}

.btn-voltar:hover {
  background-color: #a5bedc !important; /* tom mais claro/escuro no hover */
  // color: #1f2937 !important;            /* cor da fonte no hover */
  transform: translateX(16px);           /* leve movimento para a direita */
  // box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25); /* sombra elegante */
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