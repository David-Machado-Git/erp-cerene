<template>
    <VCard>
      <VRow no-gutters>
        <VCol
          cols="12"
          :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
        >
          <VCardText class="pe-2">
            <h6 class="text-h6 mb-6">
              Fluxo de caixa
            </h6>
  
            <VueApexCharts
              type="area"
              :options="chartOptions"
              :series="series"
              height="365"
            />
          </VCardText>
        </VCol>
      </VRow>
    </VCard>
  </template>

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue';
import { useTheme } from 'vuetify'
import { hexToRgb } from '../utils/utils';

const vuetifyTheme = useTheme();

const colorVariables = (themeColors: ThemeInstance['themes']['value']['colors']) => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(themeColors.variables['border-color']))},${themeColors.variables['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['high-emphasis-opacity']})`

  return { themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}
const series = [
  {
    name: 'entradas',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375],
  },
]


const chartOptions = computed(() => {
  const areaColors = {
    series3: '#e0cffe',
    series2: '#b992fe',
    series1: '#ab7efd',
  }

  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor } = colorVariables(vuetifyTheme.current.value)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',

      labels: { colors: themeSecondaryTextColor },
      markers: {
        offsetY: 1,
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },

    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      show: true,
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor },
      },
    },
    xaxis: {
      axisBorder: { show: false },

      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor },
      },
      categories: [
        '1/08',
        '2/08',
        '3/08',
        '4/12',
        '4/12',
        '4/12',
        '4/12',
        '4/12',
        '4/12',
        '4/12',
        '5/12',
        '6/12',
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
      ],
    },
  }
})

</script>

