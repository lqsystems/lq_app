<template>
  <ControlPanel
    label="Heater"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        :is-on="heater.powerOn"
        @toggle="toggleHeater"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Level">
      <SliderControl
        :level="heaterLevel"
        :level-label-func="getPercentLabel"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Range"
      :include-divider="false"
    >
      <!-- Returns a slider with two handles since an array is suplied to the level prop -->
      <SliderControl
        :level="heaterMinMax"
        :limits="[20, 45]"
        :level-label-func="getTempLabel"
        @slider-move-end="updateLimits"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS, UPDATE_MODULE_LIMITS } from '@/store/actions.types';
import { getPercentLabel } from '@/utils/controlPanel.utils';

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
    // TODO: refactor to be more explicit about which properties heater has (use mapState)
    ...mapGetters(['heater']),
    heaterLevel() {
      return Number(this.heater.level);
    },
    heaterMinMax() {
      return [this.heater.minTemp, this.heater.maxTemp];
    },
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS, UPDATE_MODULE_LIMITS]),
    toggleHeater(heaterState) {
      this.UPDATE_MODULE_STATE({
        actuatorType: 'Heater',
        newState: heaterState,
      });
    },
    updateIntensity([level]) {
      this.UPDATE_MODULE_PARAMS({
        actuatorType: 'Heater',
        newParams: { level },
      });
    },
    updateLimits(limits) {
      const newLimits = {
        'LOW-value': String(limits[0]),
        'HIGH-value': String(limits[1]),
      };
      this.UPDATE_MODULE_LIMITS({
        actuatorType: 'Heater',
        newLimits,
      });
    },
    getTempLabel(sliderPos) {
      return `${sliderPos[0]} °C\u00A0\u00A0to\u00A0\u00A0${sliderPos[1]} °C`;
    },
    getPercentLabel,
  },
};
</script>
