<template>
  <ControlPanel
    label="Heater"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        :initial-state="heater.powerOn"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Level">
      <SliderControl
        :level="heaterLevel"
        :level-label-func="getPercentLabel"
        @slider-move-end="() => {}"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Range"
      :include-divider="false"
    >
      <!-- Returns a range slider since an array is suplied to the level prop -->
      <SliderControl
        :level="heaterMinMax"
        :level-label-func="getTempLabel"
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
    getPercentLabel(sliderPos) {
      return `${sliderPos[0]}%`;
    },
    getTempLabel(sliderPos) {
      return `${sliderPos[0]} °C\u00A0\u00A0to\u00A0\u00A0${sliderPos[1]} °C`;
    },
  },
};
</script>
