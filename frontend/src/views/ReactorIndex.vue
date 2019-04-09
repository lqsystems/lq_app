<template>
  <div class="reactor-index">
    <BaseHeader :handle-icon-click="logout" />
    <div class="reactor-card-grid">
      <div class="reactor-card-row">
        <ReactorIndexCard
          v-ripple
          :sensor-data="formatSensorData(sensorData, 'ZeePrime')"
          :handle-click="handleCardClick"
          reactor-title="ZeePrime"
        />
        <ReactorIndexCard
          v-ripple
          :sensor-data="formatSensorData(sensorData, 'MV1')"
          :handle-click="handleCardClick"
          reactor-title="MV1"
        />
      </div>
      <div class="reactor-card-row">
        <ReactorIndexCard
          v-ripple
          :sensor-data="formatSensorData(sensorData, 'ZeePrime')"
          :handle-click="handleCardClick"
          reactor-title="ZeePrime2"
        />
        <ReactorIndexCard
          v-ripple
          :sensor-data="formatSensorData(sensorData, 'MV1')"
          :handle-click="handleCardClick"
          reactor-title="MV2"
        />
      </div>
    </div>
  </div>
</template>

<script>
// TODO ask greg whether it makes sense for the word 'reactor' to be renamed to 'module'
import { mapMutations, mapState } from 'vuex';
import { UPDATE_SELECTED_MODULE } from '@/store/mutations.types';
import { LOGOUT_URL } from '@/constants/api.constants.js';
import callApi from '@/utils/api.utils.js';

import ReactorIndexCard from '@/components/ReactorIndexCard';
import BaseHeader from '@/components/BaseHeader';

export default {
  name: 'ReactorIndex',
  components: {
    ReactorIndexCard,
    BaseHeader,
  },
  computed: {
    ...mapState({
      sensorData: state => state.sensors,
    }),
    formatSensorData() {
      return (sensorData, moduleName) => {
        const { temperature, OD } = sensorData[moduleName];
        const numTemp = Number(temperature);
        const numOD = Number(OD);

        // eslint-disable-next-line
        if (isNaN(numTemp) || isNaN(numOD)) {
          return {
            temperature,
            OD,
          };
        }

        const oneDecimalTemp = numTemp.toFixed(1);
        const twoDecimalOD = numOD.toFixed(2);

        return {
          temperature: oneDecimalTemp,
          OD: twoDecimalOD,
        };
      };
    },
  },
  methods: {
    ...mapMutations([UPDATE_SELECTED_MODULE]),
    handleCardClick(moduleName) {
      this.UPDATE_SELECTED_MODULE(moduleName);
      this.$router.push('/controls');
    },
    async logout() {
      await callApi(LOGOUT_URL);
      this.$router.push('/login');
    },
  },
};

</script>

<style scoped lang="scss">
.reactor-index {
  color: lightgrey;
}

.reactor-card-grid {
  margin-top: 3vh;
}

.reactor-card-row {
  display: flex;
  justify-content: center;
}
</style>
