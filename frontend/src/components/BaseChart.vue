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

export default {
  name: 'BaseChart',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    const gridLineColor = 'grey';

    Chart.defaults.global.defaultFontColor = 'white';

    const {
      xAxisID, yAxisID, yAxisConfig, title, points,
    } = this.config;

    const chart = new Chart(canvas.getContext('2d'), {
      xAxisID,
      yAxisID,
      type: 'line',
      data: {
        datasets: [
          {
            data: points,
            label: title,
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
            id: yAxisID,
            type: 'linear',
            ticks: yAxisConfig.ticks,
            scaleLabel: {
              display: true,
              labelString: yAxisConfig.label,
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
