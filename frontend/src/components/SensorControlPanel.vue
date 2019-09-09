<template>
  <ControlPanel title="Sensor">
    <ControlPanelItem
      label="ON / OFF"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="sensorState"
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

import { mapGetters, mapMutations } from 'vuex';

import callApi from '@/utils/api.utils.js';
import { UPDATE_STATE_URL } from '@/constants/api.constants';
import { MUTATE_MODULE_PARAMS, MUTATE_MODULE_STATE } from '@/store/mutations.types';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';


const updateSensorState = (options) => {
  const constructSensorToggleRequestBody = ({
    moduleName, reactionId, isOn,
  }) => {
    const params = `${moduleName}-SensorOnOff-parameters`;
    const activeSwitch = `ReactionActive-${reactionId}`;

    return {
      activeSwitch,
      mid: moduleName,
      allStates: { SensorOnOff: isOn },
      activeId: reactionId,
      [params]: { ctrlValue: 5 },
      changes: ['SensorOnOff'],
    };
  };

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
      delay: 5,
    };
  },
  computed: {
    ...mapGetters(['selectedModuleName', 'activeReactionId', 'sensorParams', 'sensorState']),
  },
  mounted() {
    this.delay = this.sensorParams.ctrlValue;
  },
  methods: {
    ...mapMutations([MUTATE_MODULE_PARAMS, MUTATE_MODULE_STATE]),
    toggleSensorState(sensorState) {
      this.MUTATE_MODULE_STATE({
        moduleName: this.selectedModuleName,
        actuatorType: 'SensorOnOff',
        newState: sensorState,
      });

      updateSensorState({
        moduleName: this.selectedModuleName,
        reactionId: this.activeReactionId,
        isOn: sensorState,
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

  &:focus {
    outline: none;
  }
}
.delay-label {
  text-transform: lowercase;
  margin-right: 1.6em;
}
</style>
