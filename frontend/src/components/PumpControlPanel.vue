<template>
  <ControlPanel
    label="Pump"
  >
    <ControlPanelItem
      label="Fill"
      :include-divider="true"
    >
      <SwitchControl
        :is-on="activeModuleState.water"
        @toggle="toggleFill"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Extract"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="activeModuleState.extraction"
        @toggle="toggleExtraction"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { UPDATE_MODULE_STATE, MUTATE_MODULE_STATE } from '@/store/actions.types';

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
    ...mapGetters(['activeModuleState', 'selectedModuleName']),
  },
  created() {
    this.toggleFill = this.togglePump('water');
    this.toggleExtraction = this.togglePump('extraction');
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE]),
    // posts to api and updates vuex state
    updateState(actuatorType, newState) {
      this.UPDATE_MODULE_STATE({
        actuatorType,
        newState,
      });
    },
    mutateLocalState(actuatorType, newState) {
      this.MUTATE_MODULE_STATE({
        moduleName: this.selectedModuleName,
        actuatorType,
        newState,
      });
    },
    togglePump(pumpActionType) {
      return (newState) => {
        console.count();
        console.log('hello');
        this.updateState(pumpActionType, newState);
        const otherType = pumpActionType === 'water' ? 'extraction' : 'water';
        // this.updateState(otherType, false);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
