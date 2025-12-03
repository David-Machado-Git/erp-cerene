<template>
    <VCard>
      <VRow no-gutters>
        <VCol
          cols="12"
          sm="8"
          lg="8"
          :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
        >
          <VCardText class="pe-2">
            <h6 class="text-h6 mb-6">
              Comparativo mensal
            </h6>
  
            <VueApexCharts
              :options="chartOptions.bar"
              :series="series.bar"
              height="365"
            />
          </VCardText>
        </VCol>
  
        <VCol
          cols="12"
          sm="4"
        >
          <VCardText class="d-flex flex-column justify-center align-center text-center ps-2 h-100">
            <VBtn
              variant="outlined"
              size="small"
              class="d-flex mx-auto"
            >
              <span>2023</span>
              <template #append>
                <VIcon
                  size="16"
                  icon="tabler-chevron-down"
                />
              </template>
              <VMenu activator="parent">
                <VList>
                  <VListItem
                    v-for="(item, index) in ['2023', '2022', '2021']"
                    :key="index"
                    :value="index"
                  >
                    <VListItemTitle>{{ item }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
  
            <div class="d-flex flex-column mt-6">
              <h5 class="font-weight-semibold text-h6">
                R$ 25.825
              </h5>
              <p>
                <span class="text-high-emphasis font-weight-semibold me-1" style="font-size: 0.60rem;">Orçamento:</span>
                <span>56.800</span>
              </p>
            </div>
  
            <VueApexCharts
              v-if="chartOptions && chartOptions.line"
              :options="chartOptions.line"
              :series="series.line"
              height="140"
            />
          </VCardText>
        </VCol>
      </VRow>
    </VCard>
  </template>

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue';
import { hexToRgb } from '../utils/utils';
import { useTheme } from 'vuetify'


const vuetifyTheme = useTheme()

const series = {
  bar: [
    {
      name: 'Receita',
      data: [270, 210, 180, 200, 250, 280, 250, 270, 150],
    },
    {
      name: 'Despesa',
      data: [-140, -160, -180, -150, -100, -60, -80, -100, -180],
    },
  ],
  line: [
    {
      name: 'Despesa',
      data: [20, 10, 30, 16, 24, 5, 40, 23, 28, 5, 30],
    },
    {
      name: 'Despesa',
      data: [50, 40, 60, 46, 54, 35, 70, 53, 58, 35, 60],
    },
  ],
}

const chartOptions = computed(() => {

  const currentTheme = vuetifyTheme.current.value ? vuetifyTheme.current.value.colors : {};
  const variableTheme = vuetifyTheme.current.value ? vuetifyTheme.current.value.variables : {};

  const labelColor = `rgba(${hexToRgb(currentTheme['on-surface'] || '#000000')},${variableTheme['disabled-opacity'] || 0.6})`;
  const legendColor = `rgba(${hexToRgb(currentTheme['on-background'] || '#000000')},${variableTheme['high-emphasis-opacity'] || 0.8})`;
  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color'] || '#CCCCCC'))},${variableTheme['border-opacity'] || 0.1})`;

  return {
    bar: {
      chart: {
        parentHeightOffset: 0,
        stacked: true,
        type: 'bar',
        toolbar: { show: false },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      colors: [currentTheme.primary, currentTheme.warning],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 4,
        lineCap: 'round',
        colors: [currentTheme.surface || '#FFFFFF'],
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        fontFamily: 'Public Sans',
        markers: {
          height: 12,
          width: 12,
          radius: 12,
          offsetX: -3,
          offsetY: 2,
        },
        labels: {
          colors: legendColor,
        },
        itemMargin: {
          horizontal: 5,
        },
      },
      grid: {
        show: false,
        padding: {
          bottom: -8,
          top: 20,
        },
      },
      xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set'],
        labels: {
          style: {
            fontSize: '14px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            fontSize: '14px',
            colors: labelColor,
            fontFamily: 'Public Sans',
          },
        },
        min: -200,
        max: 300,
        tickAmount: 5,
      },
      responsive: [
        {
          breakpoint: 1700,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '43%',
              },
            },
          },
        },
        {
          breakpoint: 1441,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '42%',
              },
            },
          },
        },
        {
          breakpoint: 1280,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '38%',
              },
            },
          },
        },
        {
          breakpoint: 1025,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
              },
            },
            chart: {
              height: 390,
            },
          },
        },
        {
          breakpoint: 991,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '38%',
              },
            },
          },
        },
        {
          breakpoint: 850,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '48%',
              },
            },
          },
        },
        {
          breakpoint: 449,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%',
              },
            },
            chart: {
              height: 360,
            },
            xaxis: {
              labels: {
                offsetY: -5,
              },
            },
          },
        },
        {
          breakpoint: 394,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '48%',
              },
            },
          },
        },
      ],
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
    },
    line: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
      },
      stroke: {
        curve: 'smooth',
        dashArray: [5, 0],
        width: [1, 3],
      },
      legend: {
        show: false,
      },
      colors: [borderColor, currentTheme.primary || '#1976D2'],
      grid: {
        show: false,
        borderColor,
        padding: {
          top: -30,
          bottom: -15,
          left: 95,
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }
})



</script>

<style lang="scss" scoped>


</style>