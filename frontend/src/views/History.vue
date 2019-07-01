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
              <li
                class="parameter-list-item"
                :class="{ active: activeParameter === 'DO'}"
                @click="changeToDO"
              >
                Dissolved Oxygen
              </li>
              <li
                class="parameter-list-item"
                :class="{ active: activeParameter === 'TEMP'}"
                @click="changeToTemp"
              >
                Temperature
              </li>
              <li
                class="parameter-list-item"
              >
                pH
              </li>
              <li class="parameter-list-item">
                Agitation
              </li>
              <li
                class="parameter-list-item"

                :class="{ active: activeParameter === 'OPTICALD'}"
                @click="changeToOpticalDensity"
              >
                Optical Density
              </li>
            </ul>
          </div>
          <div class="data-content data-content-right">
            <BaseChart :config="chartConfig[activeParameter]" />
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import router from '@/router';


import BaseCard from '../components/BaseCard';
import BaseChart from '../components/BaseChart';
import BaseHeader from '../components/BaseHeader';

import { parameterChartConfig } from '../utils/chart.utils';

export default {
  name: 'Test',
  components: {
    BaseCard,
    BaseChart,
    BaseHeader,
  },
  data() {
    return {
      activeParameter: 'DO',
      chartConfig: parameterChartConfig,
    };
  },
  mounted() {
    // this.changeActiveParam();
  },
  methods: {
    changeToDO() {
      this.activeParameter = 'DO';
    },
    changeToTemp() {
      this.activeParameter = 'TEMP';
    },
    changeToOpticalDensity() {
      this.activeParameter = 'OPTICALD';
    },
    routeToRuns() {
      router.push('/runs');
    },
  },
};
</script>

<style scoped lang="scss">

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

.parameter-list {
  padding: 0;
}

.parameter-list-item {
  cursor: pointer;
  border-radius: 3px;
  list-style: none;
  font-size: 0.6em;
  color: #d4d4d4;
  width: 200px;
  margin: 10px 0;
  padding: 0.7em 1em;

  &.active {
    background: #272f59;
  }
}

.chart-wrapper {
  /* margin: 0 auto; */
}
</style>
