<template>
  <div class="chart-wrapper">
    <canvas
      id="myChart"
      ref="canvas"
    />
  </div>
</template>

<script>
import Chart from 'chart.js';
import { mockProcessData } from '../utils/chart.utils';

export default {
  name: 'BaseChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    const gridLineColor = 'grey';

    Chart.defaults.global.defaultFontColor = 'white';

    const chart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      xAxisID: 'time',
      yAxisID: 'OD',
      data: {
        datasets: [
          {
            data: this.data,
            label: 'Dissolved Oxygen',
            pointRadius: 0,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            fill: false,
            showLines: false,
          },
          // {
          //     label: 'My First dataset',
          //     borderColor: 'rgb(255, 99, 132)',
          //     borderWidth: 1,
          //     fill: false,
          //     data: dataOD2,
          //     showLines: false,
          // },
        ],
      },

      options: {
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [{
            id: 'time',
            type: 'linear',
            ticks: {
              min: 0,
              max: 20,
              stepSize: 5,
            },
            scaleLabel: {
              display: true,
              labelString: 'EFT (hours)',
            },
            gridLines: {
              color: gridLineColor,
            },
          }],
          yAxes: [{
            id: 'OD',
            type: 'linear',
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
            },
            scaleLabel: {
              display: true,
              labelString: 'Percent',
            },
            gridLines: {
              color: gridLineColor,
            },
          }],
        },
      },
    });
  },
};
</script>

<style scoped lang="scss"></style>
