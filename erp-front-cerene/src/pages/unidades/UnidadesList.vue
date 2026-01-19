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
          INSERIR - Unidade
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
        <!-- Título -->
        <v-card-title
          class="d-flex align-center"
          style="background-color: #528ad0; color: white;"
        >
          <v-icon
            left
            class="mr-2"
          >
            mdi-office-building
          </v-icon>
          Cadastro de Unidade
        </v-card-title>

        <!-- Conteúdo -->
        <v-card-text class="scrollable-content">
          <v-card
            class="mx-auto pa-6"
            elevation="8"
            max-width="1200"
            rounded="lg"
          >
            <VRow>
              <VCol>
                <!-- Card: Foto + Dados principais -->
                <v-card
                  class="pa-4 mb-6"
                  elevation="6"
                  rounded="xl"
                  color="blue-grey-lighten-6"
                >
                  <v-row class="align-center">
                    <!-- Foto da unidade -->
                    <v-col
                      cols="12"
                      md="2"
                      class="d-flex flex-column align-center"
                    >
                      <div class="avatar-container">
                        <v-avatar
                          size="180"
                          class="mb-2"
                          color="#528ad0"
                        >
                          <v-img
                            :src="urlPhoto || 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'"
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

                    <!-- Campos principais -->
                    <v-col
                      cols="12"
                      md="10"
                    >
                      <v-row>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="dadosEmpresa.razaoSocial"
                            label="Razão Social"
                            prepend-inner-icon="mdi-domain"
                            variant="outlined"
                            required
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="dadosEmpresa.nomeFantasia"
                            label="Nome Fantasia"
                            prepend-inner-icon="mdi-store"
                            variant="outlined"
                            required
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="dadosEmpresa.cnpj"
                            label="CNPJ"
                            prepend-inner-icon="mdi-card-account-details-outline"
                            variant="outlined"
                            required
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="dadosEmpresa.ie"
                            label="Inscrição Estadual"
                            prepend-inner-icon="mdi-identifier"
                            variant="outlined"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="dadosEmpresa.im"
                            label="Inscrição Municipal"
                            prepend-inner-icon="mdi-identifier"
                            variant="outlined"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>

                <!-- Card: Endereço -->
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
                      mdi-map-marker
                    </v-icon>
                    Endereço
                  </v-card-title>
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.logradouro"
                        label="Logradouro"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.numero"
                        label="Número"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.bairro"
                        label="Bairro"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.cidade"
                        label="Cidade"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.estado"
                        label="Estado"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.cep"
                        label="CEP"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.endereco.pais"
                        label="País"
                        variant="outlined"
                      />
                    </VCol>
                  </VRow>
                </v-card>

                <!-- Card: Contato -->
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
                      color="red"
                    >
                      mdi-email-outline
                    </v-icon>
                    Contato
                  </v-card-title>
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.contato.telefone"
                        label="Telefone"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.contato.email"
                        label="E-mail"
                        variant="outlined"
                      />
                    </VCol>
                  </VRow>
                </v-card>

                <!-- Card: Responsável -->
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
                    Responsável
                  </v-card-title>
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.responsavel.nome"
                        label="Nome do Responsável"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.responsavel.cpf"
                        label="CPF do Responsável"
                        variant="outlined"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.responsavel.email"
                        label="E-mail do Responsável"
                        variant="outlined"
                      />
                    </VCol>
                  </VRow>
                </v-card>
              </VCol>
            </VRow>
          </v-card>
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
              @click="handleSaveUnidade"
            >
              SALVAR
            </v-btn>
          </div>
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
            :key="props.item.id"
            class="hover-row"
          >
            <!-- Código -->
            <td class="py-3 px-4">
              {{ props.item.cod }}
            </td>

            <!-- Razão Social -->
            <td class="py-3 px-4">
              {{ props.item.razaoSocial }}
            </td>

            <!-- Nome Fantasia -->
            <td class="py-3 px-4">
              {{ props.item.nomeFantasia }}
            </td>

            <!-- CNPJ -->
            <td class="py-3 px-4">
              {{ props.item.cnpj }}
            </td>

            <!-- IE -->
            <td class="py-3 px-4">
              {{ props.item.ie }}
            </td>

            <!-- IM -->
            <td class="py-3 px-4">
              {{ props.item.im }}
            </td>

            <!-- Contato -->
            <td class="py-3 px-4">
              <div>
                <span>{{ props.item.contato?.telefone }}</span><br>
                <span>{{ props.item.contato?.email }}</span>
              </div>
            </td>

            <!-- Responsável -->
            <td class="py-3 px-4">
              <div>
                <span>{{ props.item.responsavel?.nome }}</span><br>
                <span>{{ props.item.responsavel?.email }}</span>
              </div>
            </td>

            <!-- Ações -->
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
                  @click="handleDeleteUnidade(props.item)"
                >
                  <i class="mdi mdi-delete icon-pers" />
                </button>

                <!-- Bloquear / Liberar -->
                <button
                  class="ml-2"
                  @click="toggleActiveStatus(props.item)"
                >
                  <v-icon :color="props.item.configuracoes?.ativo ? 'green' : 'red'">
                    {{ props.item.configuracoes?.ativo ? 'mdi-lock-open' : 'mdi-lock' }}
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
import unidadeService from "./UnidadeService";
import { useToast } from "vue-toastification";
import { VFileInput } from 'vuetify/components';
import Swal from "sweetalert2";
import { reactive } from 'vue'
// import { unidadeEvenBus } from "@/eventBus";

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

interface Unidade {
    id: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    ie?: string;
    im?: string;
    urlPhoto: string;
    endereco: {
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
        pais: string;
    };
    contato: {
        telefone: string;
        email: string;
    };
    responsavel: {
        nome: string;
        cpf: string;
        email: string;
    };
    configuracoes: {
        ativo: boolean;
        dataCadastro: string;
        ultimaAtualizacao: string;
    };
}



interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: { id: number; title: string };
}
// const unidadeEventBus = unidadeEvenBus.unidade;
const dadosEmpresa = reactive<Unidade>({
    id: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    ie: '',
    im: '',
    urlPhoto: '',
    endereco: {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: ''
    },
    contato: {
        telefone: '',
        email: ''
    },
    responsavel: {
        nome: '',
        cpf: '',
        email: ''
    },
    configuracoes: {
        ativo: true,
        dataCadastro: '',
        ultimaAtualizacao: ''
    }
});

const toast = useToast();
// const nome = ref("");
const cpf = ref("");
// const unidade = ref("");
// const nasc = ref("");
// const cargo = ref("");
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
// const sexo = ref("");

// const usuariosMap = [
//   { desc: "Administrador", role: "ADMIN", enum: 1 },
//   { desc: "Gerente", role: "MANAGER", enum: 2 },
//   { desc: "Usuário", role: "USER", enum: 3 },
// ];

// const email = ref("");
// const id = ref("");
// const password = ref("");
// const contas = ref([{ banco: "", agencia: "", conta: "", tipo: "" }]);
// const pixContas = ref([{ tipoChave: "", chave: "" }]);
// const idUser = ref("");
// já tem outros refs como nome, cpf, etc...
const urlPhoto = ref('')
const uploadFoto = ref<InstanceType<typeof VFileInput> | null>(null);
const progress = ref<number>(0);
const isUploading = ref(false);
const headers = ref([
  { title: "Cód", sortable: true, value: "cod" },
  { title: "Unidade", sortable: true, value: "nomeFantasia" },
  { title: "CNPJ", sortable: true, value: "cnpj" },
  { title: "IE", sortable: true, value: "ie" },
  { title: "IM", sortable: true, value: "im" },
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
// const visible = ref(false);
const items = ref<any[]>([]);

const openModal = (action: 'CREATE' | 'EDIT', unidade?: any) => {
  typeAction.value = action
  dialog.value = true

  if (action === 'EDIT' && unidade) {
    recuverData.value = unidade
    Object.assign(dadosEmpresa, {
      id: unidade.id ?? '',
      razaoSocial: unidade.razaoSocial ?? '',
      nomeFantasia: unidade.nomeFantasia ?? '',
      cnpj: unidade.cnpj ?? '',
      endereco: {
        logradouro: unidade.endereco?.logradouro ?? '',
        numero: unidade.endereco?.numero ?? '',
        bairro: unidade.endereco?.bairro ?? '',
        cidade: unidade.endereco?.cidade ?? '',
        estado: unidade.endereco?.estado ?? '',
        cep: unidade.endereco?.cep ?? '',
        pais: unidade.endereco?.pais ?? ''
      },
      contato: {
        telefone: unidade.contato?.telefone ?? '',
        email: unidade.contato?.email ?? ''
      },
      responsavel: {
        nome: unidade.responsavel?.nome ?? '',
        cpf: unidade.responsavel?.cpf ?? '',
        email: unidade.responsavel?.email ?? ''
      },
      configuracoes: {
        ativo: unidade.configuracoes?.ativo ?? true,
        dataCadastro: unidade.configuracoes?.dataCadastro ?? '',
        ultimaAtualizacao: new Date().toISOString()
      },
      ie: unidade.ie ?? '',
      im: unidade.im ?? '',
      urlPhoto: unidade.urlPhoto ?? ''
    })

    // ?? reflete a foto no avatar
    urlPhoto.value = unidade.urlPhoto || ''
  } else {
    recuverData.value = null
    resetForm()
    urlPhoto.value = '' // limpa apenas no CREATE
  }
};

const resetForm = () => {
  Object.assign(dadosEmpresa, {
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    endereco: {
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: ''
    },
    contato: {
      telefone: '',
      email: ''
    },
    responsavel: {
      nome: '',
      cpf: '',
      email: ''
    },
    configuracoes: {
      ativo: true,
      dataCadastro: '',
      ultimaAtualizacao: ''
    },
    ie: '',
    im: ''
  })
};

// salvar (create/update) unidade
const handleSaveUnidade = async () => {
  try {
    // validações mínimas
    if (!dadosEmpresa.nomeFantasia?.trim()) {
      toast.error('Informe o Nome Fantasia.')
      return
    }
    if (!dadosEmpresa.cnpj?.trim()) {
      toast.error('Informe o CNPJ.')
      return
    }

    const payload = {
      ...dadosEmpresa,
      configuracoes: {
        ativo: dadosEmpresa.configuracoes.ativo,
        dataCadastro:
          typeAction.value === 'CREATE'
            ? new Date().toISOString()
            : dadosEmpresa.configuracoes.dataCadastro || '',
        ultimaAtualizacao: new Date().toISOString()
      },
      // normalizações úteis
      nomeFantasia: capitalizeWords(dadosEmpresa.nomeFantasia),
      cnpj: dadosEmpresa.cnpj,
      contato: {
        telefone: dadosEmpresa.contato.telefone,
        email: (dadosEmpresa.contato.email || '').toLowerCase()
      },
      ie: dadosEmpresa.ie || '',
      im: dadosEmpresa.im || ''
    }

    if (typeAction.value === 'CREATE') {
      await unidadeService.inserirUnidade(payload)
      toast.success('Unidade cadastrada com sucesso!')
    } else if (typeAction.value === 'EDIT' && recuverData.value?.id) {
      await unidadeService.atualizarUnidade(recuverData.value.id, payload)
      toast.success('Unidade atualizada com sucesso!')
    }

    dialog.value = false
    await atualizarGrid()
  } catch (error) {
    toast.error('Erro ao salvar unidade!')
    console.error(error)
  }
};

// excluir unidade
const handleDeleteUnidade = async (unidade: any) => {
  try {
    const result = await Swal.fire({
      title: 'Confirmação',
      text: `Deseja mesmo excluir a unidade: ${unidade.nomeFantasia}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e0a99e',
      cancelButtonColor: '#a9dfab',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      await unidadeService.deleteUnidade(unidade.id)
      toast.success(`Unidade ${unidade.nomeFantasia} excluída com sucesso!`)
      await atualizarGrid()
    } else {
      toast.info('Exclusão cancelada.')
    }
  } catch (error) {
    toast.error('Erro ao excluir unidade. Tente novamente!')
    console.error(error)
  }
}

// util
const capitalizeWords = (text: string) =>
  text
    .trim()
    .split(' ')
    .map(w => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ')

// atualizar grid (já entregue anteriormente)
const atualizarGrid = async () => {
  try {
    const unidades = await unidadeService.findUnidades()

    // ordena por nomeFantasia
    unidades.sort((a: any, b: any) => a.nomeFantasia.localeCompare(b.nomeFantasia))

    // mapeia para items.value com todos os campos
    items.value = unidades.map((unidade: any, index: number) => ({
      cod: index + 1,
      id: unidade.id,
      razaoSocial: unidade.razaoSocial ?? '',
      nomeFantasia: unidade.nomeFantasia ?? '',
      cnpj: unidade.cnpj ?? '',
      ie: unidade.ie ?? '',
      im: unidade.im ?? '',
      endereco: unidade.endereco ?? {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        pais: ''
      },
      contato: unidade.contato ?? { telefone: '', email: '' },
      responsavel: unidade.responsavel ?? { nome: '', cpf: '', email: '' },
      configuracoes: unidade.configuracoes ?? {
        ativo: true,
        dataCadastro: '',
        ultimaAtualizacao: ''
      },
      urlPhoto: unidade.urlPhoto ?? ''
    }))
  } catch (error) {
    console.error('Erro ao atualizar grid:', error)
    toast.error('Erro ao carregar unidades.')
  }
}



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
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  isUploading.value = true
  progress.value = 0

  try {
    const downloadURL = await UploadStorageService.uploadPhotoUnidade(
      dadosEmpresa.id,
      file,
      (p) => (progress.value = p)
    )

    // ?? Atualiza refs locais
    urlPhoto.value = downloadURL
    dadosEmpresa.urlPhoto = downloadURL

    // ?? Atualiza a lista usada na tabela
    const unidadeIndex = filteredItems.value.findIndex(
      (u: any) => u.id === dadosEmpresa.id
    )
    if (unidadeIndex !== -1) {
      filteredItems.value[unidadeIndex].urlPhoto = downloadURL
    }

    console.log(`[handlePhotoUpload] Foto atualizada para unidade ${dadosEmpresa.id}`)
  } catch (err) {
    console.error("Erro no upload:", err)
  } finally {
    isUploading.value = false
  }
};




const triggerUpload = () => {
  const inputEl = uploadFoto.value?.$el?.querySelector('input[type="file"]');
  inputEl?.click();
};


// const inserir = async () => {
//   try {
//     await unidadeService.inserirUnidade(dadosEmpresa)
//     toast.success('Cadastro realizado com sucesso!')
//   } catch (error) {
//     console.error('Erro ao cadastrar unidade:', error)
//     toast.error('Erro ao cadastrar unidade')
//   }
// };


// const adicionarConta = () => {
//   contas.value.push({ banco: "", agencia: "", conta: "", tipo: "" });
// };

// const removerConta = (index: number) => {
//   contas.value.splice(index, 1);
// };

// const adicionarPix = () => {
//   pixContas.value.push({ tipoChave: "", chave: "" });
// };

// const removerPix = (index: number) => {
//   pixContas.value.splice(index, 1);
// };

// const copiarId = async () => {
//   try {
//     await navigator.clipboard.writeText(id.value || "");
//     toast.success("ID copiado para a área de transferência!");
//   } catch (err) {
//     console.error("Erro ao copiar ID:", err);
//     toast.error("Não foi possível copiar o ID.");
//   }
// };




// const copiarEmail = (data) => {
//   const email = data;
//   navigator.clipboard.writeText(email)
//     .then(() => {
//       toast.success("E-mail copiado para a área de transferência!");
//     })
//     .catch(() => {
//       toast.error("Não foi possível copiar o e-mail.");
//     });
// };

// const handleSavePerson = async () => {
//   try {
//     const unidadeSelecionada = unidadesMap.find((u) => u.enum === Number(unidade.value));
//     const usuarioSelecionado = usuariosMap.find((u) => u.role === "USER");

//     const dadosCadastro = {
//       nome: nome.value ?? null,
//       cpf: cpf.value ?? null,
//       dataNascimento: nasc.value ?? null,
//       cargo: cargo.value ?? null,
//       email: email.value ?? null,
//       unidade: [
//         {
//           desc: unidadeSelecionada?.desc ?? null,
//           enum: unidadeSelecionada?.enum ?? null,
//         },
//       ],
//       sexo: sexo.value ?? null,
//       usuario: [
//         {
//           login: email.value ?? null,
//           password: password.value ?? null,
//           role: usuarioSelecionado?.role ?? null,
//           enum: usuarioSelecionado?.enum ?? null,
//         },
//       ],
//       contasBancarias: contas.value.map((c) => ({
//         banco: c.banco ?? null,
//         agencia: c.agencia ?? null,
//         conta: c.conta ?? null,
//         tipo: c.tipo ?? null,
//       })),

//       // 🔹 incluir Pix
//       pixContas: pixContas.value.map((p) => ({
//         tipoChave: p.tipoChave ?? null,
//         chave: p.chave ?? null,
//       })),
//     };



//     if (typeAction.value === "CREATE") {
//       await cadastroService.registrarUsuario(dadosCadastro);
//       toast.success("Cadastro realizado com sucesso!");
//     } else if (typeAction.value === "EDIT" && recuverData.value?.id) {
//       await colaboradorService.atualizarColaborador(recuverData.value.id, dadosCadastro);
//       toast.success("Colaborador atualizado com sucesso!");
//     }

//     dialog.value = false;
//     await atualizarGrid();
//   } catch (error) {
//     toast.error("Erro ao salvar colaborador!");
//     console.error(error);
//   }
// };

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
    const keywordNorm = normalizeText(keywordRaw);
    const keywordLower = keywordRaw.toLowerCase();

    // campos normalizados
    const nomeNorm = normalizeText(item.nome ?? "");
    const unidadeNorm = itemUnidade;
    const sexoNorm = normalizeText(item.sexo ?? "");

    // e-mail (mantém caracteres especiais)
    const emailRaw = String(item.email ?? "").toLowerCase();

    // cpf
    const cpfRaw = String(item.cpf ?? "").toLowerCase();
    const cpfPlain = normalizeCpf(item.cpf ?? "");
    const keywordCpfPlain = normalizeCpf(keywordRaw);

    // id
    const idRaw = String(item.id ?? "").toLowerCase();

    const matchesKeyword =
      !keywordRaw ||
      nomeNorm.includes(keywordNorm) ||
      unidadeNorm.includes(keywordNorm) ||
      sexoNorm.includes(keywordNorm) ||
      emailRaw.includes(keywordLower) || // busca por e-mail
      cpfRaw.includes(keywordNorm) ||
      (keywordCpfPlain && cpfPlain.includes(keywordCpfPlain)) ||
      idRaw.includes(keywordLower); // 👈 busca por id

    // 🔎 LOGS para debug
    console.log("[filteredItems] Avaliando item:", item);
    console.log("[filteredItems] Filtros =>", filters.value);
    console.log("[filteredItems] matchUnidade:", matchUnidade, "matchSexo:", matchSexo, "matchesKeyword:", matchesKeyword);

    return matchUnidade && matchSexo && matchesKeyword;
  });
});






// const validateForm = () => {
//   const rawCpf = cpf.value;

//   const digitsOnly = rawCpf.replace(/\D/g, "");

//   if (!/^\d+$/.test(digitsOnly)) {
//     toast.error("No campo CPF Somente números são permitidos!");
//     return;
//   }

//   if (digitsOnly.length !== 11) {
//     toast.error("CPF deve ter exatamente 11 dígitos!");
//     return;
//   }

//   handleSavePerson();
// };

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

// const atualizarGrid = async () => {
//   try {
//     const unidades = await unidadeService.findUnidades()

//     // ordena por nome fantasia
//     unidades.sort((a: any, b: any) => a.nomeFantasia.localeCompare(b.nomeFantasia))

//     completeData.value = unidades
//     items.value = unidades.map((unidade: any, index: number) => ({
//       cod: index + 1,
//       id: unidade.id,
//       nomeFantasia: unidade.nomeFantasia,
//       cnpj: unidade.cnpj,
//       ie: unidade.ie ?? '',   // pode vir vazio
//       im: unidade.im ?? '',   // pode vir vazio
//       isActive: unidade.configuracoes?.ativo ?? true,
//     }))
//   } catch (error) {
//     console.error('Erro ao atualizar grid:', error)
//   }
// }



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
    // inserir();
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


// const handleDeletePerson = async (task) => {
//   try {
//     const result = await Swal.fire({
//       title: "Confirmação",
//       text: `Deseja mesmo excluir: ${task.nome}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e0a99e",
//       cancelButtonColor: "#a9dfab",
//       confirmButtonText: "Sim, excluir",
//       cancelButtonText: "Cancelar",
//     });

//     if (result.isConfirmed) {
//       await colaboradorService.deleteColaborador(task.id);

//       toast.success(`Colaborador ${task.nome} excluído com sucesso!`);

//       await atualizarGrid();
//     } else {
//       toast.info("Exclusão cancelada.");
//     }
//   } catch (error) {
//     toast.error("Erro ao excluir. Tente novamente!");
//     console.error(error);
//   }
// };



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
  margin-bottom: 70px;
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
  50% { opacity: 0.4; }
  100% { opacity: 1; }
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

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
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