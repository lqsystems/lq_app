<template>
  <div>
    <div>Load</div>
    <SwitchControl
      :is-on="prime2State.water"
      :is-disabled="prime2State.extraction"
      @toggle="toggleLoad"
    />
    <div>Extract</div>
    <SwitchControl
      :is-on="prime2State.extraction"
      :is-disabled="prime2State.water"
      @toggle="toggleExtraction"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { UPDATE_MODULE_STATE } from '@/store/actions.types';
import { UPDATE_SELECTED_MODULE } from '@/store/mutations.types';
import SwitchControl from './SwitchControl';

export default {
  name: 'SidePumpControl',
  components: {
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
