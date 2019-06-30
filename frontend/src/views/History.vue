<template>
  <div class="history view">
    <BaseHeader
      back-icon
      :handle-icon-click="routeToRuns"
    />
    <div class="data-view">
      <div class="data-view-title">
        History
      </div>
      <BaseCard class="data-well">
        <div class="data-content-wrapper">
          <div class="data-content data-content-left">
            <div>AB32_01</div>
            <ul class="parameter-list">
              <li class="parameter-list-item active">
                Dissolved Oxygen
              </li>
              <li class="parameter-list-item">
                pH
              </li>
              <li class="parameter-list-item">
                Temperature
              </li>
              <li class="parameter-list-item">
                Agitation
              </li>
              <li class="parameter-list-item">
                Optical Density
              </li>
            </ul>
          </div>
          <div class="data-content data-content-right">
            <div class="chart-wrapper">
              <canvas
                id="myChart"
                ref="canvas"
              />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import router from '@/router';

import BaseCard from '../components/BaseCard';
import BaseHeader from '../components/BaseHeader';

export default {
  name: 'Test',
  components: {
    BaseCard,
    BaseHeader,
  },
  mounted() {
    const getRandomInteger = (min, max) => (
      Math.floor(Math.random() * (max - min) + min)
    );

    const getRandomNegative = () => (getRandomInteger(0, 10) > 5
      ? -1
      : 1);

    const getRandomNumber = (min, max) => (
      Math.random() * (max - min) + min
    );

    const expoDataGenerator = ({
      dropRate, numPoints, step, yStart,
    }) => {
      const getExpoNumber = x => (x >= 0 ? dropRate * -x * x + yStart : 0);
      // jj

      const genExpoDataSet = (numPoints) => {
        const points = [];

        const errorOptions = {
          start: 1.25,
          frequency: () => getRandomInteger(0, 10) < 10,
          magnitude: () => getRandomNegative() * getRandomNumber(0, 3),
        };
        const { start, frequency, magnitude } = errorOptions;

        for (let i = 0; i < numPoints; i += step) {
          const mag = magnitude();
          const linePoint = getExpoNumber(i);
          const randInt = getRandomInteger(1, 6);
          const y = i < start
            ? linePoint
            : frequency()
              ? linePoint + mag
              : linePoint;

          points.push({
            x: i,
            y,
          });
        }
        return points;
      };

      return genExpoDataSet(numPoints);
    };

    const getStableErrorData = ({
      start, numPoints, stableVal, spreadUpper, spreadLower, step,
    }) => {
      const points = [];
      let y;
      for (let i = start; i < numPoints; i += step) {
        y = i === start
          ? stableVal
          : stableVal + getRandomNumber(spreadLower * -1, spreadUpper);

        //    y = i % 2 === 0 ? y : -1 * y;
        points.push({
          x: i,
          y,
        });
      }
      // set y to a random number within range +
      // if odd, multiply result by -1
      return points;
    };


    const pointRadius = 0;
    const pointDensity = 1.2;

    const dataOD5 = getStableErrorData({
      start: 12,
      numPoints: 17,
      stableVal: 20,
      spreadUpper: 5,
      spreadLower: 8,
      step: pointDensity * 0.01,
    });

    const dataOD4 = getStableErrorData({
      start: 7.2,
      numPoints: 12,
      stableVal: 20,
      spreadUpper: 8,
      spreadLower: 6,
      step: pointDensity * 0.01,
    });

    const dataOD3 = getStableErrorData({
      start: 7,
      numPoints: 7.2,
      stableVal: 20,
      spreadUpper: 35,
      spreadLower: 5,
      step: pointDensity * 0.01,
    });

    const dataOD2 = getStableErrorData({
      start: 4.5,
      numPoints: 7,
      stableVal: 20,
      spreadUpper: 2,
      spreadLower: 2,
      step: pointDensity * 0.01,
    });

    const dataODDropExpo = expoDataGenerator({
      numPoints: 4.5,
      step: 0.1,
      yStart: 100,
      dropRate: 4,
    });

    const data = [
      ...dataODDropExpo,
      ...dataOD2,
      ...dataOD3,
      ...dataOD4,
      ...dataOD5,
    ];

    const { canvas } = this.$refs;
    const gridLineColor = 'grey';

    Chart.defaults.global.defaultFontColor = 'white';

    const chart = new Chart(canvas.getContext('2d'), {
      // The type of chart we want to create
      type: 'line',
      xAxisID: 'time',
      yAxisID: 'OD',
      // The data for our dataset
      data: {
        // labels,
        datasets: [
          {
            label: 'Dissolved Oxygen',
            pointRadius,
            data,
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
  methods: {
    routeToRuns() {
      router.push('/runs');
    },
  },
};
</script>

<style scoped lang="scss">
.parameter-list {
  padding: 0;
}

.parameter-list-item {
  border-radius: 3px;
  list-style: none;
  font-size: .6em;
  color: #D4D4D4;
  width: 200px;
  margin: 10px 0;
  padding: .7em 1em;

  &.active {
    background: #272f59;
  }
}

.data-view {
  margin-top: 2%;
}

.data-view-title {
  font-size: 2.6em;
  text-align: center;
}

.data-well {
  margin: 0 auto;
  width: 87%;

  &.card {
    padding: 5% 0;
  }
}

.data-content-wrapper {
  display: flex;
  width: 90%;
  margin: 0 auto;
}

.data-content-left {
  font-size: 1.7em;
  flex: 1;
}

.data-content-right {
  flex: 2;
}

.chart-wrapper {
  /* margin: 0 auto; */
}
</style>
