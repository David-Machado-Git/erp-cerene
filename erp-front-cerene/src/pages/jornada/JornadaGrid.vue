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
          <v-avatar
            size="120"
            class="elevation-3 mb-2"
            color="primary"
          >
            <v-img
              :src="colab?.urlPhoto || 'https://randomuser.me/api/portraits/men/75.jpg'"
              alt="Foto do colaborador"
              class="rounded-circle"
            />
          </v-avatar>
        </v-col>

        <!-- Dados compactados -->
        <v-col
          cols="12"
          md="10"
        >
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <div
                class="text-subtitle-1 font-weight-bold"
                style="color:#1976D2;"
              >
                {{ colab?.nome || "" }}
              </div>
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
                @click="copiarEmail"
              >
                <strong>E-mail:</strong> {{ colab?.email || "" }}
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>


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
            locale="pt-BR"
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
            locale="pt-BR"
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
          label="Palavra-chave"
          prepend-icon="mdi-magnify"
          class="w-full ml-3"
          clearable
        />
      </v-col>
    </v-row>

    <main>
      <v-row class="mb-4">
        <!-- Total de Horas Trabalhadas -->
        <v-col
          cols="12"
          md="6"
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
          md="6"
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
              <small class="text-caption text-grey">
                Saldo acumulado
              </small>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="filteredItems"
        item-key="id"
        class="elevation-1"
      >
        <template #item="{ item }">
          <tr>
            <td>{{ item.date }}</td>
            <td>{{ item.workSchedule }}</td>

            <!-- Entrada -->
            <td :class="getClass(item.checkIn, '08:00', '<=')">
              <span v-if="item.checkIn">{{ item.checkIn }}</span>
              <v-btn
                v-else-if="isDiaAtual(item) && !isDiaAtualFinalizado(item)"
                :color="getColor(horaAtual(), '08:00')"
                class="btn-clock"
                @click="registrarHorario(item, 'checkIn')"
              >
                <span class="clock-time">{{ horaAtualTexto }}</span>
                <span class="rg-tx d-flex align-center justify-center">
                  <v-icon
                    size="12"
                    class="mr-1 ic-c"
                  >mdi-clock-outline</v-icon>
                  registrar
                </span>
              </v-btn>
            </td>

            <!-- Início Intervalo -->
            <td :class="getClass(item.breakStart, '12:00', '>=')">
              <span v-if="item.breakStart">{{ item.breakStart }}</span>
              <v-btn
                v-else-if="isDiaAtual(item) && item.checkIn && !isDiaAtualFinalizado(item)"
                :color="getColor(horaAtual(), '12:00')"
                class="btn-clock"
                @click="registrarHorario(item, 'breakStart')"
              >
                <span class="clock-time">{{ horaAtualTexto }}</span>
                <span class="rg-tx d-flex align-center justify-center">
                  <v-icon
                    size="12"
                    class="mr-1 ic-c"
                  >mdi-clock-outline</v-icon>
                  registrar
                </span>
              </v-btn>
            </td>

            <!-- Fim Intervalo -->
            <td :class="getClass(item.breakEnd, '13:00', '<=')">
              <span v-if="item.breakEnd">{{ item.breakEnd }}</span>
              <v-btn
                v-else-if="isDiaAtual(item) && item.breakStart && !isDiaAtualFinalizado(item)"
                :color="getColor(horaAtual(), '13:00')"
                class="btn-clock"
                @click="registrarHorario(item, 'breakEnd')"
              >
                <span class="clock-time">{{ horaAtualTexto }}</span>
                <span class="rg-tx d-flex align-center justify-center">
                  <v-icon
                    size="12"
                    class="mr-1 ic-c"
                  >mdi-clock-outline</v-icon>
                  registrar
                </span>
              </v-btn>
            </td>

            <!-- Saída -->
            <td :class="getClass(item.checkOut, '18:00', '>=')">
              <span v-if="item.checkOut">{{ item.checkOut }}</span>
              <v-btn
                v-else-if="isDiaAtual(item) && item.breakEnd && !isDiaAtualFinalizado(item)"
                :color="getColor(horaAtual(), '18:00')"
                class="btn-clock"
                @click="registrarHorario(item, 'checkOut')"
              >
                <span class="clock-time">{{ horaAtualTexto }}</span>
                <span class="rg-tx d-flex align-center justify-center">
                  <v-icon
                    size="12"
                    class="mr-1 ic-c"
                  >mdi-clock-outline</v-icon>
                  registrar
                </span>
              </v-btn>
            </td>

            <!-- Somatória -->
            <td
              :class="{
                'bg-green-100': item.totalWorked && item.totalWorked >= '08:00',
                'bg-red-100': item.totalWorked && item.totalWorked < '08:00'
              }"
            >
              {{ item.totalWorked }}
            </td>

            <!-- Banco de Horas -->
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

              <span v-if="item.timeBank">{{ item.timeBank }}</span>

              <v-icon
                size="18"
                class="cursor-pointer just-p"
                title="Inserir justificativa"
                @click="abrirJustificativa(item.id)"
              >
                mdi-comment-edit-outline
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import JornadaColabAdmService from "@/services/JornadaColabAdmService";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { eventBus } from "@/eventBus";


const colab = eventBus.colab;
const router = useRouter();
console.log("TESTANDOO => ", colab?.urlPhoto);
const horaAtualTexto = ref("");
// const urlPhoto = ref<any>(colab?.urlPhoto || null);
if (!colab) {
  router.push("/dashboard/jornada-colaborador");
} else {
  console.log("Recebi o colaborador via eventBus:", colab);
  console.log("Aqui recebemos o id para fazer a requisição e obter os dados. O ID É => :", colab.id);
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
]);


const filters = ref({
  dataDe: null,
  dataAte: null,
  keyword: ""
});
const menuDe = ref(false);
const menuAte = ref(false);


const copiarEmail = () => {
  const email = "tel.machado@cerene.org.br";
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

const isDiaAtual = (item) => getRegistroId(item) === getLocalDateId();

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

const isDiaAtualFinalizado = (item) => {
  if (!item.date) return false;

  // Normaliza a data do item para formato YYYY-MM-DD
  const dataItem = new Date(item.date).toISOString().slice(0, 10);

  // Pega a data atual no mesmo formato
  const hoje = new Date().toISOString().slice(0, 10);

  const apontamentosFeitos = item.checkIn && item.breakStart && item.breakEnd && item.checkOut;

  return dataItem === hoje && apontamentosFeitos;
};


const getClass = (hora, referencia, operador) => {
  if (!hora) return '';
  const [h, m] = hora.split(':').map(Number);
  const minutos = h * 60 + m;

  const [rh, rm] = referencia.split(':').map(Number);
  const refMin = rh * 60 + rm;

  if (operador === '<=') return minutos <= refMin ? 'bg-green-100' : 'bg-red-100';
  if (operador === '>=') return minutos >= refMin ? 'bg-green-100' : 'bg-red-100';
  return '';
};




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

const getColor = (horaAtual, horaLimite) => {
  return horaAtual > horaLimite ? 'error' : 'success';
};



const registrarHorario = async (item, campo) => {
  const idUser = colab.id;
  item[campo] = horaAtual();
  item.idUser = idUser;

  calcularSomatoria(item); // sempre tenta calcular

  // console.log(`>>> Inserção realizada no campo: ${campo}`);
  // console.log("Item atualizado:", JSON.stringify(item, null, 2));

  await JornadaColabAdmService.salvarRegistro(idUser, item);
};

// Computed para filtrar
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const keyword = normalizar(filters.value.keyword)
    const dataDe = filters.value.dataDe
    const dataAte = filters.value.dataAte

    // Junta todas as colunas para busca por palavra-chave
    const textoCompleto = [
      item.date,
      item.workSchedule,
      item.checkIn,
      item.breakStart,
      item.breakEnd,
      item.checkOut,
      item.totalWorked,
      item.timeBank
    ].map(normalizar).join(" ")

    const passaKeyword = !keyword || textoCompleto.includes(keyword)

    // Converte a data do item para objeto Date
    const [dia, mes, ano] = item.date.split(" ")[1].split("/")
    const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia))

    // Converte filtros para timestamp (se existirem)
    const passaData =
      (!dataDe || dataItem.getTime() >= new Date(dataDe).getTime()) &&
      (!dataAte || dataItem.getTime() <= new Date(dataAte).getTime())

    return passaKeyword && passaData
  })
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

const abrirJustificativa = (id) => {
  // Exemplo: abrir modal ou drawer
  console.log('Abrir justificativa para registro:', id);
  // modalJustificativa.value = true;
  // registroSelecionado.value = id;
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


const items = ref<any[]>([]);

onMounted(async () => {
  audio = new Audio("/sound_click.mp3");
  audio.volume = 0.5;
  audio.load();

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


  if (!colab || !colab.id) {
    items.value = gerarDiaAtual("sem-id");
    return;
  }

  const registros = (await JornadaColabAdmService.buscarRegistros(colab.id)) || [];

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


.mg-pers {
  margin-bottom: 50px;
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