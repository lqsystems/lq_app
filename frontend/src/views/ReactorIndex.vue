<template>
  <div class="reactor-index">
    <div class="reactor-card-wrapper">
      <ReactorIndexCard
        :sensor-data="formatSensorData(sensorData, 'ZeePrime')"
        reactor-title="ZeePrime"
      />
      <ReactorIndexCard
        :sensor-data="formatSensorData(sensorData, 'MV1')"
        reactor-title="MV1"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ReactorIndexCard from '@/components/ReactorIndexCard';

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
};

</script>

<style scoped lang="scss">
.reactor-index {
  color: lightgrey;
}

.reactor-card-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20%;
}
</style>
