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
                mdi-account-multiple
              </v-icon>


              Colaboradores CERENE
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
            max-width="1600"
            rounded="lg"
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
                      <div class="avatar-container">
                        <v-avatar
                          size="140"
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
                            <h2>{{ nome || "" }}</h2>
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
                            @click="copiarEmail(email)"
                          >
                            <strong>E-mail:</strong> {{ email || "" }}
                          </span>
                        </v-col>
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
                            <strong>ID:</strong> {{ id || "" }}
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
                        item-value="id"
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
                      mdi-briefcase-check-outline
                    </v-icon>
                    Configurações Trabalhistas
                  </v-card-title>

                  <p class="mb-6">
                    Defina as regras individuais de jornada e trabalho
                  </p>

                  <!-- Primeira linha -->
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="cargaHorariaDiaria"
                        label="Carga Horária Diária (horas)"
                        prepend-inner-icon="mdi-clock-outline"
                        prepend-inner-icon-color="blue"
                        density="comfortable"
                        variant="outlined"
                        type="number"
                        required
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="cargaHorariaSemanal"
                        label="Carga Horária Semanal (horas)"
                        prepend-inner-icon="mdi-calendar-clock"
                        prepend-inner-icon-color="green"
                        density="comfortable"
                        variant="outlined"
                        type="number"
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
                      <VSelect
                        v-model="diasTrabalho"
                        :items="['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']"
                        label="Dias de Trabalho"
                        multiple
                        prepend-inner-icon="mdi-calendar-range"
                        prepend-inner-icon-color="purple"
                        density="comfortable"
                        variant="outlined"
                        required
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSwitch
                        v-model="trabalhaFeriados"
                        label="Trabalha em Feriados?"
                        color="red"
                      />
                    </VCol>
                  </VRow>

                  <!-- Terceira linha -->
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSwitch
                        v-model="bancoHoras"
                        label="Participa do Banco de Horas?"
                        color="indigo"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="toleranciaAtrasoMinutos"
                        label="Tolerância de Atraso (minutos)"
                        prepend-inner-icon="mdi-timer-sand"
                        prepend-inner-icon-color="orange"
                        density="comfortable"
                        variant="outlined"
                        type="number"
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
                        v-model="intervaloMinimo"
                        label="Intervalo Mínimo (minutos)"
                        prepend-inner-icon="mdi-coffee-outline"
                        prepend-inner-icon-color="brown"
                        density="comfortable"
                        variant="outlined"
                        type="number"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSwitch
                        v-model="permiteHomeOffice"
                        label="Permite Home Office / Híbrido?"
                        color="cyan"
                      />
                    </VCol>
                  </VRow>
                </v-card>
              </VCol>
            </VRow>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <div
            class="d-flex justify-center mx-auto"
            style="width: 320px;"
          >
            <v-btn
              class="mb-4 mt-5"
              variant="tonal"
              color="green-darken-4"
              block
              @click="validateForm"
            >
              SALVAR
            </v-btn>
          </div>
          <v-btn
            color="blue"
            @click="openModal('fechar', null)"
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
    <main style="margin-bottom: 90px; width: 98%; margin: auto;">
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
            CADASTRAR COLABORADOR
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


// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   priority: string;
//   dueDate: string;
//   category: { id: number; title: string };
// }

const toast = useToast();
const nome = ref("");
const cpf = ref("");
// const unidade = ref("");
const unidadesMap = ref([]) // começa vazio
const unidade = ref(null)   // valor selecionado
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

const usuariosMap = [
  { desc: "Administrador", role: "ADMIN", enum: 1 },
  { desc: "Gerente", role: "MANAGER", enum: 2 },
  { desc: "Usuário", role: "USER", enum: 3 },
];

const email = ref("");
const id = ref("");
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

const recuverData = ref(null);
const typeAction = ref("CREATE");

const filters = ref({
  unidade: null,
  sexo: null,
  keyword: "",
});
const dialog = ref(false);
const visible = ref(false);
const items = ref<any[]>([]);

// 🔹 NOVAS PROPRIEDADES — Configurações Trabalhistas
const cargaHorariaDiaria = ref(null)          // horas por dia
const cargaHorariaSemanal = ref(null)         // horas por semana
const diasTrabalho = ref([])                  // lista de dias (ex: ['Segunda','Terça'])
const trabalhaFeriados = ref(null)            // true/false
const bancoHoras = ref(null)                  // true/false
const toleranciaAtrasoMinutos = ref(null)     // minutos de tolerância
const intervaloMinimo = ref(null)             // intervalo mínimo em minutos
const permiteHomeOffice = ref(null)           // true/false


const openModal = (typeOfAction: string, data: any | null) => {
  if (typeOfAction === "EDIT" && data) {
    recuverData.value = data;
    typeAction.value = "EDIT";
    const infoData: any = recuverData.value;
 // 🔹 Log para inspecionar os dados recebidos
    console.log("Dados recebidos no EDIT:", infoData);

    // ?? reflete a foto no avatar
    urlPhoto.value = infoData.urlPhoto || null;

    idUser.value = infoData.id;
    nome.value = infoData.nome;
    cpf.value = infoData.cpf;
    nasc.value = infoData.nasc;
    cargo.value = infoData.cargo;
    unidade.value = infoData.unidade?.[0]?.id;
    sexo.value = infoData.sexo;
    email.value = infoData.email;
    id.value = infoData.id;
    password.value = infoData.password;

    contas.value = infoData.contasBancarias?.length
      ? infoData.contasBancarias.map((c: any) => ({
          banco: c.banco ?? "",
          agencia: c.agencia ?? "",
          conta: c.conta ?? "",
          tipo: c.tipo ?? ""
        }))
      : [{ banco: "", agencia: "", conta: "", tipo: "" }];

    pixContas.value = infoData.pixContas?.length
      ? infoData.pixContas.map((p: any) => ({
          tipoChave: p.tipoChave ?? "",
          chave: p.chave ?? ""
        }))
      : [{ tipoChave: "", chave: "" }];

    // 🔹 Preencher Configurações Trabalhistas
    const cfg = infoData.configuracoes ?? {};
    cargaHorariaDiaria.value = cfg.cargaHorariaDiaria ?? null;
    cargaHorariaSemanal.value = cfg.cargaHorariaSemanal ?? null;
    diasTrabalho.value = Array.isArray(cfg.diasTrabalho) ? cfg.diasTrabalho : [];
    trabalhaFeriados.value = cfg.trabalhaFeriados ?? null;
    bancoHoras.value = cfg.bancoHoras ?? null;
    toleranciaAtrasoMinutos.value = cfg.toleranciaAtrasoMinutos ?? null;
    intervaloMinimo.value = cfg.intervaloMinimo ?? null;
    permiteHomeOffice.value = cfg.permiteHomeOffice ?? null;

  } else if (typeOfAction === "fechar") {
    // 🔹 limpar apenas as configurações trabalhistas
    cargaHorariaDiaria.value = null;
    cargaHorariaSemanal.value = null;
    diasTrabalho.value = [];
    trabalhaFeriados.value = null;
    bancoHoras.value = null;
    toleranciaAtrasoMinutos.value = null;
    intervaloMinimo.value = null;
    permiteHomeOffice.value = null;

    dialog.value = false; // fecha modal
    return; // encerra aqui sem abrir novamente

  } else {
    recuverData.value = null;
    typeAction.value = "CREATE";

    // ?? resetar valores
    urlPhoto.value = null;
    nome.value = "";
    cpf.value = "";
    nasc.value = "";
    cargo.value = "";
    unidade.value = "";
    sexo.value = "";
    email.value = "";
    id.value = "";
    password.value = "";

    contas.value = [{ banco: "", agencia: "", conta: "", tipo: "" }];
    pixContas.value = [{ tipoChave: "", chave: "" }];

    // 🔹 resetar configurações trabalhistas também no CREATE
    cargaHorariaDiaria.value = null;
    cargaHorariaSemanal.value = null;
    diasTrabalho.value = [];
    trabalhaFeriados.value = null;
    bancoHoras.value = true;
    toleranciaAtrasoMinutos.value = null;
    intervaloMinimo.value = null;
    permiteHomeOffice.value = null;
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
    const downloadURL = await UploadStorageService.uploadPhoto(
      idUser.value,
      file,
      (p) => {
        progress.value = p;
      }
    );

    // ?? Atualiza a ref da foto (avatar)
    urlPhoto.value = downloadURL;

    // ?? Atualiza também o objeto atual
    if (recuverData.value) {
      recuverData.value.urlPhoto = downloadURL;
    }

    // ?? Atualiza a lista usada na tabela
    const idx = filteredItems.value.findIndex(
      (u: any) => u.id === idUser.value
    );
    if (idx !== -1) {
      filteredItems.value[idx].urlPhoto = downloadURL;
    }

    console.log(`[handlePhotoUpload] Foto atualizada para usuário ${idUser.value}`);
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

const copiarId = async () => {
  try {
    await navigator.clipboard.writeText(id.value || "");
    toast.success("ID copiado para a área de transferência!");
  } catch (err) {
    console.error("Erro ao copiar ID:", err);
    toast.error("Não foi possível copiar o ID.");
  }
};




const copiarEmail = (data) => {
  const email = data;
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
    const unidadeSelecionada = unidadesMap.value.find((u) => u.id === unidade.value);
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
          id: unidadeSelecionada?.id ?? null,
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

      pixContas: pixContas.value.map((p) => ({
        tipoChave: p.tipoChave ?? null,
        chave: p.chave ?? null,
      })),

      // 🔹 Configurações Trabalhistas
      configuracoes: {
        cargaHorariaDiaria: cargaHorariaDiaria.value ?? null,
        cargaHorariaSemanal: cargaHorariaSemanal.value ?? null,
        diasTrabalho: diasTrabalho.value ?? [],
        trabalhaFeriados: trabalhaFeriados.value ?? false,
        bancoHoras: bancoHoras.value ?? false,
        toleranciaAtrasoMinutos: toleranciaAtrasoMinutos.value ?? 0,
        intervaloMinimo: intervaloMinimo.value ?? 0,
        permiteHomeOffice: permiteHomeOffice.value ?? false,
      },
    };

    if (typeAction.value === "CREATE") {
      await cadastroService.registrarUsuario(dadosCadastro);
      toast.success("Cadastro realizado com sucesso!");
    } else if (typeAction.value === "EDIT" && recuverData.value?.id) {
      console.log('SIM AQUI EM EDIÇÃO DE PESSOAS COM OS DADOS => ', dadosCadastro);
      
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

    return matchUnidade && matchSexo && matchesKeyword;
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
  try {
    // 🔹 Ativa o loader antes de buscar os dados
    isLoading.value = true;

    const colaboradores = await colaboradorService.findColaboradores();

    // 🔹 Ordena por nome
    colaboradores.sort((a: any, b: any) =>
      String(a.nome).localeCompare(b.nome)
    );

    // Mantém os dados completos
    completeData.value = colaboradores;

    // 🔹 Mapeia para items da grid
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

      // 🔹 incluir configurações trabalhistas
      configuracoes: colab.configuracoes ?? {},

      actions: "..."
    }));
  } catch (error) {
    console.error("Erro ao atualizar grid:", error);
  } finally {
    // 🔹 Desativa o loader quando terminar (com sucesso ou erro)
    isLoading.value = false;
  }
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
  await carregarUnidadesMap();
  // popularBaseDeTeste();
});

const carregarUnidadesMap = async () => {
  try {
    const unidades = await cadastroService.findUnidadesConfiguracoes()
    console.log("Configurações das unidades:", unidades)

    const lista = []

    for (const u of unidades) {
      if (u.configuracoes?.mostrarSelect) {
        lista.push({
          id: u.id, // será usado como item-value
          desc: u.configuracoes?.selectName || u.textoSelect || u.nomeFantasia || "Sem nome"
        })
      }
    }

    console.log("Lista final para o VSelect:", lista)
    unidadesMap.value = lista
  } catch (error) {
    console.error("Erro ao carregar unidades:", error)
  }
};

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
  rowsPerPage: 5,
});
</script>

<style lang="scss" scoped>
.scrollable-content {
  max-height: 620px;
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