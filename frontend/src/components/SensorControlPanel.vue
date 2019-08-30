<template>
  <ControlPanel title="Sensor">
    <ControlPanelItem
      label="ON / OFF"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="isOn"
        @toggle="toggleSensorState"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Delay"
      :include-divider="false"
    >
      <input
        v-model="delay"
        class="sensor-delay-input"
        type="text"
      >
      <span class="delay-label">sec</span>
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>

import { mapGetters } from 'vuex';

import callApi from '@/utils/api.utils.js';
import { UPDATE_STATE_URL } from '@/constants/api.constants';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';

const constructSensorToggleRequestBody = ({
  moduleName, reactionId, isOn, delay,
}) => {
  const params = `${moduleName}-SensorOnOff-parameters`;
  const activeSwitch = `ReactionActive-${reactionId}`;

  return {
    activeSwitch,
    mid: moduleName,
    allStates: { SensorOnOff: isOn },
    activeId: reactionId,
    [params]: { ctrlValue: delay.toString() },
    changes: ['SensorOnOff'],
  };
};

const updateSensorState = (options) => {
  const requestPayload = constructSensorToggleRequestBody(options);

  callApi(UPDATE_STATE_URL, {

    method: 'POST',
    data: requestPayload,
  });
};

export default {
  name: 'SensorControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
  },
  data() {
    return {
      isOn: false,
      delay: 5,
    };
  },
  computed: {
    ...mapGetters(['selectedModuleName', 'activeReactionId']),
  },
  mounted() {
    updateSensorState({
      moduleName: this.selectedModuleName,
      reactionId: this.activeReactionId,
      isOn: this.isOn,
      delay: this.delay,
    });
  },
  methods: {
    toggleSensorState() {
      this.isOn = !this.isOn;

      updateSensorState({
        moduleName: this.selectedModuleName,
        reactionId: this.activeReactionId,
        isOn: this.isOn,
        delay: this.delay,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.sensor-delay-input {
  border-bottom: 1px solid $grey-300;
  text-align: center;
  width: 40px;
  padding-right: .2em;
  // border: 1px solid #2b3553;
  // border-radius: 7px;

  &:focus {
    outline: none;
  }
}
.delay-label {
  text-transform: lowercase;
  margin-right: 1.6em;
}
</style>
