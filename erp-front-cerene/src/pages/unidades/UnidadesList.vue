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
                mdi-home-city
              </v-icon>
              Unidades CERENE
            </v-card-title>

            <p
              class="text-body-2 mb-4"
              style="color:#555;"
            >
              <span style="position: relative; left: 52px; top: -16px;">Dados cadastrais abaixo</span>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    

    <v-dialog
      v-model="dialog"
      max-width="1600px"
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
            max-width="1600"
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
                    Endereço da Unidade
                  </v-card-title>

                  <v-row>
                    <!-- Campos de endereço -->
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.logradouro"
                        label="Logradouro"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.numero"
                        label="Número"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.bairro"
                        label="Bairro"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.cidade"
                        label="Cidade"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.estado"
                        label="Estado"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.cep"
                        label="CEP"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.endereco.pais"
                        label="País"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-switch
                        v-model="mostrarSelect"
                        label="Select visivel?"
                        inset
                        color="primary"
                        density="comfortable"
                      />
                      <span
                        class="text-caption mt-1"
                        style="color: #666;"
                      >
                        Quando visível, estará disponível para seleção no cadastro de colaboradores.
                      </span>
                    </v-col>


                    


                    <!-- Toggles lado a lado -->
                    <!-- <v-col
                      cols="12"
                      md="6"
                    >
                </v-col> -->
                    <!-- <v-row>
                      
                      
                    </v-row> -->

                    <!-- Texto visível no select -->
                    <v-col
                      v-if="mostrarSelect"
                      cols="12"
                    >
                      <v-text-field
                        v-model="dadosEmpresa.configuracoes.selectName"
                        label="Texto visível no select (descrição da opção)"
                        variant="outlined"
                        clearable
                      />
                    </v-col>
                
                    

                    <!-- Select que mostra o texto digitado como primeira opção -->
                    <v-col
                      v-if="mostrarSelect && textoSelect"
                      cols="12"
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
                          mdi-form-select
                        </v-icon>
                        Ex: Como ficará o select
                      </v-card-title>

                      <v-select
                        v-model="previewValue"
                        :items="previewItems"
                        item-title="title"
                        item-value="value"
                        label="Preview do select"
                        variant="outlined"
                        density="comfortable"
                        :menu-props="{ closeOnContentClick: false }"
                      />
                    </v-col>




                    <v-col
                      cols="12"
                    >
                      <v-select
                        v-model="dadosEmpresa.configuracoes.ativo"
                        :items="[true, false]"
                        :item-title="item => item ? 'Ativo' : 'Inativo'"
                        :item-value="item => item"
                        label="Situação Cadastral da Unidade"
                        variant="outlined"
                        density="comfortable"
                        clearable
                      />
                    </v-col>
                  </v-row>
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
                    Contato da Unidade
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
                    Cordenador Responsável pela Unidade
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
                    Coordenadas Geográficas da Unidade
                  </v-card-title>

                  <p
                    class="text-body-2 mb-4"
                    style="color:#555;"
                  >
                    Insira abaixo a latitude e longitude para que apareça no mapa.
                  </p>

                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.cordenadas.lat"
                        label="Latitude"
                        variant="outlined"
                        type="string"
                        placeholder="Ex: -26.9200"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.cordenadas.long"
                        label="Longitude"
                        variant="outlined"
                        type="string"
                        placeholder="Ex: -49.0650"
                      />
                    </VCol>
                  </VRow>

                  <VRow class="mt-4">
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <v-switch
                        v-model="dadosEmpresa.cordenadas.mostrarUnidadeMapa"
                        label="Mostrar unidade no mapa interativo?"
                        inset
                        color="primary"
                        density="comfortable"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="dadosEmpresa.cordenadas.descricao"
                        label="Descrição da unidade"
                        variant="outlined"
                        placeholder="Ex: Unidade Blumenau"
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
        md="3"
        no-gutters
        class="d-flex justify-center mb-4 mb-md-0 mr-9"
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
    </v-row>
    <main style="width: 98%; margin: auto; margin-right: 60px;">
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
            CADASTRAR UNIDADE
          </v-btn>
        </v-col>
      </v-row>
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

      <v-card
        v-if="cereneLocations.length > 0"
        class="pa-4 mb-6"
        elevation="2"
        rounded="lg"
        color="blue-grey-lighten-5"
        style="width: 90%; margin: 0 auto; margin-top: 50px;"
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
            mdi-map
          </v-icon>
          Mapa Interativo com as unidades CERENE
        </v-card-title>

        <div
          class="leaflet-wrapper"
          style="margin-bottom: 50px;"
        >
          <l-map
            style="height: 60vh; width: 100%;"
            @ready="onMapReady"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <l-marker
              v-for="(loc, index) in cereneLocations"
              :key="index"
              :lat-lng="[loc.lat, loc.lng]"
              :icon="pulseIcon"
            >
              <l-popup :opened="index === 0">
                <strong>{{ loc.name }}</strong><br>
                Localização selecionada
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </v-card>
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
import UploadStorageService from "@/services/UploadStorageService";
import unidadeService from "./UnidadeService";
import { useToast } from "vue-toastification";
import { VFileInput } from 'vuetify/components';
import Swal from "sweetalert2";
import { reactive } from 'vue'
// import { unidadeEvenBus } from "@/eventBus";

import * as L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup
} from '@vue-leaflet/vue-leaflet';


L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});



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
  id: string
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  ie?: string
  im?: string
  urlPhoto: string
  textoSelect: string
  endereco: {
    logradouro: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    pais: string
  }
  contato: {
    telefone: string
    email: string
  }
  responsavel: {
    nome: string
    cpf: string
    email: string
  }
  configuracoes: {
    ativo: boolean
    mostrarSelect: boolean
    selectName: string
    dataCadastro: string
    ultimaAtualizacao: string
  }
  cordenadas: {
    lat: number | null
    long: number | null
    mostrarUnidadeMapa: boolean
    descricao: string
  }
}



// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   priority: string;
//   dueDate: string;
//   category: { id: number; title: string };
// }
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
    mostrarSelect: false,   // novo campo
    selectName: '',
    dataCadastro: '',
    ultimaAtualizacao: ''
  },
  cordenadas: {             // novo bloco
    lat: null,
    long: null,
    mostrarUnidadeMapa: false,
    descricao: ''
  },
  textoSelect: ''           // novo campo
});


const toast = useToast();
const isLoading = ref(true);
const cpf = ref("");

const textoSelect = ref('');
const mostrarSelect = ref(false);
const statusCadastro = ref(true);
const markerName = ref('');
const mostrarUnidadeMapa = ref(false);
const latitude = ref(null);
const longitude = ref(null);

const cereneLocations = ref<any>([]) // reativo, se quiser usar no template


// Lista de CERENEs (exemplo, substitua pelas coordenadas reais)
// const cereneLocations = [
//   { name: "CERENE - Blumenau (SC)", lat: -26.8011225, lng: -49.1102143 },
//   { name: "CERENE - Palhoça (SC)", lat: -27.6400, lng: -48.6673 },
//   { name: "CERENE - São Bento do Sul (SC)", lat: -26.23083, lng: -49.38419 },
//   { name: "CERENE - Lapa (PR)", lat: -25.77917, lng: -49.74399 },
//   { name: "CERENE - Ituporanga (SC)", lat: -27.4100, lng: -49.6000 },
//   { name: "CERENE - Gaspar (SC)", lat: -26.87351, lng: -48.92955 },
// ];





// const marker = ref(null);

// // Ícone azul moderno (3D-like)
// const modernBlueIcon = L.icon({
//   iconUrl: "https://png.pngtree.com/png-vector/20240327/ourmid/pngtree-3d-pinpoint-location-marker-icon-blue-for-maps-and-infographics-png-image_12245606.png", // marcador azul com estilo clean/3D
//   iconSize: [85, 85],       // tamanho do ícone
//   iconAnchor: [22, 45],     // ponto de ancoragem (base do ícone)
//   popupAnchor: [0, -45],    // onde o popup abre em relação ao ícone
// });

// Ícone pulsante
const pulseIcon = L.divIcon({
  className: "pulse-wrapper",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
  html: `
    <div class="pulse-marker">
      <span class="ring"></span>
      <span class="ring ring2"></span>
    </div>
  `,
});






// L.marker([-26.8011225, -49.1102143]).addTo(map)
//   .bindPopup("CERENE - Blumenau")
//   .openPopup();



// const nome = ref("");

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

const recuverData = ref<any | null>(null);
const typeAction = ref("CREATE");

const filters = ref({
  unidade: null,
  sexo: null,
  keyword: "",
});
const dialog = ref(false);
// const visible = ref(false);
const items = ref<any[]>([]);

const previewValue = ref('')


// Opções fixas
const fixedItems = [
  { title: 'Outras opções de ex:', value: 'outros' }
]

// Items reativos: primeiro o que o usuário digitou, depois as fixas
const previewItems = computed(() => {
  const user = (textoSelect.value || '').trim()
  const first = {
    title: user || '(defina o texto da opção)',
    value: user || '(defina o texto da opção)'
  }
  return [first, ...fixedItems]
})

// Mantém o valor selecionado sempre válido dentro dos items
watch(textoSelect, (val) => {
  const user = (val || '').trim() || '(defina o texto da opção)'
  previewValue.value = user
}, { immediate: true })


// 🔍 Watch para sincronizar sempre que mudar
watch(mostrarSelect, (newVal, oldVal) => {
  dadosEmpresa.configuracoes.mostrarSelect = newVal
  console.log(`mostrarSelect alterado: de ${oldVal} para ${newVal}`)
  console.log("dadosEmpresa.configuracoes.mostrarSelect atualizado =>", dadosEmpresa.configuracoes.mostrarSelect)
});



// // watchers individuais
// watch(latitude, (newVal, oldVal) => {
//   console.log(`Latitude alterada: de ${oldVal} para ${newVal}`)
// })

// watch(longitude, (newVal, oldVal) => {
//   console.log(`Longitude alterada: de ${oldVal} para ${newVal}`)
// })

// watch(mostrarUnidadeMapa, (newVal, oldVal) => {
//   console.log(`Mostrar unidade no mapa: de ${oldVal} para ${newVal}`)
// })

// watch(markerName, (newVal, oldVal) => {
//   console.log(`Descrição da unidade alterada: de "${oldVal}" para "${newVal}"`)
// })

// // watcher em grupo (opcional)
// watch([latitude, longitude, mostrarUnidadeMapa, markerName], ([lat, long, mostrar, desc]) => {
//   console.log('Valores atuais =>', { lat, long, mostrar, desc })
// })




const openModal = (action: 'CREATE' | 'EDIT', unidade?: any) => {
  typeAction.value = action
  dialog.value = true

    // 🔍 único log completo
    console.log("Objeto final para edição:", unidade)

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
          ativo: unidade.configuracoes?.ativo ?? true,   // ✅ usa o valor do objeto
          mostrarSelect: unidade.configuracoes?.mostrarSelect ?? false,
          dataCadastro: unidade.configuracoes?.dataCadastro ?? '',
          selectName: unidade.configuracoes?.selectName,
          ultimaAtualizacao: new Date().toISOString()
        },
      cordenadas: {
        lat: unidade.cordenadas?.lat ?? null,
        long: unidade.cordenadas?.long ?? null,
        mostrarUnidadeMapa: unidade.cordenadas?.mostrarUnidadeMapa ?? true,
        descricao: unidade.cordenadas?.descricao ?? '',
      },
      textoSelect: textoSelect.value ?? '',
      ie: unidade.ie ?? '',
      im: unidade.im ?? '',
      urlPhoto: unidade.urlPhoto ?? ''
    })
    mostrarSelect.value = dadosEmpresa.configuracoes.mostrarSelect;
    // latitude.value = unidade.cordenadas?.lat ?? null;
    // longitude.value = unidade.cordenadas?.long ?? null;
    // markerName.value = unidade.cordenadas?.descricao ?? null;
    // reflete a foto no avatar
    urlPhoto.value = unidade.urlPhoto || ''

  

  } else {
    recuverData.value = null
    resetForm()
    urlPhoto.value = ''
  }
}


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
      ativo: true,          // volta para true como padrão
      mostrarSelect: false, // zera o toggle
      dataCadastro: '',
      ultimaAtualizacao: ''
    },
    cordenadas: {
      lat: null,            // zera latitude
      long: null,           // zera longitude
      mostrarUnidadeMapa: false,
      descricao: ''
    },
    textoSelect: '',        // zera texto digitado
    ie: '',
    im: '',
    urlPhoto: ''
  })

  // também pode resetar as refs diretamente, se necessário:
  textoSelect.value = ''
  mostrarSelect.value = false
  statusCadastro.value = true
  markerName.value = ''
  mostrarUnidadeMapa.value = false
  latitude.value = null
  longitude.value = null
};


const onMapReady = (map) => {
  // 🔹 Filtra apenas coordenadas válidas
  const coords = cereneLocations.value.filter(
    (loc) => !isNaN(loc.lat) && !isNaN(loc.lng)
  );

  // 🔹 Ajusta o zoom para mostrar todas as unidades
  if (coords.length > 0) {
    const bounds = L.latLngBounds(coords.map((loc) => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 });
  } else {
    // fallback: centraliza em Blumenau
    map.setView([-26.8011225, -49.1102143], 7);
  }

  // 🔹 Aguarda o próximo tick para garantir que os markers já estão renderizados
  setTimeout(() => {
    let popupAberto = false;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const popupContent = layer.getPopup()?.getContent();

        if (
          typeof popupContent === "string" &&
          popupContent.includes("Blumenau")
        ) {
          layer.openPopup();
          popupAberto = true;
        }
      }
    });

    // 🔹 Se não encontrou Blumenau, abre o primeiro marker
    if (!popupAberto) {
      let primeiroMarker = null;
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && !primeiroMarker) {
          primeiroMarker = layer;
        }
      });
      if (primeiroMarker) {
        primeiroMarker.openPopup();
      }
    }
  }, 1000); // pequeno delay para garantir que os popups já existem
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
    // console.log("## SAINDO PAYLOAD ==>> ", dadosEmpresa);
    const payload = {
      ...dadosEmpresa,
      configuracoes: {
        ...dadosEmpresa.configuracoes,
        dataCadastro:
          typeAction.value === 'CREATE'
            ? new Date().toISOString()
            : dadosEmpresa.configuracoes.dataCadastro || '',
        ultimaAtualizacao: new Date().toISOString()
      },
      cordenadas: {
        ...dadosEmpresa.cordenadas
      },
      // normalizações úteis
      nomeFantasia: capitalizeWords(dadosEmpresa.nomeFantasia || ''),
      cnpj: dadosEmpresa.cnpj?.trim() || '',
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
      resetForm();
    } else if (typeAction.value === 'EDIT' && recuverData.value?.id) {
      
      
      await unidadeService.atualizarUnidade(recuverData.value.id, payload)
      toast.success('Unidade atualizada com sucesso!')
      resetForm();
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
const capitalizeWords = (text: string) => {
  return text
    .trim()
    .split(' ')
    .map(w => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
};

  

// atualizar grid (já entregue anteriormente)
const atualizarGrid = async () => {
  try {
    isLoading.value = true;

    const unidades = await unidadeService.findUnidades();
    console.log("AS CORDENADAS DAS UNIDADES SÃO => ", unidades);
    
    // ordena por nomeFantasia
    unidades.sort((a: Unidade, b: Unidade) =>
      a.nomeFantasia.localeCompare(b.nomeFantasia)
    );

    // 🔹 monta cereneLocations dinamicamente
    cereneLocations.value = unidades
    .filter((u) => u.cordenadas?.mostrarUnidadeMapa)
    .map((u) => {
      const latStr = String(u.cordenadas?.lat ?? "0").replace(",", ".");
      const lngStr = String(u.cordenadas?.long ?? "0").replace(",", ".");
      return {
        name: u.cordenadas?.descricao || u.nomeFantasia || "Sem nome",
        lat: parseFloat(latStr),
        lng: parseFloat(lngStr),
      };
    });



    // 🔹 mapeia para items.value com todos os campos
    items.value = unidades.map((unidade: Unidade, index: number) => ({
      cod: index + 1,
      id: unidade.id,
      razaoSocial: unidade.razaoSocial ?? "",
      nomeFantasia: unidade.nomeFantasia ?? "",
      cnpj: unidade.cnpj ?? "",
      ie: unidade.ie ?? "",
      im: unidade.im ?? "",
      endereco: unidade.endereco ?? {
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        pais: "",
      },
      contato: unidade.contato ?? { telefone: "", email: "" },
      responsavel: unidade.responsavel ?? { nome: "", cpf: "", email: "" },
      configuracoes: unidade.configuracoes ?? {
        ativo: true,
        mostrarSelect: false,
        dataCadastro: "",
        ultimaAtualizacao: "",
      },
      cordenadas: unidade.cordenadas ?? {
        lat: null,
        long: null,
        mostrarUnidadeMapa: false,
        descricao: "",
      },
      textoSelect: unidade.textoSelect ?? "",
      urlPhoto: unidade.urlPhoto ?? "",
    }));
  } catch (error) {
    console.error("Erro ao atualizar grid:", error);
    toast.error("Erro ao carregar unidades.");
  } finally {
    isLoading.value = false;
  }
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
    // console.log("[filteredItems] Avaliando item:", item);
    // console.log("[filteredItems] Filtros =>", filters.value);
    // console.log("[filteredItems] matchUnidade:", matchUnidade, "matchSexo:", matchSexo, "matchesKeyword:", matchesKeyword);

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
    const novoStatus = !item.configuracoes.ativo;

    await unidadeService.atualizarStatusUnidade(item.id, {
      configuracoes: {
        ...item.configuracoes,
        ativo: novoStatus,
        ultimaAtualizacao: new Date().toISOString()
      }
    });

    item.configuracoes.ativo = novoStatus; // atualiza localmente
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
  rowsPerPage: 5,
});
</script>

<style lang="scss">
.scrollable-content {
  max-height: 620px;
  overflow-y: auto;
}

.position-component {
    margin-right: 14px;
    padding-top: 80px;
    padding-left: 60px;
    padding-bottom: 60px;
}

.hover-row:hover {
  background-color: #e4f1fb; /* cor de destaque */
  cursor: pointer;          /* opcional: mostra que é interativo */
}

.mg-pers {
  margin-bottom: 20px;
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


.leaflet-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* garante que o wrapper não atrapalhe o layout do Leaflet */
.pulse-wrapper.leaflet-div-icon {
  background: transparent;
  border: none;
}

/* bolinha central */
.pulse-marker {
  position: relative;
  width: 16px;   /* antes 20px */
  height: 16px;  /* antes 20px */
  border-radius: 50%;
  background: rgba(0, 123, 255, 0.9);
  box-shadow: 0 0 0 6px rgba(0, 123, 255, 0.15); /* sombra proporcional */
}


/* ondas (elementos reais, não pseudo) */
.pulse-marker .ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.6);
  background: rgba(0, 123, 255, 0.35);
  animation: ripple 1.8s ease-out infinite;
}

.pulse-marker .ring2 {
  animation-delay: 2.0s; /* intercalar a segunda onda */
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0.8;
  }
  70% {
    transform: translate(-50%, -50%) scale(4.0); /* maior expansão */
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
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