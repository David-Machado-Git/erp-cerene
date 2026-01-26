<template>
  <v-main class="ma-6">
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
                mdi-chart-line
              </v-icon>

              Dashboard Geral
            </v-card-title>

            <p
              class="text-body-2 mb-4"
              style="color:#555;"
            >
              <span style="position: relative; left: 52px; top: -16px;">Acompanhe as estatísticas abaixo</span>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <VRow>
      <VCol>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <ReceitasPeriodo />
          </VCol>
          
          

          <VCol
            cols="12"
            sm="6"
          >
            <VRow>
              <VCol cols="12">
                <ListaHorizontal
                  :itens="receitas"
                  titulo="Receita"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <ListaHorizontal
                  :itens="despesas"
                  titulo="Despesas"
                />
              </VCol>
            </VRow>
            <VCol cols="12">
              <OrcamentoMes />
            </VCol>
          </VCol>
        </VRow>
        <VRow align-content="stretch">
          <VCol>
            <ListaVertical
              :itens="saldoEmConta"
              titulo="Apontamentos recentes"
            />
          </VCol>

          <VCol
            cols="12"
            sm="6"
          >
            <FluxoCaixa />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </v-main>
</template>

<script lang="ts" setup>
import OrcamentoMes from "./OrcamentoMes.vue";
import ListaHorizontal from "./ListaHorizontal.vue";
import ListaVertical from "./ListaVertical.vue";
import ReceitasPeriodo from "./ReceitasPeriodo.vue";
import FluxoCaixa from "./FluxoCaixa.vue";
const receitas = [
  {
    icone: "uil:money-withdraw",
    iconeCor: "success",
    valor: "1.550,25",
    descricao: "Recebido",
  },
  {
    icone: "iconoir:hand-cash",
    iconeCor: "primary",
    valor: "10.862,00",
    descricao: "À receber",
  },
  {
    icone: "tabler:clock-x",
    iconeCor: "error",
    valor: "850,25",
    descricao: "Em atraso",
  },
];

const despesas = [
  {
    icone: "uil:money-insert",
    iconeCor: "success",
    valor: "20.000,00",
    descricao: "Pago",
  },
  {
    icone: "iconoir:hand-cash",
    iconeCor: "primary",
    valor: "2.500,85",
    descricao: "Á pagar",
  },
  {
    icone: "tabler:clock-x",
    iconeCor: "error",
    valor: "15.000,00",
    descricao: "Em atraso",
  },
];

const saldoEmConta = [
  {
    icone: "mingcute:bank-fill",
    iconeCor: "success",
    valor: " 2.500,56",
    valorCor: "success",
    descricao: "Dogão do Japa",
  },
  {
    icone: "mingcute:bank-fill",
    iconeCor: "primary",
    valor: "R$ 25,00",
    descricao: "Sabor do Chef",
  },
  {
    icone: "mingcute:bank-fill",
    iconeCor: "purple",
    valor: "R$ 350,65",
    valorCor: "success",
    descricao: "Canto do Grill",
  },
  {
    icone: "ic:baseline-attach-money",
    iconeCor: "warning",
    valor: "R$ 2.826,21",
    valorCor: "success",
    descricao: "Sushi na Praça",
  },
];
</script>

<style lang="scss" scoped>
</style>