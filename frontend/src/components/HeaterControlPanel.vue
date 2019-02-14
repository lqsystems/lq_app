<template>
  <ControlPanel
    label="Heater"
  >
    <div id="slider" />
    <ControlPanelItem label="Power">
      <PowerControl
        v-bind:power-on="heater.powerOn"
        v-on:toggle-power="toggleHeaterPower"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Heater Level">
      <SliderControl
        v-bind:level="heaterLevel"
        v-bind:level-label-func="getSliderLabel"
        v-on:slider-move="updateHeaterLevel"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Temp Range"
      v-bind:include-divider="false"
    >
      <!-- Returns a range slider since an array is suplied to the level prop -->
      <SliderControl
        v-bind:level="heaterMinMax"
        v-bind:level-label-func="getTempLabel"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import PowerControl from './PowerControl';
import SliderControl from './SliderControl';


export default {
  name: 'HeaterControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    PowerControl,
    SliderControl,
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
