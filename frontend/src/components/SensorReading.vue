<template>
  <span>
    <span class="sensor-reading">
      {{ formatSensorData(sensorData, moduleName).temperature }}
    </span>
    <span
      v-if="!isNaN(parseInt(formatSensorData(sensorData, moduleName).temperature))"
      class="sensor-degrees"
    >°C</span>
  </span>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'SensorReading',
  props: {
    moduleName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['selectedModuleName']),
    ...mapState({
      sensorData: state => state.sensors,
    }),
    formatSensorData() {
      return (sensorData, moduleName) => {
        const { temperature } = sensorData[moduleName];
        const numTemp = temperature === '' ? '' : Number(temperature);

        // eslint-disable-next-line
        if (isNaN(numTemp) || numTemp === '') {
          return {
            temperature,
          };
        }

        const twoDecimalTemp = numTemp.toFixed(2);

        return {
          temperature: twoDecimalTemp,
        };
      };
    },
  },
};
</script>

<style scoped lang="scss">
.sensor-degrees {
  font-size: .8em;
}
</style>
