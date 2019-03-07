<template>
  <ControlPanel
    label="Light"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        v-bind:initial-state="false"
        v-on:toggle="toggleLight"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Intensity">
      <SliderControl
        v-bind:level="20"
        v-bind:level-label-func="getSliderLabel"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Start Time"
    >
      <div class="time-picker-wrapper">
        <BaseTimePicker initial-time="8:00" />
      </div>
    </ControlPanelItem>
    <ControlPanelItem
      label="End Time"
      v-bind:include-divider="false"
    >
      <div class="hi time-picker-wrapper">
        <BaseTimePicker initial-time="20:00" />
      </div>
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapActions } from 'vuex';
import { UPDATE_LAMP } from '@/store/actions.types';

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
  methods: {
    ...mapActions([UPDATE_LAMP]),
    // TODO: this is shared with heater control panel. Extract into util function
    toggleLight(lightState) {
      console.log('hello');
      // TODO: change to update module state
      this.UPDATE_LAMP({
        moduleName: 'ZeePrime', // TODO: this should be selected from the action
        actuatorType: 'Lamp',
        newState: lightState,
      });
    },
    getSliderLabel(sliderPos) {
      return `${sliderPos}%`;
    },
    sayHi() {
      console.log('hello');
    },
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
