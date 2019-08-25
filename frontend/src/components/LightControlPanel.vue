<template>
  <ControlPanel
    title="Light"
    class="light-control-panel"
  >
    <ControlPanelItem label="Turn on now">
      <SwitchControl
        :is-on="lamp.powerOn"
        @toggle="toggleLight"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Turn on as scheduled">
      <SwitchControl
        :is-on="isScheduleActive"
        @toggle="toggleSchedule"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Start">
      <div class="time-picker-wrapper">
        <BaseTimePicker
          :initial-time="startTime"
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
          :initial-time="stopTime"
          @update="updateStopTime"
        />
      </div>
    </ControlPanelItem>

    <ControlPanelItem label="Level">
      <SliderControl
        :limits="[0,60]"
        :level="lampLevel"
        :level-label-func="getPercentLabel"
        @slider-move="dimLamp"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
// remove light classes. replace with something more substantial
import io from 'socket.io-client';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS } from '@/store/actions.types';
import callApi from '@/utils/api.utils.js';
import { getPercentLabel } from '@/utils/controlPanel.utils';
import { DIM_LAMP_SOCKET_URL } from '@/constants/api.constants';

import BaseTimePicker from './BaseTimePicker';
import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';

// const socket = io(DIM_LAMP_SOCKET_URL);

export default {
  name: 'LightControlPanel',
  components: {
    BaseTimePicker,
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
    SliderControl,
  },
  data() {
    return {
      startTime: '8:00',
      stopTime: '22:00',
      isScheduleActive: false,
    };
  },
  computed: {
    ...mapGetters(['lamp', 'activeReactionId', 'selectedModuleName']),
    lampLevel() {
      return Number(this.lamp.level);
    },
  },
  mounted() {
    // socket.on('connect', () => { console.log('socket connected!'); });
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS]),
    postScheduleUpdate() {
      const payload = {
        isTimerActive: this.isScheduleActive,
        moduleId: this.selectedModuleName,
        schedule: {
          onTime: this.startTime,
          offTime: this.stopTime,
        },
      };
      const updateUrl = 'http://localhost:3000/timer';
      axios(updateUrl, {
        method: 'POST',
        data: payload,
        withCredentials: false,
      }).catch(err => console.log(err));
    },
    created() {
      console.log('fdsa');
      this.postScheduleUpdate();
    },
    updateStartTime(newTime) {
      this.startTime = newTime;
      this.postScheduleUpdate();
    },
    updateStopTime(newTime) {
      this.stopTime = newTime;
      this.postScheduleUpdate();
    },
    toggleSchedule() {
      this.isScheduleActive = !this.isScheduleActive;
      this.postScheduleUpdate();
    },
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
      const socketMessage = {
        level: sliderVal,
        dest: this.selectedModuleName,
        id: '5c9a57c3e5e2c205fcd15903',
      };

      // socket.emit('dim lamp', socketMessage);
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
