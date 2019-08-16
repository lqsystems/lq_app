<template>
  <ControlPanel
    title="Sensor"
  >
    <ControlPanelItem
      label="State"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="isOn"
        @toggle="toggleSensorState"
      />
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
      delay: 5,
    });
  },
  methods: {
    toggleSensorState() {
      this.isOn = !this.isOn;

      updateSensorState({
        moduleName: this.selectedModuleName,
        reactionId: this.activeReactionId,
        isOn: this.isOn,
        delay: 5,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
