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
        @slider-move="dimLamp"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Start"
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
import io from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS } from '@/store/actions.types';
import { getPercentLabel } from '@/utils/controlPanel.utils';

import BaseTimePicker from './BaseTimePicker';
import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';

const serverUrl = 'http://192.168.43.64:8888/dimLamp';
const socket = io(serverUrl);

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
    ...mapGetters(['lamp', 'activeReactionId', 'selectedModuleName']),
    lampLevel() {
      return Number(this.lamp.level);
    },
  },
  mounted() {
    socket.on('connect', () => { console.log('connected!'); });
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
    dimLamp([sliderVal]) {
      socket.emit('dim lamp', {
        level: sliderVal,
        dest: this.selectedModuleName,
        id: '5c9a57c3e5e2c205fcd15903',
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
