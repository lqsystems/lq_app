<template>
  <ControlPanel
    title="Pump"
  >
    <ControlPanelItem
      label="Load"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="mv1State.extraction"
        :is-disabled="mv1State.water"
        @toggle="toggleExtraction"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Extract"
      :include-divider="true"
    >
      <SwitchControl
        :is-on="mv1State.water"
        :is-disabled="mv1State.extraction"
        @toggle="toggleLoad"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { UPDATE_MODULE_STATE } from '@/store/actions.types';
import { UPDATE_SELECTED_MODULE } from '@/store/mutations.types';
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
    ...mapGetters(['mv1State', 'selectedModuleName']),
  },
  created() {
    this.toggleLoad = this.togglePump('water');
    this.toggleExtraction = this.togglePump('extraction');
  },
  methods: {
    ...mapMutations([UPDATE_SELECTED_MODULE]),
    ...mapActions([UPDATE_MODULE_STATE]),
    updateState(actuatorType, newState) {
      const prevSelected = this.selectedModuleName;
      this.UPDATE_SELECTED_MODULE('MV1');
      this.UPDATE_MODULE_STATE({
        actuatorType,
        newState,
      });
      this.UPDATE_SELECTED_MODULE(prevSelected);
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
