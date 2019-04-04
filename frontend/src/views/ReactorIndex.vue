<template>
  <div class="reactor-index">
    <div class="reactor-card-wrapper">
      <ReactorIndexCard
        :sensor-data="formatSensorData(sensorData, 'ZeePrime')"
        :handle-click="handleCardClick"
        reactor-title="ZeePrime"
      />
      <ReactorIndexCard
        :sensor-data="formatSensorData(sensorData, 'MV1')"
        :handle-click="handleCardClick"
        reactor-title="MV1"
      />
    </div>
  </div>
</template>

<script>
// TODO ask greg whether it makes sense for the word 'reactor' to be renamed to 'module'
import { mapMutations, mapState } from 'vuex';
import ReactorIndexCard from '@/components/ReactorIndexCard';
import { UPDATE_SELECTED_MODULE } from '@/store/mutations.types';

export default {
  name: 'ReactorIndex',
  components: {
    ReactorIndexCard,
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
  },
};

</script>

<style scoped lang="scss">
.reactor-index {
  color: lightgrey;
  display: flex;
  justify-content: center;
}

.reactor-card-wrapper {
  margin-top: 20vh;
  display: flex;
  justify-content: center;
}
</style>
