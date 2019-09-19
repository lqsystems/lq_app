<template>
  <span v-if="formatSensorData(sensorData)">
    {{ `Power: ${formatSensorData(sensorData)}w` }}
  </span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PowerReading',
  computed: {
    ...mapState({
      sensorData: state => state.sensors,
    }),
    formatSensorData() {
      return (sensorData) => {
        const { Power } = sensorData;
        const { power } = Power;
        const numPower = parseFloat(power);

        return numPower ? numPower.toFixed(2) : '';
      };
    },
  },
};
</script>

<style scoped lang="scss">
</style>
