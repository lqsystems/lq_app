<template>
  <ControlPanel
    title="Light"
    class="light-control-panel"
  >
    <ControlPanelItem label="Power">
      <SwitchControl
        :is-on="lamp.powerOn"
        @toggle="toggleLight"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Level">
      <SliderControl
        :limits="[0,100]"
        :level="lampLevel"
        :level-label-func="getPercentLabel"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Start">
      <div class="time-picker-wrapper">
        <BaseTimePicker
          :initial-time="startTimeStr"
          @update="updateStartTime"
        />
      </div>
    </ControlPanelItem>
    <ControlPanelItem
      label="Stop"
      :include-divider="false"
    >
      <div class="time-picker-wrapper">
        <BaseTimePicker
          :initial-time="stopTimeStr"
          @update="updateStopTime"
        />
      </div>
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
// remove light classes. replace with something more substantial
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS } from '@/store/actions.types';
import { MUTATE_MODULE_PARAMS } from '@/store/mutations.types';
import { getPercentLabel } from '@/utils/controlPanel.utils';
import BaseTimePicker from './BaseTimePicker';
import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';


const hhmmToMinutes = (hhmm) => {
  const a = hhmm.split(':');
  return Number(a[0]) * 60 + Number(a[1]);
};

const secondsToHHMM = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  minutes = (`${minutes}`).length < 2 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

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
    startTimeStr() {
      return this.lamp ? secondsToHHMM(this.lamp.start * 60) : '0:00';
    },
    stopTimeStr() {
      return this.lamp ? secondsToHHMM(this.lamp.stop * 60) : '0:00';
    },
    lampLevel() {
      return Number(this.lamp.level);
    },
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS]),
    ...mapMutations([MUTATE_MODULE_PARAMS]),
    updateStartTime(newStart) {
      const newTime = { start: newStart, stop: this.stopTimeStr };
      this.mutateStartStop(newTime);
    },
    updateStopTime(newStop) {
      const newTime = { start: this.startTimeStr, stop: newStop };
      this.mutateStartStop(newTime);
    },
    mutateStartStop({ start, stop }) {
      const payload = {
        moduleName: this.selectedModuleName,
        actuatorType: 'Lamp',
        newParams: {
          start: hhmmToMinutes(start),
          stop: hhmmToMinutes(stop),
        },
      };
      this.MUTATE_MODULE_PARAMS(payload);
    },
    mutateLevel(level) {
      const payload = {
        moduleName: this.selectedModuleName,
        actuatorType: 'Lamp',
        newParams: { level },
      };
      this.MUTATE_MODULE_PARAMS(payload);
    },
    toggleLight(lightState) {
      this.UPDATE_MODULE_STATE({
        actuatorType: 'Lamp',
        newState: lightState,
      });
    },
    updateIntensity([level]) {
      this.mutateLevel(level);
    },
    getPercentLabel,
  },
};
</script>

<style lang="scss" >
.time-picker-wrapper {
  width: 65%;
  margin-left: auto;
  padding-right: 0.5em;
}

.light-control-panel {
  .cp-item {
    padding: 1.4em;
  }
}
</style>
