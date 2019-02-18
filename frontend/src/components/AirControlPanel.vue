<template>
  <ControlPanel
    label="Air"
  >
    <ControlPanelItem
      label="Power"
      v-bind:include-divider="false"
    >
      <PowerControl
        v-bind:power-on="heater.powerOn"
        v-on:toggle-power="toggleHeaterPower"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import PowerControl from './PowerControl';


export default {
  name: 'LightControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    PowerControl,
  },
  computed: {
    ...mapGetters(['heater']),
    heaterLevel() {
      return Number(this.heater.level);
    },
    heaterMinMax() {
      return [this.heater.minTemp, this.heater.maxTemp];
    },
  },
  created() {
    this.$store.dispatch('fetchEnvironmentState');
  },
  methods: {
    ...mapMutations(['toggleHeaterPower', 'updateHeaterLevel']),
    getSliderLabel(sliderPos) {
      return `${sliderPos}%`;
    },
    getTempLabel(sliderPos) {
      return `${sliderPos[0]} °C\u00A0\u00A0to\u00A0\u00A0${sliderPos[1]} °C`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
