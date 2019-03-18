<template>
  <ControlPanel
    label="Pump"
  >
    <ControlPanelItem
      label="Load"
      :include-divider="true"
    >
      <SwitchControl
        :is-on="activeModuleState.water"
        :is-disabled="activeModuleState.extraction"
        @toggle="toggleLoad"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Extract"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="activeModuleState.extraction"
        :is-disabled="activeModuleState.water"
        @toggle="toggleExtraction"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { UPDATE_MODULE_STATE } from '@/store/actions.types';
import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';

export default {
  name: 'PumpControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
  },
  computed: {
    ...mapGetters(['activeModuleState']),
  },
  created() {
    this.toggleLoad = this.togglePump('water');
    this.toggleExtraction = this.togglePump('extraction');
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE]),
    updateState(actuatorType, newState) {
      this.UPDATE_MODULE_STATE({
        actuatorType,
        newState,
      });
    },
    togglePump(pumpActionType) {
      return (newState) => {
        this.updateState(pumpActionType, newState);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
