<template>
  <ControlPanel
    title="Temp"
  >
    <ControlPanelItem label="Heater">
      <SwitchControl
        :is-on="heater.powerOn"
        @toggle="toggleHeater"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Temp Sensor">
      <SwitchControl
        :is-on="sensorState"
        @toggle="toggleSensorState"
      />
    </ControlPanelItem>
    <ControlPanelItem label="Current Temp">
      <div :style="{ marginRight: '50px' }">
        <SensorReading />
      </div>
    </ControlPanelItem>
    <!-- <ControlPanelItem label="Level">
      <SliderControl
        :limits="[0,100]"
        :level="heaterLevel"
        :level-label-func="getPercentLabel"
        @slider-move-end="updateIntensity"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Range"
      :include-divider="false"
    >
      Returns a slider with two handles since an array is suplied to the level prop
      <SliderControl
        :level="heaterMinMax"
        :limits="[25, 40]"
        :level-label-func="getTempLabel"
        @slider-move-end="updateLimits"
      />
    </ControlPanelItem> -->
  </ControlPanel>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS, UPDATE_MODULE_LIMITS } from '@/store/actions.types';
import { MUTATE_MODULE_STATE, MUTATE_MODULE_PARAMS, MUTATE_MODULE_LIMITS } from '@/store/mutations.types';
import { UPDATE_STATE_URL } from '@/constants/api.constants';
import callApi from '@/utils/api.utils.js';
import { getPercentLabel } from '@/utils/controlPanel.utils';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';
import SliderControl from './SliderControl';
import SensorReading from './SensorReading';

export default {
  name: 'HeaterControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SensorReading,
    SwitchControl,
    SliderControl,
  },
  data() {
    return {
      maxLevel: 40,
    };
  },
  computed: {
    // TODO: refactor to be more explicit about which properties heater has (use mapState)
    ...mapGetters(['heater', 'selectedModuleName', 'sensorState', 'activeReactionId']),
    heaterLevel() {
      return Math.round(Number(this.heater.level / this.maxLevel * 100));
    },
    heaterMinMax() {
      return [this.heater.minTemp, this.heater.maxTemp];
    },
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE, UPDATE_MODULE_PARAMS, UPDATE_MODULE_LIMITS]),
    ...mapMutations([MUTATE_MODULE_STATE, MUTATE_MODULE_PARAMS, MUTATE_MODULE_LIMITS]),
    toggleHeater(heaterState) {
      this.MUTATE_MODULE_PARAMS({
        moduleName: this.selectedModuleName,
        actuatorType: 'Heater',
        newParams: { level: this.maxLevel },
      });

      this.MUTATE_MODULE_LIMITS({
        moduleName: this.selectedModuleName,
        actuatorType: 'Heater',
        newLimits: { 'LOW-value': 31, 'HIGH-value': 34 },
      });

      this.UPDATE_MODULE_STATE({
        actuatorType: 'Heater',
        newState: heaterState,
      });
    },
    updateSensorState(options) {
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
    },
    toggleSensorState(sensorState) {
      this.MUTATE_MODULE_STATE({
        moduleName: this.selectedModuleName,
        actuatorType: 'SensorOnOff',
        newState: sensorState,
      });

      this.updateSensorState({
        moduleName: this.selectedModuleName,
        reactionId: this.activeReactionId,
        isOn: sensorState,
      });
    },
    updateIntensity([level]) {
      this.UPDATE_MODULE_PARAMS({
        actuatorType: 'Heater',
        newParams: { level: Math.round(level / 100 * this.maxLevel) },
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
      return `${sliderPos[0]}°C\u00A0\u00A0–\u00A0\u00A0${sliderPos[1]}°C`;
    },
    getPercentLabel,
  },
};
</script>
