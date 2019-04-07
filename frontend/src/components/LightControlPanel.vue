<template>
  <ControlPanel
    title="Light"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        :is-on="lamp.powerOn"
        @toggle="toggleLight"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Level">
      <SliderControl
        :level="lampLevel"
        :level-label-func="getPercentLabel"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Stop"
    >
      <div class="time-picker-wrapper">
        <BaseTimePicker initial-time="8:00" />
      </div>
    </ControlPanelItem>
    <ControlPanelItem
      label="Stop"
      :include-divider="false"
    >
      <div class="hi time-picker-wrapper">
        <BaseTimePicker initial-time="20:00" />
      </div>
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS } from '@/store/actions.types';
import { getPercentLabel } from '@/utils/controlPanel.utils';

import BaseTimePicker from './BaseTimePicker';
import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';


export default {
  name: 'LightControlPanel',
  components: {
    BaseTimePicker,
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
    SliderControl,
  },
  computed: {
    ...mapGetters(['lamp']),
    lampLevel() {
      return Number(this.lamp.level);
    },
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS]),
    // TODO: this is shared with heater control panel. Extract into util function
    toggleLight(lightState) {
      this.UPDATE_MODULE_STATE({
        actuatorType: 'Lamp',
        newState: lightState,
      });
    },
    updateIntensity([level]) {
      this.UPDATE_MODULE_PARAMS({
        actuatorType: 'Lamp',
        newParams: { level },
      });
    },
    getPercentLabel,
  },
};
</script>

<style lang="scss" scoped>
  .time-picker-wrapper {
    width: 65%;
    margin-left: auto;
    padding-right: 0.5em;
  }
</style>
