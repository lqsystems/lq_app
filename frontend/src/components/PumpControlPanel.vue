<template>
  <ControlPanel
    title="Liquid"
  >
    <!-- Load and extract are intentionally inverted -->
    <ControlPanelItem
      label="Load"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="prime2State.extraction"
        :is-disabled="prime2State.water"
        @toggle="toggleExtraction"
      />
    </ControlPanelItem>
    <ControlPanelItem
      label="Extract"
      :include-divider="true"
    >
      <SwitchControl
        :is-on="prime2State.water"
        :is-disabled="prime2State.extraction"
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
    ...mapGetters(['prime2State', 'selectedModuleName']),
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
      this.UPDATE_SELECTED_MODULE('Prime2');
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
