<template>
  <VCard :title="props.titulo" class="h-100">
    <VCardText>
      <VList class="card-list">
        <VListItem v-for="(item, index) in props.itens" :key="index">
          <template #prepend>
            <VAvatar size="34" :color="item.iconeCor" variant="tonal" rounded>
              {{ index + 1 }}
              <!-- <VIcon
                :icon="
                  index === 0
                    ? 'mdi-bank'
                    : index === 1
                    ? 'mdi-bank-outline'
                    : index === 2
                    ? 'mdi-home-outline'
                    : 'mdi-cash-multiple'
                "
              /> -->
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ item.descricao }}
          </VListItemTitle>

          <template #append>
            <div class="d-flex align-center">
              <span
                :class="
                  item.valor === 'R$ 25,00' ? 'text-error' : 'text-success'
                "
              >
                {{ item.valor }}
              </span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
  

<script lang="ts" setup>
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