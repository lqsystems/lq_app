<template>
  <span class="sensor-reading">
    {{ formatSensorData(sensorData, 'Prime1').temperature }}
  </span>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'SensorReading',
  computed: {
    ...mapGetters(['selectedModuleName']),
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

<style scoped lang="scss"></style>
