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
  watch: {
    config(newConfig) {
      const gridLineColor = 'grey';
      const {
        xAxisID, yAxisID, yAxisConfig, title, points,
      } = this.config;

      function updateChart(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
          dataset.label = title;
          dataset.data = newConfig.points;
        });
        chart.options = {
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
        };
        chart.update();
      }

      updateChart(this.chart);
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    const gridLineColor = 'grey';


    Chart.defaults.global.defaultFontColor = 'white';

    const {
      xAxisID, yAxisID, yAxisConfig, title, points,
    } = this.config;

    this.chart = new Chart(canvas.getContext('2d'), {
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
        ],
      },

      options: {
        responsiveAnimationDuration: 0,
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
