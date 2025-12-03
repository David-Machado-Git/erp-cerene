<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-app :theme="theme">
      <v-navigation-drawer class="pt-10" v-model="isDrawerOpen">
        <v-list>
          <v-list-subheader inset>MENUS</v-list-subheader>
          <v-divider></v-divider>
          <v-list-item @click="navigateToHome" prepend-icon="mdi-home" title="Home"></v-list-item>
          <v-list-item @click="() => handleClick('Produtos')" prepend-icon="mdi-package" title="Produtos"></v-list-item>
          <v-list-item @click="() => handleClick('Serviços')" prepend-icon="mdi-calendar" title="Agenda"></v-list-item>
  
          <v-list-group v-model="usersGroupOpen">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-account-circle"
                title="Estoque"
              ></v-list-item>
            </template>
            <v-list-item @click="navigateToImportacao" prepend-icon="mdi-checkbox-marked" title="Importação"></v-list-item>
            <v-list-item @click="navigateToTabela" prepend-icon="mdi-checkbox-marked" title="Teste"></v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar flat class="border-b">
        <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
        <v-app-bar-title>Importação</v-app-bar-title>
        <template #append>
          <v-badge class="custom-p" content="4" color="red" overlap>
            <v-btn icon>
              <v-icon size="small">mdi-bell</v-icon>
            </v-btn>
          </v-badge>
          <v-menu class="custum-drop-dal">
            <template #activator="{ props }">
              <v-avatar v-bind="props" class="mr-16 cursor">
                <v-img cover src="https://static.quizur.com/i/b/58910e31724cf1.01375155ian.jpg"></v-img>
              </v-avatar>
            </template>
            <v-card>
              <v-list-item prepend-icon="mdi-account-outline" min-width="200">
                Meu perfil
              </v-list-item>
              <v-list-item prepend-icon="mdi-heart-outline" min-width="200">
                Favoritos
              </v-list-item>
            </v-card>
          </v-menu>
          <v-btn icon @click="toggleTheme">
            <v-icon>{{ theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent' }}</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
  
      <v-main class="main-content">
        <v-container>
          <h1>Importação</h1>
          <v-row>
            <v-col class="custom-bg mt-1">
              <v-card-title>Importar Arquivo</v-card-title>
              <v-form>
                <v-file-input
                  v-model="file"
                  :label="fileName || 'Escolha um arquivo Excel'"
                  prepend-icon="mdi-file"
                  accept=".xlsx, .xls, .csv"
                  class="mb-3"
                  @change="updateFileName"
                ></v-file-input>
              </v-form>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" class="text-center">
             <v-row>
             <v-col>
              
                <v-row class=" ml-10 mr-10 " justify="center">
                  <v-col cols="12" md="3" class="mb-2">
                  <v-select
                    v-if="fileSelected"
                    :items="getFilteredSeparator(0)"
                    v-model="selectedSeparator"
                    label="separador"
                    dense
                    hide-details
                    class="custom-label-size"
                  ></v-select>
                </v-col>
  
                <v-col cols="12" md="3" class="mb-2" v-if="fileSelected">
                  <v-select
                    :items="getOptionSelectedDateFormat(0)"
                    v-model="selectedDateFormat"
                    label="formato/data"
                    dense
                    hide-details
                    class="custom-label-size"
                  ></v-select>
                </v-col>
  
                <v-col cols="12" md="3" class="mb-2" v-if="fileSelected">
                  <v-text-field
                    v-model="headerLines"
                    label="Número de Linhas de Cabeçalho"
                    type="number"
                    dense
                    hide-details
                    class="custom-label-size"
                    :rules="headerLineRules"
                  ></v-text-field>
                </v-col>
  
                
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="fileSelected" class=" ml-10 mr-10 " justify="center">
            <h4 class="custom-text-color mt-7">Abreviaturas:</h4>
            <v-col cols="12" md="2" class="mb-2">
                  <v-text-field
                    v-model="abreviaturaMasculino"
                    label="Masculino"
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" class="mb-2">
                  <v-text-field
                    v-model="abreviaturaMasculino"
                    label="Feminino"
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
          </v-row>
  
          <v-row v-if="fileSelected" class=" ml-10 mr-10 " justify="center">
            <h4 class="custom-text-color" >Clique nos cabeçalhos das colunas e selecione para associar os dados.</h4>
            <v-col cols="12" class="text-center">
              <v-btn 
                class="mb-4" 
                @click="reloadSelects" 
                
              >
              <v-icon left>mdi-refresh</v-icon>
                Desfazer Seleções
              </v-btn>
  
            </v-col>  
          </v-row>
  
    
  
  
              <v-simple-table>
                <thead>
                  <tr>
                    <th v-for="(header, index) in headers" :key="header.value" class="table-header">
                      <div>
                        <v-select
                          v-if="fileSelected"
                          :items="getFilteredOptions(index)"
                          v-model="selectedOptions[index]"
                          @change="updateSelectedOptions(index)"
                          label="Selecionar"
                          dense
                          hide-details
                          class="custom-label-size"
                        ></v-select>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in displayedItems" :key="index">
                    <td v-for="header in headers" :key="header.value" class="table-cell">
                      {{ item[header.value] }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-row>
          <v-col class="text-right">
            <v-btn
                class="mt-4"
                @click="handleImportTwo"
                :color="file ? 'primary' : 'disabled'"
                :class="{'btn-disabled': !file}"
                :disabled="!file"
              >
                Importar
              </v-btn>
          </v-col>
        </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import * as XLSX from 'xlsx';
  
  const router = useRouter();
  const file = ref(null);
  const fileName = ref('');
  const items = ref([]);
  const isDrawerOpen = ref(false);
  const usersGroupOpen = ref(false);
  const theme = ref('dark');
  const headers = ref([]);
  const selectedOptions = ref([]);
  const selectedItems = ref([]); // Lista dos itens selecionados
  const selectedDateFormat = ref(null);
  const selectedSeparator = ref(null);
  const fileSelected = ref(false);
  const shouldUpdate = ref(true); // Define uma flag reativa
  const headerLines = ref(1);
  const headerLineRules = [
    value => value > 0 || 'O número de linhas de cabeçalho deve ser maior que zero.'
  ];
  
  const optionsFromImport = ['nome', 'número', 'aniversário', 'gênero', 'rota', 'etiqueta', 'equipe'];
  const optionsFromseparator = ['tabulação', 'ponto', 'ponto e vírgula', 'vírgula', 'dois pontos'];
  const optionsFromDateFormat = ['yyyymmdd', 'ddmmyyyy', 'dd/mm/yyyy', 'mm/dd/yyyy', 'yyyy-mm-dd'];
  
  const displayedItems = computed(() => {
    return items.value.slice(0, 6);
  });
  
  // Função para filtrar as opções disponíveis para cada coluna
  function getFilteredOptions(index) {
    return optionsFromImport.filter(option => !selectedItems.value.includes(option) || selectedOptions.value[index] === option);
  }
  
  // Função para filtrar as opções disponíveis para cada coluna
  function getFilteredSeparator(index) {
    return optionsFromseparator;
  }
  
  function getOptionSelectedDateFormat(index) {
    return optionsFromDateFormat;
  }
  
  // Função para atualizar a lista de opções selecionadas
  function updateSelectedOptions(index) {
    // Atualiza a lista de opções selecionadas
    selectedItems.value = selectedOptions.value.filter(option => option !== null && option !== undefined);
    console.log('updateSelectedOptions foi chamada para index:', selectedOptions.value);
  
    // Reorganiza os headers e items conforme as seleções
    if (selectedOptions.value.length === headers.value.length) {
      reorganizeHeadersAndItems();
    }
  }
  
  // function updateSelectedSeparator(index) {
  //   // Atualiza a lista de opções selecionadas
  //   console.log('updateSelectedSeparator foi chamada para index:', selectedOptions.value);
  //   selectedSeparator.value = selectedSeparator.value.filter(option => option !== null && option !== undefined);
  // }
  
  function reorganizeHeadersAndItems() {
    const reorderedHeaderRow = [];
    const reorderedItems = items.value.map(item => {
      const reorderedItem = {};
      selectedOptions.value.forEach((selectedOption, index) => {
        const originalHeader = headers.value.find(header => header.text === selectedOption);
        reorderedHeaderRow[index] = originalHeader.text;
        reorderedItem[selectedOption] = item[originalHeader.value];
      });
      return reorderedItem;
    });
  
    // Atualiza os headers e items com a nova ordem
    headers.value = reorderedHeaderRow.map(header => ({
      text: header,
      value: header
    }));
    items.value = reorderedItems;
  
    console.log('Headers reorganizados:', headers.value);
    console.log('Items reorganizados:', items.value);
  }
  
  
  // Função para recarregar os selects
  function reloadSelects() {
    selectedOptions.value = []; // Limpa as seleções atuais
    selectedItems.value = []; // Limpa os itens selecionados
  }
  
  function navigateToImportacao() {
    router.push('/importacao');
  }
  
  function navigateToTabela() {
    router.push('/tabela');
  }
  
  function navigateToHome() {
    router.push('/');
  }
  
  const handleClick = (event) => {
    alert(`Você clicou no menu: ${event}`);
  };
  
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };
  
  watch(file, (newFile) => {
    if (!newFile) {
      fileName.value = '';
      items.value = [];
      headers.value = [];
      fileSelected.value = false;
    }
  });
  
  // watch(selectedSeparator, (newVal, oldVal) => {
  //   if (newVal !== oldVal) {
  //     console.log('O valor de selectedSeparator mudou:', newVal);
  //   }
  // });
  
  watch(headerLines, (newVal, oldVal) => {
    if (newVal <= 0) {
      headerLines.value = 1; // Reverte para o valor antigo
      console.log('Valor inválido. O número de linhas de cabeçalho deve ser maior que zero.');
      return;
    }
  });
  
  
  watch(selectedDateFormat, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log('O valor de selectedSeparator mudou:', newVal);
    }
  });
  
  watch(selectedOptions, (newVal, oldVal) => {
    if (shouldUpdate.value) {
      shouldUpdate.value = false; // Desativa a flag temporariamente para evitar loops
      newVal.forEach((option, index) => {
        updateSelectedOptions(index);
        // console.log('Entrou no select', selectedOptions.value);
      });
      shouldUpdate.value = true; // Reativa a flag após a atualização
    }
  }, { deep: true });
  
  
  
  
  function updateFileName(event) {
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];
    fileName.value = selectedFile ? selectedFile.name : '';
    if (selectedFile) {
      handleImport();
    }
  }
  
  function handleImportTwo() {
    console.log('CAIU NA IMPORTAÇÃO!');
    
    // Reorganizar items e headers conforme selectedOptions
    const reorderedItems = items.value.map(item => {
      const reorderedItem = {};
      selectedOptions.value.forEach((selectedOption, index) => {
        reorderedItem[selectedOption] = item[headers.value[index].value];
      });
      return reorderedItem;
    });
  
    console.log('Dados reorganizados:', reorderedItems);
    
    // Aqui você pode enviar `reorderedItems` para o backend, se necessário
    // Exemplo:
    // enviarParaBackend(reorderedItems);
  }
  
  
  const reorderedItems = items.value.map(item => {
      const reorderedItem = {};
      selectedOptions.value.forEach((option, index) => {
        reorderedItem[option] = item[headers.value[index].value];
        console.log('Aqui sim dados finais do reorderedItems => ', reorderedItems);
      });
      return reorderedItem;
    });
  
    // Aqui você pode fazer a requisição para o back-end
    // Exemplo usando fetch:
    // fetch('https://sua-api-endpoint.com/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(reorderedItems)
    // }).then(response => {
    //   if (response.ok) {
    //     alert('Dados enviados com sucesso!');
    //   } else {
    //     alert('Erro ao enviar os dados.');
    //   }
    // }).catch(error => {
    //   console.error('Erro na requisição:', error);
    //   alert('Erro na requisição.');
    // });
  
    function handleImport() {
    if (file.value) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        console.log('ArrayBuffer:', arrayBuffer); // Log do ArrayBuffer bruto
  
        const data = new Uint8Array(arrayBuffer);
        console.log('Uint8Array:', data); // Log dos dados como Uint8Array
  
        const workbook = XLSX.read(data, { type: 'array' });
        console.log('Workbook:', workbook); // Log do objeto Workbook
  
        const firstSheetName = workbook.SheetNames[0];
        console.log('First Sheet Name:', firstSheetName); // Log do nome da primeira aba
  
        const worksheet = workbook.Sheets[firstSheetName];
        console.log('Worksheet:', worksheet); // Log do conteúdo da aba selecionada
  
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log('Sheet Data:', sheetData); // Log dos dados da planilha em formato JSON
  
        const headerRow = sheetData[0];
        console.log('Header Row:', headerRow); // Log dos cabeçalhos
  
        headers.value = headerRow.map((header) => ({
          text: header,
          value: header,
        }));
        console.log('Headers:', headers.value); // Log dos headers mapeados
  
        items.value = sheetData.map((row) => {
          let obj = {};
          headerRow.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });
        console.log('Items:', items.value); // Log dos dados mapeados da planilha
  
        fileSelected.value = true; // Habilitar a renderização dos selects
      };
  
      reader.readAsArrayBuffer(file.value);
    }
  }
  
  </script>
  
  <style>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
  }
  
  .table-header {
    min-width: 150px;
    text-align: left;
  }
  
  .table-cell {
    border: 1px solid rgb(92, 92, 92);
    min-width: 150px;
    text-align: left;
  }
  
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .v-app-bar {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .custum-drop-dal {
    color: #fff;
  }
  
  .cursor {
    cursor: pointer;
  }
  
  .cursor:hover {
    opacity: .50;
  }
  
  .main-content {
    flex: 1;
    overflow: auto;
    padding-top: 64px;
  }
  
  .custom-p {
    position: absolute;
    top: 16px;
    right: 60px;
  }
  
  .custom-bg {
    background-color: #1c1b1bf5;
  }
  
  .custom-text-color {
    color: #8c8c8c;
  }
  
  .custom-label-size .v-label {
    font-size: 12px; /* Ajuste o tamanho conforme necessário */
  }
  
  .btn-disabled {
    background-color: #f5f5f5;
    color: #9e9e9e;
  }
  </style>
  