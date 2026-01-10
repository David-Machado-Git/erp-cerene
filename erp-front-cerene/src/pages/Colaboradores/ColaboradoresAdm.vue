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
      class="custom-dialog"
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
            mdi-account-box
          </v-icon>
          Cadastro
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
                <v-card
                  class="pa-4 mb-6"
                  elevation="6"
                  rounded="xl"
                  color="blue-grey-lighten-6"
                >
                  <v-row class="align-center">
                    <!-- Foto redonda com borda + input de upload -->
                    <v-col
                      cols="12"
                      md="2"
                      class="d-flex flex-column align-center"
                    >
                      <v-avatar
                        size="100"
                        class="mb-2"
                      >
                        <v-img
                          :src="urlPhoto || 'https://randomuser.me/api/portraits/men/75.jpg'"
                          alt="Foto do colaborador"
                          cover
                        />
                      </v-avatar>


                      <!-- 🔹 Input de upload compacto -->
                      <!-- Botão com ícone -->
                      <v-btn
                        icon
                        size="32"
                        color="primary"
                        @click="triggerUpload"
                      >
                        <v-icon size="22">
                          mdi-camera
                        </v-icon>
                      </v-btn>


                      <v-file-input
                        ref="uploadFoto"
                        accept="image/*"
                        style="display: none"
                        @change="handlePhotoUpload"
                      />


                      <!-- Input invisível -->
                      <v-file-input
                        ref="uploadFoto"
                        accept="image/*"
                        style="display: none"
                        @change="handlePhotoUpload"
                      />

                      <div
                        v-if="isUploading"
                        class="mt-2 d-flex align-center"
                      >
                        <v-progress-circular
                          :value="progress"
                          color="primary"
                          size="24"
                          width="3"
                        />
                        <span
                          class="text-caption ml-2"
                          style="animation: blink 1s infinite;"
                        >
                          Enviando imagem {{ progress }}%
                        </span>
                      </div>
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
                            {{ nome || "" }}
                          </div>
                          <div class="text-caption text-grey-darken-1">
                            {{ cargo || "" }}
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
                          <span class="text-caption"><strong>CPF:</strong> {{ cpf || "" }}</span><br>
                          <v-icon
                            color="green"
                            class="mr-1"
                          >
                            mdi-calendar
                          </v-icon>
                          <span class="text-caption"><strong>Nascimento:</strong> {{ nasc || "" }}</span>
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
                          <span class="text-caption"><strong>Cargo:</strong> {{ cargo || "" }}</span><br>
                          <v-icon
                            color="indigo"
                            class="mr-1"
                          >
                            mdi-office-building
                          </v-icon>
                          <span class="text-caption"><strong>Unidade:</strong> {{ unidade || "" }}</span>
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
                          <span class="text-caption"><strong>Sexo:</strong> {{ sexo || "" }}</span>
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
                            <strong>E-mail:</strong> {{ email || "" }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>



                <v-card
                  class="pa-4 mb-6"
                  elevation="2"
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
                      mdi-account-outline
                    </v-icon>
                    Dados Pessoais
                  </v-card-title>

                  <p class="mb-6">
                    Formulário de Edição
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
                </v-card>


                
                <h3 class="mb-2">
                  Contas Bancárias
                </h3>
                <p class="mb-6">
                  Informe os dados bancários do colaborador
                </p>

                <VRow
                  v-for="(conta, index) in contas"
                  :key="index"
                  class="mb-4"
                >
                  <v-col cols="12">
                    <v-card
                      class="pa-4"
                      elevation="2"
                      rounded="lg"
                      color="blue-grey-lighten-5"
                    >
                      <v-card-title
                        class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold"
                        style="color:#546E7A;"
                      >
                        <div>
                          <v-icon
                            left
                            class="mr-2"
                            color="blue-grey-darken-1"
                          >
                            mdi-bank
                          </v-icon>
                          Banco {{ index + 1 }}
                        </div>

                        <v-btn
                          v-if="contas.length > 1"
                          icon
                          size="small"
                          color="blue-grey-lighten-3"
                          @click="removerConta(index)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>


                      <VRow>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="conta.banco"
                            label="Banco"
                            prepend-inner-icon="mdi-bank"
                            prepend-inner-icon-color="indigo"
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
                            v-model="conta.agencia"
                            label="Agência"
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
                          <VTextField
                            v-model="conta.conta"
                            label="Número da Conta"
                            prepend-inner-icon="mdi-card-account-details-outline"
                            prepend-inner-icon-color="deep-purple"
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
                            v-model="conta.tipo"
                            :items="['Corrente', 'Poupança']"
                            label="Tipo de Conta"
                            prepend-inner-icon="mdi-cash-multiple"
                            prepend-inner-icon-color="green"
                            density="comfortable"
                            variant="outlined"
                            required
                          />
                        </VCol>
                      </VRow>
                    </v-card>
                    <VRow>
                      <VCol
                        cols="12"
                        class="d-flex justify-end"
                      >
                        <v-btn
                          color="blue-grey-lighten-1"
                          variant="tonal"
                          @click="adicionarConta"
                        >
                          <v-icon
                            left
                            color="blue-grey-darken-1"
                          >
                            mdi-plus-circle
                          </v-icon>
                          ADD Conta
                        </v-btn>
                      </VCol>
                    </VRow>
                  </v-col>
                </VRow>

                <h3 class="mb-2">
                  Pix
                </h3>
                <p class="mb-6">
                  Informe os dados da chave Pix do colaborador
                </p>

                <VRow
                  v-for="(pix, index) in pixContas"
                  :key="index"
                  class="mb-4"
                >
                  <v-col cols="12">
                    <v-card
                      class="pa-4"
                      elevation="2"
                      rounded="lg"
                      color="blue-grey-lighten-5"
                    >
                      <v-card-title
                        class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold"
                        style="color:#546E7A;"
                      >
                        <div>
                          <v-icon
                            left
                            class="mr-2"
                            color="blue-grey-darken-1"
                          >
                            mdi-key
                          </v-icon>
                          Chave Pix {{ index + 1 }}
                        </div>

                        <v-btn
                          v-if="pixContas.length > 1"
                          icon
                          size="small"
                          color="blue-grey-lighten-3"
                          @click="removerPix(index)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>

                      <VRow>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VSelect
                            v-model="pix.tipoChave"
                            :items="['CPF', 'CNPJ', 'E-mail', 'Telefone', 'Chave Aleatória']"
                            label="Tipo da Chave"
                            prepend-inner-icon="mdi-key-outline"
                            prepend-inner-icon-color="indigo"
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
                            v-model="pix.chave"
                            label="Valor da Chave Pix"
                            prepend-inner-icon="mdi-form-textbox"
                            prepend-inner-icon-color="deep-purple"
                            density="comfortable"
                            variant="outlined"
                            required
                          />
                        </VCol>
                      </VRow>
                    </v-card>

                    <VRow>
                      <VCol
                        cols="12"
                        class="d-flex justify-end"
                      >
                        <v-btn
                          color="blue-grey-lighten-1"
                          variant="tonal"
                          @click="adicionarPix"
                        >
                          <v-icon
                            left
                            color="blue-grey-darken-1"
                          >
                            mdi-plus-circle
                          </v-icon>
                          ADD Chave Pix
                        </v-btn>
                      </VCol>
                    </VRow>
                  </v-col>
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
import UploadStorageService from "@/services/UploadStorageService";
import cadastroService from "@/services/cadastroService";
import { useToast } from "vue-toastification";
import { VFileInput } from 'vuetify/components';
import Swal from "sweetalert2";

// interface ContaBancaria {
//   banco: string;
//   agencia: string;
//   conta: string;
//   tipo: string;
// }

// interface ContaPix {
//   tipoChave: string;
//   chave: string;
// }


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
const contas = ref([{ banco: "", agencia: "", conta: "", tipo: "" }]);
const pixContas = ref([{ tipoChave: "", chave: "" }]);
const idUser = ref("");
// já tem outros refs como nome, cpf, etc...
const urlPhoto = ref<any>(null);
const uploadFoto = ref<InstanceType<typeof VFileInput> | null>(null);
const progress = ref<number>(0);
const isUploading = ref(false);
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

    // 🔹 Garantir que urlPhoto sempre receba algo
    urlPhoto.value = infoData.urlPhoto ?? null;
    idUser.value = infoData.id;
    nome.value = infoData.nome;
    cpf.value = infoData.cpf;
    nasc.value = infoData.nasc;
    cargo.value = infoData.cargo;
    unidade.value = infoData.unidade?.[0]?.desc;
    sexo.value = infoData.sexo;
    email.value = infoData.email;
    password.value = infoData.password;

    // 🔹 Carregar contas bancárias
    contas.value = infoData.contasBancarias?.length
      ? infoData.contasBancarias.map((c: any) => ({
          banco: c.banco ?? "",
          agencia: c.agencia ?? "",
          conta: c.conta ?? "",
          tipo: c.tipo ?? ""
        }))
      : [{ banco: "", agencia: "", conta: "", tipo: "" }];

    // 🔹 Carregar chaves Pix
    pixContas.value = infoData.pixContas?.length
      ? infoData.pixContas.map((p: any) => ({
          tipoChave: p.tipoChave ?? "",
          chave: p.chave ?? ""
        }))
      : [{ tipoChave: "", chave: "" }];
  } else {
    recuverData.value = null;
    typeAction.value = "CREATE";

    // 🔹 Resetar valores
    urlPhoto.value = null;
    nome.value = "";
    cpf.value = "";
    nasc.value = "";
    cargo.value = "";
    unidade.value = "";
    sexo.value = "";
    email.value = "";
    password.value = "";

    // 🔹 Resetar arrays
    contas.value = [{ banco: "", agencia: "", conta: "", tipo: "" }];
    pixContas.value = [{ tipoChave: "", chave: "" }];
  }

  dialog.value = true;
};


// const handlePhotoUpload = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   const file = target.files?.[0] || null;

//   if (file) {
//     console.log("📂 Arquivo selecionado:", file);
//     console.log("📂 Nome:", file.name);
//     console.log("📂 Tipo:", file.type);
//     console.log("📂 Tamanho:", file.size, "bytes");

//     // se quiser já gerar preview:
//     urlPhoto.value = URL.createObjectURL(file);
//   } else {
//     console.log("⚠️ Nenhum arquivo selecionado");
//   }
// };

// handler de upload
const handlePhotoUpload = async (event: Event) => {  
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  isUploading.value = true;
  progress.value = 0;

  try {
    const downloadURL = await UploadStorageService.uploadPhoto(idUser.value, file, (p) => {
      progress.value = p;
    });
    urlPhoto.value = downloadURL;
  } catch (err) {
    console.error("Erro no upload:", err);
  } finally {
    isUploading.value = false;
  }
};



const triggerUpload = () => {
  const inputEl = uploadFoto.value?.$el?.querySelector('input[type="file"]');
  inputEl?.click();
};





// const contas = ref<ContaBancaria[]>([
//   { banco: "", agencia: "", conta: "", tipo: "" }
// ]);

const adicionarConta = () => {
  contas.value.push({ banco: "", agencia: "", conta: "", tipo: "" });
};

const removerConta = (index: number) => {
  contas.value.splice(index, 1);
};

// const pixContas = ref<ContaPix[]>([
//   { tipoChave: "", chave: "" }
// ]);

const adicionarPix = () => {
  pixContas.value.push({ tipoChave: "", chave: "" });
};

const removerPix = (index: number) => {
  pixContas.value.splice(index, 1);
};


const copiarEmail = () => {
  const email = "tel.machado@cerene.org.br";
  navigator.clipboard.writeText(email)
    .then(() => {
      toast.success("E-mail copiado para a área de transferência!");
    })
    .catch(() => {
      toast.error("Não foi possível copiar o e-mail.");
    });
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
      contasBancarias: contas.value.map((c) => ({
        banco: c.banco ?? null,
        agencia: c.agencia ?? null,
        conta: c.conta ?? null,
        tipo: c.tipo ?? null,
      })),

      // 🔹 incluir Pix
      pixContas: pixContas.value.map((p) => ({
        tipoChave: p.tipoChave ?? null,
        chave: p.chave ?? null,
      })),
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

    // 🔹 novos campos
    contasBancarias: colab.contasBancarias ?? [],
    pixContas: colab.pixContas ?? [],

    actions: "..."
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

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}


@media (max-width: 400px) {
  .custom-dialog {
    width: 102% !important;
    max-width: 102% !important;
  }
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