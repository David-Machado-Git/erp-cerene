<template>
  <v-main class="ma-6">
    <VRow>
      <VCol>
        <VRow>
          <VCol cols="12" sm="6">
            <ReceitasPeriodo />
          </VCol>
          
          

          <VCol cols="12" sm="6">
            <VRow>
              <VCol cols="12">
                <ListaHorizontal :itens="receitas" titulo="Receita" />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <ListaHorizontal :itens="despesas" titulo="Despesas" />
              </VCol>
            </VRow>
            <VCol cols="12">
            <OrcamentoMes />
          </VCol>
          </VCol>

        </VRow>
        <VRow align-content="stretch">
          

          
          <VCol>
            <ListaVertical :itens="saldoEmConta" titulo="Ranking de faturamento" />
          </VCol>

          <VCol cols="12" sm="6">
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
    valor: "R$ 2.500,56",
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