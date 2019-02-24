<template>
  <ControlPanel
    label="Heater"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        v-bind:power-on="heater.powerOn"
        v-on:toggle-power="SET_HEATER_LEVEL"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Heater Level">
      <SliderControl
        v-bind:level="heaterLevel"
        v-bind:level-label-func="getSliderLabel"
        v-on:slider-move-end="SET_HEATER_LEVEL"
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
import {
  SET_HEATER_LEVEL,
  TOGGLE_HEATER_POWER,
} from '@/store/mutations.types';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';

export default {
  name: 'HeaterControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
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
  methods: {
    ...mapMutations([SET_HEATER_LEVEL, TOGGLE_HEATER_POWER]),
    getSliderLabel(sliderPos) {
      return `${sliderPos[0]}%`;
    },
    getTempLabel(sliderPos) {
      return `${sliderPos[0]} °C\u00A0\u00A0to\u00A0\u00A0${sliderPos[1]} °C`;
    },
    sayHi() {
      console.log('hello');
    },
  },
};
</script>
