<template>
  <VCard :title="titulo" class="h-100 mt-3">
    <VCardText>
      <VRow>
        <VCol
          v-for="(item, index) in props.itens"
          :key="index"
          cols="4"
          style="padding: 0.2em"
        >
          <div class="d-flex align-center gap-2">
            <VAvatar :color="item.iconeCor" variant="tonal" size="32">
              <VIcon :icon="'mdi-cash'" :color="item.iconeCor" />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-h7 font-weight-medium">{{ item.valor }}</span>
              <span class="text-sm" style="font-size: 10.5px">
                {{ item.descricao }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { ItemDashBoard } from "./dashboardService";

const props = defineProps({
  itens: {
    type: Array<ItemDashBoard>,
  },
  titulo: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
</style>